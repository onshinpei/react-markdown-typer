import { useEffect, useRef } from 'react';
import { IChar, ITypedChar, IWholeContent, MarkdownProps, IEndData, IBeforeTypedChar } from '../defined';

interface UseTypingTaskOptions {
  timerType: MarkdownProps['timerType'];
  interval: number;
  charsRef: React.RefObject<IChar[]>;
  onEnd?: (data?: IEndData) => void;
  onStart?: (data?: { currentIndex: number; currentChar: string; prevStr: string }) => void;
  onBeforeTypedChar?: (data?: IBeforeTypedChar) => Promise<void>;
  onTypedChar?: (data?: ITypedChar) => void;
  processCharDisplay: (char: IChar) => void;
  wholeContentRef: React.RefObject<IWholeContent>;
  disableTyping: boolean;
  triggerUpdate: () => void;
  resetWholeContent: () => void;
}

export interface TypingTaskController {
  start: () => void;
  stop: () => void;
  clear: () => void;
  isTyping: () => boolean;
  /** 是否主动调用 stop 方法 */
  typedIsManualStopRef: React.RefObject<boolean>;
  resume: () => void;
  restart: () => void;
}

export const useTypingTask = (options: UseTypingTaskOptions): TypingTaskController => {
  const {
    timerType = 'setTimeout',
    interval,
    charsRef,
    onEnd,
    onStart,
    onBeforeTypedChar,
    onTypedChar,
    processCharDisplay,
    wholeContentRef,
    disableTyping,
    triggerUpdate,
    resetWholeContent,
  } = options;
  /** 是否卸载 */
  const isUnmountRef = useRef(false);
  /** 是否正在打字 */
  const isTypingRef = useRef(false);
  /** 动画帧ID */
  const animationFrameRef = useRef<number | null>(null);
  /** 传统定时器（兼容模式） */
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // 已经打过的字记录
  const typedCharsRef = useRef<{ typedContent: string; prevStr: string } | undefined>(undefined);
  // 是否主动调用 stop 方法
  const typedIsManualStopRef = useRef(false);

  const disableTypingRef = useRef(disableTyping);
  disableTypingRef.current = disableTyping;

  const intervalRef = useRef(interval);
  intervalRef.current = interval;

  const getChars = () => {
    return charsRef.current;
  };

  useEffect(() => {
    isUnmountRef.current = false;

    return () => {
      isUnmountRef.current = true;

      clearTimer();
    };
  }, []);

  /**
   * 触发打字开始回调
   * @param char 当前字符
   */
  const triggerOnStart = (char: IChar) => {
    if (!onStart) {
      return;
    }
    const prevStr = wholeContentRef.current.content;
    onStart({
      currentIndex: prevStr.length,
      currentChar: char.content,
      prevStr,
    });
  };

  /**
   * 触发打字结束回调
   */
  const triggerOnEnd = (data?: { manual?: boolean }) => {
    if (!onEnd) {
      return;
    }

    onEnd({
      str: wholeContentRef.current.content,
      manual: data?.manual ?? false,
    });
  };

  /**
   * 触发打字过程中回调
   * @param char 当前字符
   */
  const triggerOnBeforeTypedChar = async (char: IChar) => {
    if (!onBeforeTypedChar) {
      return;
    }

    const { content, index } = char;

    const allLength = wholeContentRef.current.length;

    // 计算之前字符的百分比
    const percent = (char.index / allLength) * 100;

    await onBeforeTypedChar({
      currentIndex: index,
      currentChar: content,
      prevStr: wholeContentRef.current.content,
      percent,
    });
  };

  /** 打字完成回调 */
  const triggerOnTypedChar = async (char: IChar) => {
    if (!onTypedChar) {
      return;
    }
    const { content, index } = char;
    const allLength = wholeContentRef.current.length;
    const percent = ((char.index + 1) / allLength) * 100;

    onTypedChar({
      currentIndex: index,
      currentChar: content,
      prevStr: wholeContentRef.current.content.slice(0, index),
      currentStr: wholeContentRef.current.content,
      percent,
    });
  };

  /** 清除定时器 */
  const clearTimer = () => {
    // 清理 requestAnimationFrame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // 清理 setTimeout (可能被 timestamp 模式使用)
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    isTypingRef.current = false;
    typedCharsRef.current = undefined;
  };

  /** 开始打字任务 */
  const startTypedTask = () => {
    /** 如果手动调用 stop 方法，则不重新开始打字 */
    if (typedIsManualStopRef.current) {
      return;
    }

    if (isTypingRef.current) {
      return;
    }

    if (timerType === 'requestAnimationFrame') {
      startAnimationFrameMode();
    } else {
      startTimeoutMode();
    }
  };

  /** 打字机打完所有字符 */
  async function typingRemainAll() {
    const chars = getChars();

    const answerCharsStr = chars.map((char) => char.content).join('');

    if (answerCharsStr) {
      await onBeforeTypedChar?.({
        currentIndex: wholeContentRef.current.length,
        currentChar: answerCharsStr,
        prevStr: wholeContentRef.current.content,
        percent: 100,
      });
    }

    wholeContentRef.current.content += answerCharsStr;
    wholeContentRef.current.prevLength = wholeContentRef.current.length;
    wholeContentRef.current.length += answerCharsStr.length;

    charsRef.current = [];
    isTypingRef.current = false;

    triggerOnEnd();
    triggerUpdate();
  }

  /** requestAnimationFrame 模式 */
  const startAnimationFrameMode = () => {
    let lastFrameTime = performance.now();

    const frameLoop = async (currentTime: number) => {
      // 如果关闭打字机效果，则打完所有字符
      if (disableTypingRef.current) {
        await typingRemainAll();
        return;
      }
      const chars = getChars();

      if (isUnmountRef.current) return;

      if (chars.length === 0) {
        stopAnimationFrame();
        return;
      }

      const deltaTime = currentTime - lastFrameTime;
      let needToTypingCharsLength = Math.max(0, Math.floor(deltaTime / intervalRef.current));
      needToTypingCharsLength = Math.min(needToTypingCharsLength, chars.length);

      if (needToTypingCharsLength > 0) {
        // 处理字符
        for (let i = 0; i < needToTypingCharsLength; i++) {
          const char = chars.shift();
          if (char === undefined) break;

          if (!isTypingRef.current) {
            isTypingRef.current = true;
            triggerOnStart(char);
          }
          /** 打字前回调 */
          await triggerOnBeforeTypedChar(char);
          processCharDisplay(char);
          /** 打字完成回调 */
          triggerOnTypedChar(char);
        }

        lastFrameTime = performance.now();

        // 继续下一帧
        if (chars.length > 0) {
          animationFrameRef.current = requestAnimationFrame(frameLoop);
        } else {
          isTypingRef.current = false;
          triggerOnEnd();
        }
      } else {
        // 本次你不需要打字，继续下一帧
        animationFrameRef.current = requestAnimationFrame(frameLoop);
      }
    };

    animationFrameRef.current = requestAnimationFrame(frameLoop);
  };

  /** 停止动画帧模式 */
  const stopAnimationFrame = (manual = false) => {
    isTypingRef.current = false;
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (!manual) {
      triggerOnEnd({ manual });
    }
  };

  /** setTimeout 模式 */
  const startTimeoutMode = () => {
    const nextTyped = () => {
      const chars = getChars();
      if (chars.length === 0) {
        stopTimeout();
        return;
      }
      timerRef.current = setTimeout(startTyped, intervalRef.current);
    };

    const startTyped = async (isStartPoint = false) => {
      // 如果关闭打字机效果，则打完所有字符
      if (disableTypingRef.current) {
        typingRemainAll();
        return;
      }

      const chars = getChars();
      if (isUnmountRef.current) return;

      isTypingRef.current = true;
      const char = chars.shift();

      if (char === undefined) {
        stopTimeout();
        return;
      }

      if (isStartPoint) {
        triggerOnStart(char);
      }
      /** 打字前回调 */
      await triggerOnBeforeTypedChar(char);
      processCharDisplay(char);
      /** 打字完成回调 */
      triggerOnTypedChar(char);
      nextTyped();
    };

    startTyped(true);
  };

  /** 停止超时模式 */
  const stopTimeout = () => {
    isTypingRef.current = false;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    triggerOnEnd();
  };

  const cancelTask = () => {
    if (timerType === 'requestAnimationFrame') {
      stopAnimationFrame();
    } else {
      stopTimeout();
    }
  };

  /** 暂时停止 */
  const stopTask = () => {
    typedIsManualStopRef.current = true;
    cancelTask();
  };

  /** 停止打字任务 */
  const endTask = () => {
    cancelTask();
  };

  function restartTypedTask() {
    endTask();
    typedIsManualStopRef.current = false;
    // 将wholeContentRef的内容放到charsRef中
    charsRef.current.unshift(
      ...wholeContentRef.current.content.split('').map((charUnit) => {
        const char: IChar = {
          content: charUnit,
          tokenId: 0,
          index: 0,
        };
        return char;
      }),
    );
    charsRef.current.unshift(
      ...wholeContentRef.current.content.split('').map((charUnit) => {
        const char: IChar = {
          content: charUnit,
          tokenId: 0,
          index: 0,
        };
        return char;
      }),
    );
    resetWholeContent();
    triggerUpdate();
    startTypedTask();
  }

  function clear() {
    clearTimer();
  }

  function resume() {
    typedIsManualStopRef.current = false;
    startTypedTask();
  }

  return {
    start: startTypedTask,
    restart: restartTypedTask,
    stop: stopTask,
    resume: resume,
    clear: clear,
    isTyping: () => isTypingRef.current,
    typedIsManualStopRef,
  };
};
