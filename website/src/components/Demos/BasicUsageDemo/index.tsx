import React, { useRef, useState } from 'react';
import ReactMarkdownTyper, { type MarkdownTyperRef } from 'react-markdown-typer';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../../../contexts/LanguageContext';

interface DemoProps {
  markdown: string;
}

// 基础用法演示组件
const BasicUsageDemo: React.FC<DemoProps> = ({ markdown }) => {
  const markdownRef = useRef<MarkdownTyperRef>(null);
  const [isTyping, setIsTyping] = useState(true);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(true);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [disableTyping, setDisableTyping] = useState(false);
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

  const handleToggleTyping = () => {
    setDisableTyping((v) => !v);
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
        <button className="btn btn-outline" onClick={handleToggleTyping}>
          {disableTyping ? t('button.enableTyping') : t('button.disableTyping')}
        </button>
      </div>
      <ReactMarkdownTyper
        ref={markdownRef}
        interval={25}
        reactMarkdownProps={{
          remarkPlugins: [remarkGfm],
        }}
        disableTyping={disableTyping}
        autoStartTyping={true}
        onStart={handleTypingStart}
        onEnd={handleTypingEnd}
      >
        {markdown}
      </ReactMarkdownTyper>
    </div>
  );
};

export default BasicUsageDemo;
