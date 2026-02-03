import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { MarkdownTyperCMDProps, IChar, IWholeContent, MarkdownTyperCMDRef } from '../defined';
import { __DEV__ } from '../constant';
import { useTypingTask } from '../hooks/useTypingTask';
import ReactMarkdown from 'react-markdown';
import { splitGraphemes } from '../utils/grapheme';
import { createRehypeCursorPlugin } from '../plugins/rehypeCursor';
import { CursorSpan } from '../components/CursorSpan';

const MarkdownTyperCMD = forwardRef<MarkdownTyperCMDRef, MarkdownTyperCMDProps>(
  (
    { interval = 30, onEnd, onStart, onTypedChar, onBeforeTypedChar, timerType = 'setTimeout', reactMarkdownProps, disableTyping = false, autoStartTyping = true, customConvertMarkdownString, showCursor = false, cursor = '|', showCursorOnPause = true },
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

    const [updateCount, setUpdate] = useState(0);
    const triggerUpdate = () => {
      setUpdate((prev) => prev + 1);
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
      triggerUpdate();
    };

    const resetWholeContent = () => {
      wholeContentRef.current.content = '';
      wholeContentRef.current.length = 0;
      wholeContentRef.current.prevLength = 0;
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
      triggerUpdate();
      onEnd?.({
        str: content,
        manual: false,
      });
    };

    useImperativeHandle(ref, () => ({
      /**
       * Add content
       * @param content Content {string}
       * @param answerType Answer type {AnswerType}
       */
      push: (content: string) => {
        if (disableTyping) {
          processNoTypingPush(content);
          return;
        }
        processHasTypingPush(content);
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

    const markdownString = useMemo(() => {
      return customConvertMarkdownString?.(wholeContentRef.current.content) || wholeContentRef.current.content;
    }, [wholeContentRef.current.content, customConvertMarkdownString]);

    // Build display string with cursor placeholder
    // Include updateCount to ensure re-calculation when typing state changes
    const displayString = useMemo(() => {
      // Show cursor when:
      // 1. Currently typing (isTypingRef.current = true), or
      // 2. Paused and showCursorOnPause is true and has pending content
      const isTyping = typingTask.isTypingRef.current;
      const hasPendingContent = charsRef.current.length > 0;
      const isPaused = !isTyping && hasPendingContent;
      const shouldShowCursorNow = showCursor && (isTyping || (isPaused && showCursorOnPause)) && !disableTyping;

      if (shouldShowCursorNow) {
        // Use a unique marker that won't conflict with markdown syntax
        // Using zero-width space to make it invisible if somehow rendered
        return markdownString + '\u200B__MDTYPER_CURSOR__\u200B';
      }
      return markdownString;
    }, [markdownString, showCursor, showCursorOnPause, disableTyping, updateCount]);

    // Show cursor when typing is in progress (or paused based on config) and showCursor is enabled
    // Must calculate after displayString to use same updateCount
    const shouldShowCursor = useMemo(() => {
      const isTyping = typingTask.isTypingRef.current;
      const hasPendingContent = charsRef.current.length > 0;
      const isPaused = !isTyping && hasPendingContent;
      return showCursor && (isTyping || (isPaused && showCursorOnPause)) && !disableTyping;
    }, [showCursor, showCursorOnPause, disableTyping, updateCount]);

    // Create rehype plugin to handle cursor placeholder
    const rehypeCursorPlugin = useMemo(() => {
      if (!shouldShowCursor) {
        return null;
      }
      return createRehypeCursorPlugin(cursor);
    }, [shouldShowCursor, cursor]);

    // Merge rehype plugins
    const mergedRehypePlugins = useMemo(() => {
      const basePlugins = reactMarkdownProps?.rehypePlugins || [];
      if (rehypeCursorPlugin) {
        return [...basePlugins, rehypeCursorPlugin];
      }
      return basePlugins;
    }, [reactMarkdownProps?.rehypePlugins, rehypeCursorPlugin]);

    // Merge components
    const mergedComponents = useMemo(() => {
      if (!shouldShowCursor || typeof cursor === 'string') {
        return reactMarkdownProps?.components;
      }

      // For ReactNode cursor, wrap span component to handle cursor placeholder
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

    const mergedReactMarkdownProps = useMemo(() => {
      return {
        ...reactMarkdownProps,
        rehypePlugins: mergedRehypePlugins,
        components: mergedComponents,
      };
    }, [reactMarkdownProps, mergedRehypePlugins, mergedComponents]);

    return <ReactMarkdown {...mergedReactMarkdownProps}>{displayString}</ReactMarkdown>;
  },
);

if (__DEV__) {
  MarkdownTyperCMD.displayName = 'MarkdownTyperCMD';
}

export default MarkdownTyperCMD;
