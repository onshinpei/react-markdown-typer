import { useEffect, useRef } from 'react';
import { IChar, ITypedChar, IWholeContent, MarkdownProps, IEndData, IBeforeTypedChar, IntervalType } from '../defined';

interface UseTypingTaskOptions {
  timerType: MarkdownProps['timerType'];
  interval: IntervalType;
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

  // 记录本次打字任务的初始/最高剩余字符总量，用于计算剩余占比（流式追加时会增大）
  const initialRemainTotalRef = useRef<number>(0);

  /**
   * 根据剩余字符数与曲线配置，计算当前打字间隔（毫秒）
   */
  const getCurrentInterval = (remainCharsLength: number): number => {
    const cfg = intervalRef.current;
    if (typeof cfg === 'number') return cfg;

    // 动态更新初始参考总量，考虑流式场景新增字符
    if (remainCharsLength > initialRemainTotalRef.current) {
      initialRemainTotalRef.current = remainCharsLength;
    }
    const baseTotal = initialRemainTotalRef.current || remainCharsLength || 1;

    // r: 剩余占比 [0,1]，越大表示剩余越多
    const r = Math.max(0, Math.min(1, remainCharsLength / baseTotal));

    // 曲线函数（优先使用自定义）
    const pickCurveFn = (): ((x: number) => number) => {
      if (typeof cfg.curveFn === 'function') return cfg.curveFn;
      switch (cfg.curve) {
        case 'linear':
          return (x) => x;
        case 'ease-in':
          return (x) => x * x; // 加速慢起
        case 'ease-out':
          return (x) => 1 - (1 - x) * (1 - x); // 减速快止
        case 'ease-in-out':
          return (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
        case 'step-start':
          return (x) => (x > 0 ? 1 : 0);
        case 'step-end':
          return (x) => (x < 1 ? 0 : 1);
        case 'ease':
        default:
          // 近似通用 ease
          return (x) => 1 - Math.pow(1 - x, 1.6);
      }
    };

    const curveFn = pickCurveFn();
    const y = curveFn(r); // y ∈ [0,1]，随 r 增大而增大

    // 设计：剩余越多 => 越快（更小的间隔）。
    // interval = min + (max - min) * (1 - y)
    const min = Math.max(0, cfg.min);
    const max = Math.max(min, cfg.max);
    const intervalMs = min + (max - min) * (1 - y);
    return intervalMs;
  };

  const getChars = () => {
    return charsRef.current;
  };

  useEffect(() => {
    isUnmountRef.current = false;

    return () => {
      isUnmountRef.current = true;
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
      if (isUnmountRef.current) return;
      // 如果关闭打字机效果，则打完所有字符
      if (disableTypingRef.current) {
        await typingRemainAll();
        return;
      }
      const chars = getChars();

      if (chars.length === 0) {
        stopAnimationFrame();
        return;
      }

      const deltaTime = currentTime - lastFrameTime;
      const currentInterval = getCurrentInterval(chars.length);
      let needToTypingCharsLength = Math.max(0, Math.floor(deltaTime / currentInterval));
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
      const currentInterval = getCurrentInterval(chars.length);
      timerRef.current = setTimeout(startTyped, currentInterval);
    };

    const startTyped = async (isStartPoint = false) => {
      if (isUnmountRef.current) return;
      // 如果关闭打字机效果，则打完所有字符
      if (disableTypingRef.current) {
        typingRemainAll();
        return;
      }

      const chars = getChars();

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
