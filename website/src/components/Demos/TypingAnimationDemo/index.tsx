import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactMarkdownTyper, { type MarkdownTyperRef } from 'react-markdown-typer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { useLanguage } from '../../../contexts/LanguageContext';

interface DemoProps {
  markdown: string;
}

interface TypingStats {
  currentIndex: number;
  currentChar: string;
  percent: number;
  totalChars: number;
  startTime?: number;
  avgSpeed: number;
}

interface ComponentConfig {
  interval: number;
  timerType: 'setTimeout' | 'requestAnimationFrame';
  theme: 'light' | 'dark';
  disableTyping: boolean;
  autoStartTyping: boolean;
  mathEnabled: boolean;
  answerType: string;
}

interface ITypedChar {
  currentIndex: number;
  currentChar: string;
  prevStr: string;
  currentStr: string;
  percent: number;
}

interface IBeforeTypedChar {
  currentIndex: number;
  currentChar: string;
  prevStr: string;
  percent: number;
}

interface StartData {
  timestamp: number;
}

interface EndData {
  manual?: boolean;
}

const DEFAULT_CONFIG: TypingStats = {
  currentIndex: 0,
  currentChar: '',
  percent: 0,
  totalChars: 0,
  avgSpeed: 0,
};

// 全面的打字动画演示组件
const TypingAnimationDemo: React.FC<DemoProps> = ({ markdown }) => {
  const markdownRef = useRef<MarkdownTyperRef>(null);
  const { t } = useLanguage();

  // 组件配置状态
  const [config, setConfig] = useState<ComponentConfig>({
    interval: 30,
    timerType: 'setTimeout',
    answerType: 'answer',
    theme: 'light',
    disableTyping: false,
    autoStartTyping: false,
    mathEnabled: true,
  });

  // 组件运行状态
  const [isTyping, setIsTyping] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const resetStatus = () => {
    setIsTyping(false);
    setIsStopped(false);
    setIsStarted(false);
    setTypingStats(DEFAULT_CONFIG);
    setCallbackData({});
    setPerformanceMetrics({
      frameCount: 0,
      avgFrameTime: 0,
      lastFrameTime: 0,
    });
  };

  // 打字统计数据
  const [typingStats, setTypingStats] = useState<TypingStats>(DEFAULT_CONFIG);

  // 回调数据展示
  const [callbackData, setCallbackData] = useState<{
    onStart?: StartData;
    onEnd?: EndData;
    onBeforeTypedChar?: IBeforeTypedChar;
    onTypedChar?: ITypedChar;
  }>({});

  // 性能监控
  const [performanceMetrics, setPerformanceMetrics] = useState({
    frameCount: 0,
    avgFrameTime: 0,
    lastFrameTime: 0,
  });

  // 配置更新函数
  const updateConfig = useCallback((key: keyof ComponentConfig, value: string | number | boolean) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  }, []);

  // 需要重新渲染的配置项key
  const rerenderKey = `${config.timerType}-${config.autoStartTyping}-${config.answerType}`;

  // 演示用的丰富Markdown内容
  const getDemoContent = () => {
    return `# 🚀 全面API演示

这个演示展示了 **react-markdown-typer** 的所有核心功能和特性。

## ⌨️ 打字效果特性

### 🎛️ 可配置参数
1. **interval**: 控制打字速度，支持 5-200ms 范围调节
2. **timerType**: 两种模式
   - 🎬 **requestAnimationFrame** - 流畅动画，适合现代应用
   - ⏰ **setTimeout** - 精确计时，适合兼容性要求
3. **theme**: 主题切换
   - ☀️ **light** - 亮色主题，适合日间使用
   - 🌙 **dark** - 暗色主题，适合夜间使用
4. **answerType**: 内容类型
   - 💬 **answer** - 回答模式
   - 🤔 **thinking** - 思考模式

### 🎮 控制方法
支持以下 ref 方法：
- \`start()\` - 开始打字动画
- \`stop()\` - 暂停打字动画
- \`resume()\` - 继续打字动画
- \`restart()\` - 重新开始动画

### 🔄 回调函数监控
- **onStart**: 打字开始时触发
- **onEnd**: 打字结束时触发
- **onBeforeTypedChar**: 每个字符打字前触发
- **onTypedChar**: 每个字符打字后触发

实时监控打字过程中的所有事件和数据变化。

## 🧮 数学公式演示
这里有一些数学公式：

行内公式：$E = mc^2$

块级公式：
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

勾股定理：$a^2 + b^2 = c^2$

## 💡 最佳实践建议

### 性能优化
- 推荐使用 **requestAnimationFrame** 模式
- 间隔设置为 **15-30ms** 获得最佳体验
- 高频场景下启用 RAF 模式处理多字符

### 用户体验
- 根据使用环境选择合适的主题
- 根据内容类型选择合适的 answerType
- 利用回调函数添加自定义交互效果

### 代码示例

\`\`\`typescript
import ReactMarkdownTyper from 'react-markdown-typer';
import { katexPlugin } from 'react-markdown-typer/plugins';

<ReactMarkdownTyper
  interval={30}
  timerType="requestAnimationFrame"
  theme="light"
  plugins={[katexPlugin]}
  onTypedChar={(data) => {
    console.log('当前字符:', data.currentChar);
    console.log('进度:', data.percent);
  }}
>
  # Hello World
  这是一个**打字动画**示例。
</ReactMarkdownTyper>
\`\`\`

> 🎯 这是一个完整的功能演示，展示了库的所有核心特性！

## 🔧 技术特性

### 类型安全
- 完整的 TypeScript 类型定义
- 智能代码提示和错误检查
- 类型安全的 ref 方法调用

### 插件系统
- 支持 remark/rehype 插件
- 内置 KaTeX 数学公式支持
- 可扩展的插件架构

### 性能监控
- 实时帧率监控
- 打字速度统计
- 内存使用优化

这个演示让你可以实时体验和调试所有功能特性！`;
  };

  // 回调函数定义
  const handleStart = useCallback(() => {
    const startData = { timestamp: Date.now() };
    setCallbackData((prev) => ({ ...prev, onStart: startData }));
    setIsTyping(true);
    setTypingStats((prev) => ({ ...prev, startTime: Date.now() }));
    setPerformanceMetrics({ frameCount: 0, avgFrameTime: 0, lastFrameTime: Date.now() });
  }, []);

  const handleEnd = useCallback((data?: { manual?: boolean }) => {
    setCallbackData((prev) => ({ ...prev, onEnd: data }));
    if (!data?.manual) {
      setIsTyping(false);
      setIsStopped(false);
    }
  }, []);

  const handleBeforeTypedChar = useCallback(async (data?: IBeforeTypedChar) => {
    if (!data) return;
    setCallbackData((prev) => ({ ...prev, onBeforeTypedChar: data }));

    // 性能监控
    const now = Date.now();
    setPerformanceMetrics((prev) => {
      const frameTime = now - prev.lastFrameTime;
      const newFrameCount = prev.frameCount + 1;
      const newAvgFrameTime = (prev.avgFrameTime * prev.frameCount + frameTime) / newFrameCount;

      return {
        frameCount: newFrameCount,
        avgFrameTime: newAvgFrameTime,
        lastFrameTime: now,
      };
    });

    // 模拟特殊字符的延迟效果
    if (data.currentChar === '!' || data.currentChar === '?') {
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }, []);

  const handleTypedChar = useCallback((data?: ITypedChar) => {
    if (!data) return;
    setCallbackData((prev) => ({ ...prev, onTypedChar: data }));

    // 更新打字统计
    setTypingStats((prev) => {
      const elapsed = (Date.now() - (prev.startTime || Date.now())) / 1000;
      const avgSpeed = elapsed > 0 ? data.currentIndex / elapsed : 0;

      return {
        currentIndex: data.currentIndex,
        currentChar: data.currentChar,
        percent: data.percent,
        totalChars: data.currentIndex + 1,
        startTime: prev.startTime,
        avgSpeed,
      };
    });
  }, []);

  // 控制函数
  const handleStartDemo = () => {
    if (isStarted) {
      markdownRef.current?.restart?.();
    } else {
      markdownRef.current?.start?.();
      setIsStarted(true);
    }
    setIsTyping(true);
    setIsStopped(false);
  };

  const handleStop = () => {
    markdownRef.current?.stop?.();
    setIsTyping(false);
    setIsStopped(true);
  };

  const handleResume = () => {
    markdownRef.current?.resume?.();
    setIsTyping(true);
    setIsStopped(false);
  };

  return (
    <div className={`demo-impl ${config.theme === 'dark' ? 'demo-impl-dark' : 'demo-impl-light'}`}>
      {/* 配置面板 */}
      <div style={{ marginBottom: 20, padding: 16, background: config.theme === 'dark' ? '#2d3748' : '#f7fafc', borderRadius: 8 }}>
        <h4 style={{ margin: '0 0 12px 0', color: config.theme === 'dark' ? '#e2e8f0' : '#2d3748' }}>🎛️ {t('label.configPanel')}</h4>

        {/* 第一组：实时生效的配置 */}
        <div style={{ marginBottom: 16 }}>
          <h5 style={{ margin: '0 0 8px 0', fontSize: 14, color: config.theme === 'dark' ? '#cbd5e0' : '#4a5568' }}>⚡ {t('label.realtimeConfig')}</h5>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {/* 间隔控制 */}
            <div className="select-wrapper">
              <label className="select-label">{t('label.interval')}:</label>
              <input type="range" min="5" max="2000" value={config.interval} onChange={(e) => updateConfig('interval', parseInt(e.target.value))} style={{ width: '100%' }} />
              <span style={{ fontSize: 12, color: config.theme === 'dark' ? '#a0aec0' : '#718096' }}>{config.interval}ms</span>
            </div>

            {/* 主题 */}
            <div className="select-wrapper">
              <label className="select-label">{t('label.theme')}:</label>
              <select className="select-control" value={config.theme} onChange={(e) => updateConfig('theme', e.target.value)}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>

          {/* 实时开关 */}
          <div style={{ marginTop: 12, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" checked={config.disableTyping} onChange={(e) => updateConfig('disableTyping', e.target.checked)} />
              <span className="select-label">{t('label.disableTyping')}</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input type="checkbox" checked={config.mathEnabled} onChange={(e) => updateConfig('mathEnabled', e.target.checked)} />
              <span className="select-label">{t('label.mathFormula')}</span>
            </label>
          </div>
        </div>

        {/* 第二组：需要重新渲染的配置 */}
        <div
          style={{
            padding: 12,
            border: `1px dashed ${config.theme === 'dark' ? '#4a5568' : '#e2e8f0'}`,
            borderRadius: 6,
            background: config.theme === 'dark' ? '#2d3748' : '#f8f9fa',
          }}
        >
          <h5 style={{ margin: '0 0 8px 0', fontSize: 14, color: config.theme === 'dark' ? '#fbb6ce' : '#d53f8c' }}>🔄 {t('label.rerenderConfig')}</h5>
          <p style={{ fontSize: 12, margin: '0 0 12px 0', color: config.theme === 'dark' ? '#a0aec0' : '#718096' }}>{t('text.rerenderDescription')}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {/* 定时器类型 */}
            <div className="select-wrapper">
              <label className="select-label">{t('label.timerType')}:</label>
              <select
                className="select-control"
                value={config.timerType}
                onChange={(e) => {
                  updateConfig('timerType', e.target.value);
                  resetStatus();
                }}
              >
                <option value="setTimeout">setTimeout</option>
                <option value="requestAnimationFrame">requestAnimationFrame</option>
              </select>
            </div>
          </div>

          {/* 重新渲染开关 */}
          <div style={{ marginTop: 12, display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <input
                type="checkbox"
                checked={config.autoStartTyping}
                onChange={(e) => {
                  updateConfig('autoStartTyping', e.target.checked);
                  resetStatus();
                }}
              />
              <span className="select-label">{t('label.autoStart')}</span>
            </label>
          </div>
        </div>
      </div>

      {/* 控制按钮 */}
      <div style={{ marginBottom: 16, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <button className="btn btn-success" onClick={handleStartDemo} disabled={isStopped}>
          {isStarted ? t('button.restart') : t('button.startDemo')}
        </button>
        <button className="btn btn-danger" onClick={handleStop} disabled={!isTyping || isStopped}>
          {t('button.stop')}
        </button>
        <button className="btn btn-warning" onClick={handleResume} disabled={!isStopped}>
          {t('button.resume')}
        </button>
      </div>

      {/* 实时状态监控 */}
      <div style={{ marginBottom: 16, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 12 }}>
        {/* 打字统计 */}
        <div
          style={{
            padding: 12,
            background: config.theme === 'dark' ? '#1a202c' : '#fff',
            borderRadius: 8,
            border: `1px solid ${config.theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
          }}
        >
          <h5 style={{ margin: '0 0 8px 0', color: config.theme === 'dark' ? '#e2e8f0' : '#2d3748' }}>📊 {t('label.typingStats')}</h5>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: config.theme === 'dark' ? '#a0aec0' : '#718096' }}>
            {/* 进度条 */}
            <div style={{ marginBottom: 8 }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 4,
                }}
              >
                <span>{t('label.progress')}</span>
                <span>{typingStats.percent.toFixed(1)}%</span>
              </div>
              <input type="range" min={0} max={100} value={typingStats.percent} style={{ width: '100%' }} />
            </div>
            <div>
              {t('label.currentChar')}: "{typingStats.currentChar}"
            </div>
            <div>
              {t('label.totalChars')}: {typingStats.totalChars}
            </div>
            <div>
              {t('label.avgSpeed')}: {typingStats.avgSpeed.toFixed(1)}
            </div>
          </div>
        </div>

        {/* 性能监控 */}
        <div
          style={{
            padding: 12,
            background: config.theme === 'dark' ? '#1a202c' : '#fff',
            borderRadius: 8,
            border: `1px solid ${config.theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
          }}
        >
          <h5 style={{ margin: '0 0 8px 0', color: config.theme === 'dark' ? '#e2e8f0' : '#2d3748' }}>⚡ {t('label.performanceMonitor')}</h5>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: config.theme === 'dark' ? '#a0aec0' : '#718096' }}>
            <div>
              {t('label.frameCount')}: {performanceMetrics.frameCount}
            </div>
            <div>
              {t('label.avgFrameTime')}: {performanceMetrics.avgFrameTime.toFixed(1)}ms
            </div>
            <div>
              {t('label.timer')}: {config.timerType}
            </div>
            <div>
              {t('label.status')}: {isTyping ? t('label.running') : t('label.stopped')}
            </div>
          </div>
        </div>

        {/* 最新回调数据 */}
        <div
          style={{
            padding: 12,
            background: config.theme === 'dark' ? '#1a202c' : '#fff',
            borderRadius: 8,
            border: `1px solid ${config.theme === 'dark' ? '#2d3748' : '#e2e8f0'}`,
          }}
        >
          <h5 style={{ margin: '0 0 8px 0', color: config.theme === 'dark' ? '#e2e8f0' : '#2d3748' }}>🔄 {t('label.callbackData')}</h5>
          <div style={{ fontSize: 12, lineHeight: 1.5, color: config.theme === 'dark' ? '#a0aec0' : '#718096' }}>
            <div>onTypedChar: {callbackData.onTypedChar?.currentChar || '-'}</div>
            <div>
              {t('label.progress')}: {callbackData.onTypedChar?.percent?.toFixed(1) || 0}%
            </div>
            <div>index: {callbackData.onTypedChar?.currentIndex || 0}</div>
            <div>type: {callbackData.onTypedChar?.answerType || config.answerType}</div>
          </div>
        </div>
      </div>

      {/* 渲染区域 */}
      <div>
        <ReactMarkdownTyper
          key={rerenderKey}
          ref={markdownRef}
          interval={config.interval}
          timerType={config.timerType}
          disableTyping={config.disableTyping}
          autoStartTyping={config.autoStartTyping}
          reactMarkdownProps={{ remarkPlugins: [remarkGfm, ...(config.mathEnabled ? [remarkMath] : [])], rehypePlugins: config.mathEnabled ? [rehypeKatex] : [] }}
          onStart={handleStart}
          onEnd={handleEnd}
          onBeforeTypedChar={handleBeforeTypedChar}
          onTypedChar={handleTypedChar}
        >
          {getDemoContent()}
        </ReactMarkdownTyper>
      </div>
    </div>
  );
};

export default TypingAnimationDemo;
