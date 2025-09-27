import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { MarkdownCMDProps, IChar, IWholeContent, MarkdownCMDRef } from '../defined';
import { __DEV__ } from '../constant';
import { useTypingTask } from '../hooks/useTypingTask';
import ReactMarkdown from 'react-markdown';
import { splitGraphemes } from '../utils/grapheme';

const MarkdownCMD = forwardRef<MarkdownCMDRef, MarkdownCMDProps>(
  (
    { interval = 30, onEnd, onStart, onTypedChar, onBeforeTypedChar, timerType = 'setTimeout', reactMarkdownProps, disableTyping = false, autoStartTyping = true, customConvertMarkdownString },
    ref,
  ) => {
    /** 是否自动开启打字动画, 后面发生变化将不会生效 */
    const autoStartTypingRef = useRef(autoStartTyping);

    /** 是否打过字 */
    const isStartedTypingRef = useRef(false);

    /** 当前需要打字的内容 */
    const charsRef = useRef<IChar[]>([]);

    /**
     * 打字是否已经完全结束
     * 如果打字已经完全结束，则不会再触发打字效果
     */
    const isWholeTypedEndRef = useRef(false);
    const charIndexRef = useRef(0);

    /** 整个内容引用 */
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
     * 处理字符显示逻辑
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

    // 使用新的打字任务 hook
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
     * 内部推送处理逻辑
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

      // 如果关闭了自动打字， 并且没有打过字， 则不开启打字动画
      if (!autoStartTypingRef.current && !isStartedTypingRef.current) {
        return;
      }

      if (!typingTask.isTyping()) {
        typingTask.start();
      }
    };

    const processNoTypingPush = (content: string) => {
      wholeContentRef.current.content += content;

      // 记录打字前的长度
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
       * 添加内容
       * @param content 内容 {string}
       * @param answerType 回答类型 {AnswerType}
       */
      push: (content: string) => {
        if (disableTyping) {
          processNoTypingPush(content);
          return;
        }
        processHasTypingPush(content);
      },
      /**
       * 清除打字任务
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
      /** 开启打字，只有在关闭了自动打字才生效 */
      start: () => {
        if (!autoStartTypingRef.current) {
          typingTask.start();
        }
      },
      /** 停止打字任务 */
      stop: () => {
        typingTask.stop();
      },
      /** 重新开始打字任务 */
      resume: () => {
        typingTask.resume();
      },
      /**
       * 主动触发打字结束
       */
      triggerWholeEnd: () => {
        isWholeTypedEndRef.current = true;
        if (!typingTask.isTyping()) {
          // 这里需要手动触发结束回调，因为 hook 中的 triggerOnEnd 不能直接调用
          onEnd?.({
            str: wholeContentRef.current.content,
            manual: true,
          });
        }
      },
      /** 重新开始打字任务 */
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
  MarkdownCMD.displayName = 'MarkdownCMD';
}

export default MarkdownCMD;
