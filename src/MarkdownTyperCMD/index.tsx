import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { MarkdownTyperCMDProps, IChar, IWholeContent, MarkdownTyperCMDRef } from '../defined';
import { __DEV__ } from '../constant';
import { useTypingTask } from '../hooks/useTypingTask';
import ReactMarkdown from 'react-markdown';
import { splitGraphemes } from '../utils/grapheme';

const MarkdownTyperCMD = forwardRef<MarkdownTyperCMDRef, MarkdownTyperCMDProps>(
  (
    { interval = 30, onEnd, onStart, onTypedChar, onBeforeTypedChar, timerType = 'setTimeout', reactMarkdownProps, disableTyping = false, autoStartTyping = true, customConvertMarkdownString },
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

    const [, setUpdate] = useState(0);
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
        }
      },
      /** Stop typing task */
      stop: () => {
        typingTask.stop();
      },
      /** Resume typing task */
      resume: () => {
        typingTask.resume();
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

    return <ReactMarkdown {...reactMarkdownProps}>{markdownString}</ReactMarkdown>;
  },
);

if (__DEV__) {
  MarkdownTyperCMD.displayName = 'MarkdownTyperCMD';
}

export default MarkdownTyperCMD;
