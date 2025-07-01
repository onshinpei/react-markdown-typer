import { useMemo, useRef, useState } from 'react';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Markdown, { MarkdownRef } from '../../src';
import dataJson from './data.json';

import 'katex/dist/katex.min.css';

function throttle<T extends unknown[]>(fn: (...args: T) => void, delay: number) {
  let lastTime = 0;
  return (...args: T) => {
    const now = Date.now();
    if (now - lastTime > delay) {
      fn(...args);
      lastTime = now;
    }
  };
}

const App: React.FC = () => {
  const [disableTyping, setDisableTyping] = useState(false);
  const messageDivRef = useRef<HTMLDivElement>(null!);
  const [isTyping, setIsTyping] = useState(false);
  const [isStop, setIsStop] = useState(false);

  const markdownRef = useRef<MarkdownRef>(null!);

  const [mathOpen, setMathOpen] = useState(true);

  const scrollCacheRef = useRef<{
    type: 'manual' | 'auto';
    needAutoScroll: boolean;
    prevScrollTop: number;
  }>({
    type: 'manual',
    needAutoScroll: true,
    prevScrollTop: 0,
  });

  const throttleOnTypedChar = useMemo(() => {
    return throttle(() => {
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
      if (e.currentTarget.scrollTop < scrollCacheRef.current.prevScrollTop) {
        scrollCacheRef.current.needAutoScroll = false;
      }
      scrollCacheRef.current.prevScrollTop = e.currentTarget.scrollTop;
    }, 50);
  }, []);

  const onRestart = () => {
    markdownRef.current.restart();
    setIsTyping(true);
  };

  const onStart = () => {
    markdownRef.current.start();
    setIsTyping(true);
  };

  const interval = 5;
  const flag = true;
  const timerType = flag ? 'requestAnimationFrame' : 'setTimeout';

  return (
    <>
      <div className="ds-message-actions" style={{ display: 'block' }}>
        <div style={{ marginBottom: 12 }}>
          {isTyping ? (
            <button className="start-btn" disabled={isStop} onClick={onRestart}>
              Restart
            </button>
          ) : (
            <button className="start-btn" disabled={isStop} onClick={onStart}>
              Start Task
            </button>
          )}
          <span style={{ marginLeft: 30 }}>What is the Pythagorean theorem?</span>
        </div>
        <div className="theme-btns">
          <button className="theme-btn" onClick={() => setMathOpen(!mathOpen)}>
            {mathOpen ? 'Disable' : 'Enable'} Formula Conversion
          </button>
          <button className="theme-btn" onClick={() => setDisableTyping(!disableTyping)}>
            {disableTyping ? 'Enable' : 'Disable'} Typewriter Effect
          </button>
          <button
            className="theme-btn"
            onClick={() => {
              markdownRef.current.stop();
              setIsStop(true);
            }}
          >
            Pause
          </button>

          <button
            className="theme-btn"
            onClick={() => {
              markdownRef.current.resume();
              setIsStop(false);
            }}
          >
            Resume
          </button>
        </div>
      </div>
      <div className="ds-message-box" ref={messageDivRef} onScroll={onScroll}>
        <div className="ds-message-list">
          <Markdown
            ref={markdownRef}
            interval={interval}
            onTypedChar={throttleOnTypedChar}
            timerType={timerType}
            math={{ splitSymbol: 'bracket' }}
            disableTyping={disableTyping}
            autoStartTyping={false}
            reactMarkdownProps={mathOpen ? { remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] } : undefined}
          >
            {dataJson.content}
          </Markdown>
        </div>
      </div>
    </>
  );
};

export default App;
