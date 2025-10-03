import React, { useRef, useState } from 'react';
import ReactMarkdownTyper from 'react-markdown-typer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { useLanguage } from '../../../contexts/LanguageContext';

import 'katex/dist/katex.min.css';

interface DemoProps {
  markdown: string;
}

// 数学公式演示组件
interface MarkdownTyperRefLike {
  start: () => void;
  stop: () => void;
  resume: () => void;
  restart: () => void;
}

const MathSupportDemo: React.FC<DemoProps> = ({ markdown }) => {
  const markdownRef = useRef<MarkdownTyperRefLike>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
  const [mathOpen, setMathOpen] = useState(true);
  const { t } = useLanguage();

  // 事件处理函数
  const handleStart = () => {
    if (isStarted) {
      // 如果已经开始过，则重新开始
      markdownRef.current?.restart();
    } else {
      // 第一次开始
      markdownRef.current?.start();
      setIsStarted(true);
    }
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleStop = () => {
    markdownRef.current?.stop();
    setIsStopped(true);
  };

  const handleResume = () => {
    markdownRef.current?.resume();
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleToggleMath = () => {
    setMathOpen(!mathOpen);
  };

  const handleToggleTyping = () => {
    setDisableTyping(!disableTyping);
  };

  const handleTypingStart = () => {
    setIsTyping(true);
  };

  const handleTypingEnd = (data?: { manual?: boolean }) => {
    if (!data?.manual) {
      setIsTyping(false);
      setIsStopped(false);
    }
  };

  return (
    <div className={`demo-impl ${theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}>
      <div style={{ marginBottom: 16, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        <button className="btn btn-success" onClick={handleStart} disabled={isStopped}>
          {isStarted ? t('button.restart') : t('button.start')}
        </button>
        <button className="btn btn-danger" onClick={handleStop} disabled={!isTyping || isStopped}>
          {t('button.stop')}
        </button>
        <button className="btn btn-warning" onClick={handleResume} disabled={!isStopped}>
          {t('button.resume')}
        </button>
        <button className="btn btn-secondary" onClick={handleToggleTheme}>
          {theme === 'light' ? t('button.darkTheme') : t('button.lightTheme')}
        </button>
        <button className="btn btn-primary" onClick={handleToggleMath}>
          {mathOpen ? t('button.disableMath') : t('button.enableMath')}
        </button>
        <button className="btn btn-outline" onClick={handleToggleTyping}>
          {disableTyping ? t('button.enableTyping') : t('button.disableTyping')}
        </button>
      </div>
      <ReactMarkdownTyper
        ref={markdownRef}
        interval={20}
        reactMarkdownProps={{ remarkPlugins: mathOpen ? [remarkMath] : [], rehypePlugins: mathOpen ? [rehypeKatex] : [] }}
        disableTyping={disableTyping}
        autoStartTyping={false}
        onStart={handleTypingStart}
        onEnd={handleTypingEnd}
      >
        {markdown}
      </ReactMarkdownTyper>
    </div>
  );
};

export default MathSupportDemo;
