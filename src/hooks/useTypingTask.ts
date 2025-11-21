import { useEffect, useRef } from 'react';
import { IChar, ITypedChar, IWholeContent, MarkdownTyperProps, IEndData, IBeforeTypedChar, IntervalType } from '../defined';

interface UseTypingTaskOptions {
  timerType: MarkdownTyperProps['timerType'];
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
  /** Whether stop method was called manually */
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
  /** Whether component is unmounted */
  const isUnmountRef = useRef(false);
  /** Whether currently typing */
  const isTypingRef = useRef(false);
  /** Animation frame ID */
  const animationFrameRef = useRef<number | null>(null);
  /** Traditional timer (compatibility mode) */
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  // Record of typed characters
  const typedCharsRef = useRef<{ typedContent: string; prevStr: string } | undefined>(undefined);
  // Whether stop method was called manually
  const typedIsManualStopRef = useRef(false);

  const disableTypingRef = useRef(disableTyping);
  disableTypingRef.current = disableTyping;

  const intervalRef = useRef(interval);
  intervalRef.current = interval;

  // Record the initial/maximum remaining character count for this typing task, used to calculate remaining percentage (increases when streaming appends)
  const initialRemainTotalRef = useRef<number>(0);

  /**
   * Calculate current typing interval (milliseconds) based on remaining character count and curve configuration
   */
  const getCurrentInterval = (remainCharsLength: number): number => {
    const cfg = intervalRef.current;
    if (typeof cfg === 'number') return cfg;

    // Dynamically update initial reference total, considering new characters in streaming scenarios
    if (remainCharsLength > initialRemainTotalRef.current) {
      initialRemainTotalRef.current = remainCharsLength;
    }
    const baseTotal = initialRemainTotalRef.current || remainCharsLength || 1;

    // r: remaining ratio [0,1], larger value means more remaining
    const r = Math.max(0, Math.min(1, remainCharsLength / baseTotal));

    // Curve function (prefer custom function)
    const pickCurveFn = (): ((x: number) => number) => {
      if (typeof cfg.curveFn === 'function') return cfg.curveFn;
      switch (cfg.curve) {
        case 'linear':
          return (x) => x;
        case 'ease-in':
          return (x) => x * x; // Slow start acceleration
        case 'ease-out':
          return (x) => 1 - (1 - x) * (1 - x); // Fast stop deceleration
        case 'ease-in-out':
          return (x) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);
        case 'step-start':
          return (x) => (x > 0 ? 1 : 0);
        case 'step-end':
          return (x) => (x < 1 ? 0 : 1);
        case 'ease':
        default:
          // Approximate general ease
          return (x) => 1 - Math.pow(1 - x, 1.6);
      }
    };

    const curveFn = pickCurveFn();
    const y = curveFn(r); // y ∈ [0,1], increases as r increases

    // Design: more remaining => faster (smaller interval).
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
   * Trigger typing start callback
   * @param char Current character
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
   * Trigger typing end callback
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
   * Trigger callback during typing process
   * @param char Current character
   */
  const triggerOnBeforeTypedChar = async (char: IChar) => {
    if (!onBeforeTypedChar) {
      return;
    }

    const { content, index } = char;

    const allLength = wholeContentRef.current.length;

    // Calculate percentage of previous characters
    const percent = (char.index / allLength) * 100;

    await onBeforeTypedChar({
      currentIndex: index,
      currentChar: content,
      prevStr: wholeContentRef.current.content,
      percent,
    });
  };

  /** Callback after typing a character */
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

  /** Clear timer */
  const clearTimer = () => {
    // Clear requestAnimationFrame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    // Clear setTimeout (may be used by timestamp mode)
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    isTypingRef.current = false;
    typedCharsRef.current = undefined;
  };

  /** Start typing task */
  const startTypedTask = () => {
    /** If stop method was called manually, do not restart typing */
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

  /** Typewriter finishes typing all characters */
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

  /** requestAnimationFrame mode */
  const startAnimationFrameMode = () => {
    let lastFrameTime = performance.now();

    const frameLoop = async (currentTime: number) => {
      if (isUnmountRef.current) return;
      // If typing animation is disabled, type all characters at once
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
        // Process characters
        for (let i = 0; i < needToTypingCharsLength; i++) {
          const char = chars.shift();
          if (char === undefined) break;

          if (!isTypingRef.current) {
            isTypingRef.current = true;
            triggerOnStart(char);
          }
          /** Callback before typing */
          await triggerOnBeforeTypedChar(char);
          processCharDisplay(char);
          /** Callback after typing */
          triggerOnTypedChar(char);
        }

        lastFrameTime = performance.now();

        // Continue to next frame
        if (chars.length > 0) {
          animationFrameRef.current = requestAnimationFrame(frameLoop);
        } else {
          isTypingRef.current = false;
          triggerOnEnd();
        }
      } else {
        // No typing needed this frame, continue to next frame
        animationFrameRef.current = requestAnimationFrame(frameLoop);
      }
    };
    animationFrameRef.current = requestAnimationFrame(frameLoop);
  };

  /** Stop animation frame mode */
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

  /** setTimeout mode */
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
      // If typing animation is disabled, type all characters at once
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
      /** Callback before typing */
      await triggerOnBeforeTypedChar(char);
      processCharDisplay(char);
      /** Callback after typing */
      triggerOnTypedChar(char);
      nextTyped();
    };

    startTyped(true);
  };

  /** Stop timeout mode */
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

  /** Temporarily stop */
  const stopTask = () => {
    typedIsManualStopRef.current = true;
    cancelTask();
  };

  /** Stop typing task */
  const endTask = () => {
    cancelTask();
  };

  function restartTypedTask() {
    endTask();
    typedIsManualStopRef.current = false;
    // Put wholeContentRef content into charsRef
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
