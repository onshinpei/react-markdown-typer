import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { MarkdownTyperCMDProps, IChar, IWholeContent, MarkdownTyperCMDRef } from '../defined';
import { __DEV__ } from '../constant';
import { useTypingTask } from '../hooks/useTypingTask';
import ReactMarkdown from 'react-markdown';
import { splitGraphemes } from '../utils/grapheme';
import { createRehypeCursorPlugin } from '../plugins/rehypeCursor';
import { CursorSpan } from '../components/CursorSpan';

const CURSOR_MARKER = '\u200B__MDTYPER_CURSOR__\u200B';
const DEFAULT_INCREMENTAL_FLUSH_THRESHOLD = 1200;

interface IncrementalContext {
  inFenceCode: boolean;
  inMathBlock: boolean;
  inContainerBlock: boolean;
  inTable: boolean;
  possibleTableHeader: boolean;
  previousNonEmptyLine: string;
  lineBuffer: string;
}

function createInitialIncrementalContext(): IncrementalContext {
  return {
    inFenceCode: false,
    inMathBlock: false,
    inContainerBlock: false,
    inTable: false,
    possibleTableHeader: false,
    previousNonEmptyLine: '',
    lineBuffer: '',
  };
}

function isFenceLine(line: string): boolean {
  return /^\s{0,3}(```|~~~)/.test(line);
}

function isMathBlockDelimiter(line: string): boolean {
  return /^\s*\$\$\s*$/.test(line);
}

function isContainerLine(line: string): boolean {
  return /^\s{0,3}(>|[-+*]\s+|\d+\.\s+)/.test(line);
}

function isContainerContinuationLine(line: string): boolean {
  return /^\s{2,}\S/.test(line);
}

function isAtxHeadingLine(line: string): boolean {
  return /^\s{0,3}#{1,6}(?:\s+|$)/.test(line);
}

function isThematicBreakLine(line: string): boolean {
  return /^\s{0,3}([-*_]\s*){3,}$/.test(line);
}

function isSetextUnderlineLine(line: string): boolean {
  return /^\s{0,3}(=+|-+)\s*$/.test(line);
}

function isTableSeparatorLine(line: string): boolean {
  return /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(line);
}

function looksLikeTableHeaderLine(line: string): boolean {
  return line.includes('|') && !isTableSeparatorLine(line);
}

function isReferenceDefinitionLine(line: string): boolean {
  return /^\s{0,3}\[[^\]]+\]:\s+\S+/.test(line);
}

function shouldFlushAtLineBoundary(line: string, context: IncrementalContext, isSetextHeading: boolean): boolean {
  if (context.inFenceCode || context.inMathBlock || context.inContainerBlock) {
    return false;
  }

  if (context.inTable) {
    return false;
  }

  if (/^\s*$/.test(line)) {
    return true;
  }

  if (isAtxHeadingLine(line) || isThematicBreakLine(line) || isSetextHeading || isReferenceDefinitionLine(line)) {
    return true;
  }

  return false;
}

function shouldForceFlushBySize(context: IncrementalContext, tail: string, threshold: number): boolean {
  if (context.inFenceCode || context.inMathBlock) {
    return tail.length >= threshold * 2;
  }
  return tail.length >= threshold;
}

function buildIncrementalContextFromContent(content: string): IncrementalContext {
  const context = createInitialIncrementalContext();
  for (const char of splitGraphemes(content)) {
    context.lineBuffer += char;
    if (char !== '\n') {
      continue;
    }

    const line = context.lineBuffer.slice(0, -1);
    context.lineBuffer = '';
    processCompletedLine(line, context);
  }
  return context;
}

function processCompletedLine(line: string, context: IncrementalContext): boolean {
  const isBlank = /^\s*$/.test(line);

  if (!context.inFenceCode && !context.inMathBlock && isFenceLine(line)) {
    context.inFenceCode = true;
  } else if (context.inFenceCode && isFenceLine(line)) {
    context.inFenceCode = false;
  } else if (!context.inFenceCode && isMathBlockDelimiter(line)) {
    context.inMathBlock = !context.inMathBlock;
  }

  const wasTableHeader = context.possibleTableHeader;
  if (context.inFenceCode || context.inMathBlock) {
    context.inContainerBlock = false;
    context.inTable = false;
    context.possibleTableHeader = false;
  } else if (isBlank) {
    context.inContainerBlock = false;
    context.inTable = false;
    context.possibleTableHeader = false;
  } else {
    if (context.inTable) {
      if (!line.includes('|')) {
        context.inTable = false;
      }
    } else if (wasTableHeader && isTableSeparatorLine(line)) {
      context.inTable = true;
    }
    context.possibleTableHeader = looksLikeTableHeaderLine(line);

    if (isContainerLine(line)) {
      context.inContainerBlock = true;
    } else if (context.inContainerBlock && isContainerContinuationLine(line)) {
      context.inContainerBlock = true;
    } else {
      context.inContainerBlock = false;
    }
  }

  const isSetextHeading = isSetextUnderlineLine(line)
    && !context.inFenceCode
    && !context.inMathBlock
    && !context.inTable
    && !context.inContainerBlock
    && context.previousNonEmptyLine.length > 0;

  const shouldFlush = shouldFlushAtLineBoundary(line, context, isSetextHeading);

  if (!isBlank) {
    context.previousNonEmptyLine = line;
  }

  return shouldFlush;
}

const MarkdownTyperCMD = forwardRef<MarkdownTyperCMDRef, MarkdownTyperCMDProps>(
  (
    {
      interval = 30,
      onEnd,
      onStart,
      onTypedChar,
      onBeforeTypedChar,
      timerType = 'setTimeout',
      reactMarkdownProps,
      disableTyping = false,
      autoStartTyping = true,
      customConvertMarkdownString,
      showCursor = false,
      cursor = '|',
      showCursorOnPause = true,
      experimentalIncrementalRender = false,
      incrementalFlushThreshold = DEFAULT_INCREMENTAL_FLUSH_THRESHOLD,
    },
    ref,
  ) => {
    /** Whether to automatically start typing animation, changes after initialization will not take effect */
    const autoStartTypingRef = useRef(autoStartTyping);

    /** Whether typing has started */
    const isStartedTypingRef = useRef(false);

    /** Current content to be typed */
    const charsRef = useRef<IChar[]>([]);

    /**
     * Whether typing has completely ended
     * If typing has completely ended, typing animation will not be triggered again
     */
    const isWholeTypedEndRef = useRef(false);
    const charIndexRef = useRef(0);

    /** Reference to the entire content */
    const wholeContentRef = useRef<IWholeContent>({
      content: '',
      length: 0,
      prevLength: 0,
    });

    /** Incremental render buffers */
    const stableContentRef = useRef('');
    const tailContentRef = useRef('');
    const incrementalContextRef = useRef<IncrementalContext>(createInitialIncrementalContext());

    const [updateCount, setUpdate] = useState(0);
    const triggerUpdate = () => {
      setUpdate((prev) => prev + 1);
    };

    const appendToIncrementalBuffers = (content: string) => {
      if (!experimentalIncrementalRender || content.length === 0) {
        return;
      }

      tailContentRef.current += content;
      const context = incrementalContextRef.current;

      const chars = splitGraphemes(content);
      for (const char of chars) {
        context.lineBuffer += char;
        if (char !== '\n') {
          continue;
        }

        const line = context.lineBuffer.slice(0, -1);
        context.lineBuffer = '';
        if (processCompletedLine(line, context)) {
          stableContentRef.current += tailContentRef.current;
          tailContentRef.current = '';
          break;
        }
      }

      const threshold = Math.max(64, incrementalFlushThreshold);
      if (tailContentRef.current.length > 0 && shouldForceFlushBySize(context, tailContentRef.current, threshold)) {
        stableContentRef.current += tailContentRef.current;
        tailContentRef.current = '';
      }
    };

    const setIncrementalContent = (content: string) => {
      if (!experimentalIncrementalRender) {
        return;
      }
      stableContentRef.current = content;
      tailContentRef.current = '';
      incrementalContextRef.current = buildIncrementalContextFromContent(content);
    };

    const resetWholeContent = () => {
      wholeContentRef.current.content = '';
      wholeContentRef.current.length = 0;
      wholeContentRef.current.prevLength = 0;
      stableContentRef.current = '';
      tailContentRef.current = '';
      incrementalContextRef.current = createInitialIncrementalContext();
    };

    /**
     * Handle character display logic
     */
    const processCharDisplay = (char: IChar) => {
      if (!isStartedTypingRef.current) {
        isStartedTypingRef.current = true;
      }
      wholeContentRef.current.prevLength = wholeContentRef.current.length;
      wholeContentRef.current.content += char.content;
      wholeContentRef.current.length += char.content.length;
      appendToIncrementalBuffers(char.content);
      triggerUpdate();
    };

    // Use new typing task hook
    const typingTask = useTypingTask({
      timerType,
      interval,
      charsRef,
      onEnd,
      onStart,
      onTypedChar,
      onBeforeTypedChar,
      processCharDisplay,
      wholeContentRef,
      disableTyping,
      triggerUpdate,
      resetWholeContent,
    });

    /**
     * Internal push processing logic
     */
    const processHasTypingPush = (content: string) => {
      if (content.length === 0) {
        return;
      }
      const segments = splitGraphemes(content);
      charsRef.current.push(
        ...segments.map((chatStr) => {
          const index = charIndexRef.current++;
          const charObj: IChar = {
            content: chatStr,
            tokenId: 0,
            index,
          };
          return charObj;
        }),
      );

      // If auto typing is disabled and typing hasn't started, do not start typing animation
      if (!autoStartTypingRef.current && !isStartedTypingRef.current) {
        return;
      }

      if (!typingTask.isTyping()) {
        typingTask.start();
      }
    };

    const processNoTypingPush = (content: string) => {
      wholeContentRef.current.content += content;

      // Record length before typing
      wholeContentRef.current.prevLength = wholeContentRef.current.length;
      wholeContentRef.current.length += content.length;

      if (experimentalIncrementalRender) {
        setIncrementalContent(wholeContentRef.current.content);
      }

      triggerUpdate();
      onEnd?.({
        str: wholeContentRef.current.content,
        manual: false,
      });
    };

    useImperativeHandle(ref, () => ({
      /**
       * Add content
       * @param content Content {string}
       */
      push: (content: string) => {
        if (disableTyping) {
          processNoTypingPush(content);
          return;
        }
        processHasTypingPush(content);
      },
      /** Replace content immediately without typing animation */
      setContent: (content: string) => {
        typingTask.clear();
        typingTask.typedIsManualStopRef.current = false;
        charsRef.current = [];
        isWholeTypedEndRef.current = false;

        resetWholeContent();
        wholeContentRef.current.content = content;
        wholeContentRef.current.prevLength = content.length;
        wholeContentRef.current.length = content.length;

        if (experimentalIncrementalRender) {
          setIncrementalContent(content);
        }

        charIndexRef.current = splitGraphemes(content).length;
        isStartedTypingRef.current = content.length > 0;
        triggerUpdate();
      },
      /**
       * Clear typing task
       */
      clear: () => {
        typingTask.stop();

        typingTask.typedIsManualStopRef.current = false;
        charsRef.current = [];
        resetWholeContent();
        isWholeTypedEndRef.current = false;
        charIndexRef.current = 0;
        isStartedTypingRef.current = false;

        triggerUpdate();
      },
      /** Start typing, only takes effect when auto typing is disabled */
      start: () => {
        if (!autoStartTypingRef.current) {
          typingTask.start();
          // Trigger re-render to show cursor placeholder
          triggerUpdate();
        }
      },
      /** Stop typing task */
      stop: () => {
        typingTask.stop();
        // Trigger re-render to remove cursor placeholder
        triggerUpdate();
      },
      /** Resume typing task */
      resume: () => {
        typingTask.resume();
        // Trigger re-render to show cursor placeholder
        triggerUpdate();
      },
      /**
       * Manually trigger typing end
       */
      triggerWholeEnd: () => {
        isWholeTypedEndRef.current = true;
        if (!typingTask.isTyping()) {
          // Need to manually trigger end callback here, because triggerOnEnd in hook cannot be called directly
          onEnd?.({
            str: wholeContentRef.current.content,
            manual: true,
          });
        }
      },
      /** Restart typing task */
      restart: () => {
        typingTask.restart();
      },
    }));

    const shouldShowCursor = useMemo(() => {
      const isTyping = typingTask.isTypingRef.current;
      const hasPendingContent = charsRef.current.length > 0;
      const isPaused = !isTyping && hasPendingContent;
      return showCursor && (isTyping || (isPaused && showCursorOnPause)) && !disableTyping;
    }, [showCursor, showCursorOnPause, disableTyping, updateCount, typingTask.isTypingRef]);

    const mergedComponentsWithCursor = useMemo(() => {
      if (!shouldShowCursor || typeof cursor === 'string') {
        return reactMarkdownProps?.components;
      }

      return {
        ...reactMarkdownProps?.components,
        span: (props: any) => (
          <CursorSpan
            cursor={cursor}
            userSpanComponent={reactMarkdownProps?.components?.span}
            {...props}
          />
        ),
      };
    }, [shouldShowCursor, cursor, reactMarkdownProps?.components]);

    const reactMarkdownPropsBase = useMemo(() => {
      return {
        ...reactMarkdownProps,
        rehypePlugins: reactMarkdownProps?.rehypePlugins || [],
        components: reactMarkdownProps?.components,
      };
    }, [reactMarkdownProps]);

    const reactMarkdownPropsWithCursor = useMemo(() => {
      const basePlugins = reactMarkdownProps?.rehypePlugins || [];
      return {
        ...reactMarkdownProps,
        rehypePlugins: [...basePlugins, createRehypeCursorPlugin(cursor)],
        components: mergedComponentsWithCursor,
      };
    }, [reactMarkdownProps, cursor, mergedComponentsWithCursor]);

    if (!experimentalIncrementalRender) {
      const markdownString = customConvertMarkdownString?.(wholeContentRef.current.content) || wholeContentRef.current.content;
      const displayString = shouldShowCursor ? `${markdownString}${CURSOR_MARKER}` : markdownString;
      const mergedReactMarkdownProps = shouldShowCursor ? reactMarkdownPropsWithCursor : reactMarkdownPropsBase;
      return <ReactMarkdown {...mergedReactMarkdownProps}>{displayString}</ReactMarkdown>;
    }

    const stableMarkdownString =
      customConvertMarkdownString?.(stableContentRef.current) || stableContentRef.current;
    let tailMarkdownString = customConvertMarkdownString?.(tailContentRef.current) || tailContentRef.current;

    if (shouldShowCursor) {
      tailMarkdownString = `${tailMarkdownString}${CURSOR_MARKER}`;
    }

    const hasStable = stableMarkdownString.length > 0;
    const hasTail = tailMarkdownString.length > 0;

    return (
      <>
        {hasStable && (
          <ReactMarkdown {...reactMarkdownPropsBase}>{stableMarkdownString}</ReactMarkdown>
        )}
        {hasTail && (
          <ReactMarkdown {...(shouldShowCursor ? reactMarkdownPropsWithCursor : reactMarkdownPropsBase)}>
            {tailMarkdownString}
          </ReactMarkdown>
        )}
      </>
    );
  },
);

if (__DEV__) {
  MarkdownTyperCMD.displayName = 'MarkdownTyperCMD';
}

export default MarkdownTyperCMD;
