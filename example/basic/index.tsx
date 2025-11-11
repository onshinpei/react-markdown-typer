import { useMemo, useRef, useState } from 'react';

import Markdown, { MarkdownTyperRef } from '../../src';
import json from './data.json';

function throttle(fn: (...args: any[]) => void, delay: number) {
  let lastTime = 0;
  return (...args: unknown[]) => {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn(...args);
      lastTime = now;
    }
  };
}

const BasicDemo: React.FC = () => {
  const messageDivRef = useRef<HTMLDivElement>(null!);
  const [isStop, setIsStop] = useState(false);
  const [isTyping, setIsTyping] = useState(true);
  const markdownRef = useRef<MarkdownTyperRef>(null!);

  const scrollCacheRef = useRef<{
    type: 'manual' | 'auto';
    needAutoScroll: boolean;
    prevScrollTop: number;
  }>({
    type: 'manual',
    needAutoScroll: true,
    prevScrollTop: 0,
  });

  const onReset = () => {
    markdownRef.current.restart();
    setIsStop(false);
    setIsTyping(true);
  };

  const onStop = () => {
    markdownRef.current.stop();
    setIsStop(true);
  };

  const onResume = () => {
    markdownRef.current.resume();
    setIsStop(false);
    setIsTyping(true);
  };

  const throttleOnTypedChar = useMemo(() => {
    return throttle((char) => {
      if (!scrollCacheRef.current.needAutoScroll) return;
      const messageDiv = messageDivRef.current;
      // 自动滑动到最底部
      if (messageDiv) {
        messageDiv.scrollTo({
          top: messageDiv.scrollHeight,
          behavior: 'smooth',
        });
      }
    }, 50);
  }, []);

  const onScroll = useMemo(() => {
    return throttle((e: React.UIEvent<HTMLDivElement>) => {
      // 如果是往上滚动，则说明是手动滚动，则需要停止自动向下滚动
      // console.log(e.currentTarget.scrollTop - scrollCacheRef.current.prevScrollTop);
      if (e.currentTarget.scrollTop < scrollCacheRef.current.prevScrollTop) {
        scrollCacheRef.current.needAutoScroll = false;
      }
      scrollCacheRef.current.prevScrollTop = e.currentTarget.scrollTop;
    }, 50);
  }, []);

  const interval = 8;
  const flag = true;
  const timerType = flag ? 'requestAnimationFrame' : 'setTimeout';

  return (
    <>
      <div className="ds-message-actions">
        <div>
          <button onClick={onReset}>重置</button>
          <button disabled={isStop} onClick={onStop}>
            停止
          </button>
          <button disabled={!isStop} onClick={onResume}>
            继续
          </button>
          <button onClick={() => markdownRef.current.restart()}>重新开始</button>
          <span style={{ marginLeft: 30 }}>React 19有哪些新特性2</span>
        </div>
      </div>
      <div className="ds-message-box" ref={messageDivRef} onScroll={onScroll}>
        <div className="ds-message-list">
          <Markdown interval={5} ref={markdownRef} onTypedChar={throttleOnTypedChar} timerType={timerType} autoStartTyping={true}>
            {json.content}
          </Markdown>
        </div>
      </div>
    </>
  );
};

export default BasicDemo;
