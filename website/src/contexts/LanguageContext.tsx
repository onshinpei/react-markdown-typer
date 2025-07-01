import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'zh' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

// 定义翻译字典类型
type TranslationKey =
  | 'site.title'
  | 'site.subtitle'
  | 'nav.installation'
  | 'nav.basicUsage'
  | 'nav.mathSupport'
  | 'nav.typingAnimation'
  | 'nav.themes'
  | 'nav.streaming'
  | 'nav.api'
  | 'section.installation'
  | 'section.basicUsage'
  | 'section.mathSupport'
  | 'section.typingAnimation'
  | 'section.themes'
  | 'section.streaming'
  | 'language.switch'
  | 'language.chinese'
  | 'language.english'
  | 'api.title'
  | 'api.props'
  | 'api.dsMarkdownMethods'
  | 'api.markdownCMDMethods'
  | 'api.typeDefinitions'
  | 'api.timerComparison'
  | 'api.formulaDelimiters'
  | 'api.bestPractices'
  | 'demo.markdownString'
  | 'demo.code'
  | 'demo.effect'
  | 'button.start'
  | 'button.restart'
  | 'button.stop'
  | 'button.resume'
  | 'button.clear'
  | 'button.darkTheme'
  | 'button.lightTheme'
  | 'button.enableTyping'
  | 'button.disableTyping'
  | 'button.enableMath'
  | 'button.disableMath'
  | 'button.switchToDark'
  | 'button.switchToLight'
  | 'button.startDemo'
  | 'button.startStreaming'
  | 'label.current'
  | 'label.lightMode'
  | 'label.darkMode'
  | 'label.scenarioSelect'
  | 'label.aiChat'
  | 'label.codeGeneration'
  | 'label.documentation'
  | 'label.configPanel'
  | 'label.realtimeConfig'
  | 'label.rerenderConfig'
  | 'label.interval'
  | 'label.theme'
  | 'label.disableTyping'
  | 'label.mathFormula'
  | 'label.timerType'
  | 'label.autoStart'
  | 'label.typingStats'
  | 'label.progress'
  | 'label.currentChar'
  | 'label.totalChars'
  | 'label.avgSpeed'
  | 'label.performanceMonitor'
  | 'label.frameCount'
  | 'label.avgFrameTime'
  | 'label.timer'
  | 'label.status'
  | 'label.running'
  | 'label.stopped'
  | 'label.callbackData'
  | 'text.rerenderDescription';

type TranslationDict = Record<TranslationKey, string>;

// 翻译字典
const translations: Record<Language, TranslationDict> = {
  zh: {
    'site.title': 'react-markdown-typer',
    'site.subtitle': '🚀 智能 Markdown 打字动画渲染引擎',
    'nav.installation': '安装',
    'nav.basicUsage': '基础用法',
    'nav.mathSupport': '数学公式',
    'nav.typingAnimation': '打字动画',
    'nav.themes': '主题切换',
    'nav.streaming': '流式演示',
    'nav.api': 'API 文档',
    'section.installation': '📦 安装',
    'section.basicUsage': '🚀 基础用法',
    'section.mathSupport': '🧮 数学公式支持',
    'section.typingAnimation': '⌨️ 打字动画控制',
    'section.themes': '🎨 主题切换',
    'section.streaming': '📺 流式演示',
    'language.switch': '切换语言',
    'language.chinese': '中文',
    'language.english': 'English',
    'api.title': '📚 API 文档',
    'api.props': 'Props 属性',
    'api.dsMarkdownMethods': 'Ref 方法 - ReactMarkdownTyper',
    'api.markdownCMDMethods': 'Ref 方法 - MarkdownCMD',
    'api.typeDefinitions': '类型定义',
    'api.timerComparison': '定时器模式对比',
    'api.formulaDelimiters': '数学公式分隔符说明',
    'api.bestPractices': '最佳实践建议',
    'demo.markdownString': 'Markdown 字符串',
    'demo.code': '代码',
    'demo.effect': '效果',
    'button.start': '▶️ 开始',
    'button.restart': '🔄 重新开始',
    'button.stop': '⏹️ 停止',
    'button.resume': '⏭️ 继续',
    'button.clear': '🗑️ 清空',
    'button.darkTheme': '🌙 暗色主题',
    'button.lightTheme': '☀️ 亮色主题',
    'button.enableTyping': '开启打字效果',
    'button.disableTyping': '关闭打字效果',
    'button.enableMath': '开启公式转换',
    'button.disableMath': '关闭公式转换',
    'button.switchToDark': '暗色',
    'button.switchToLight': '亮色',
    'button.startDemo': '▶️ 开始演示',
    'button.startStreaming': '▶️ 开始流式演示',
    'label.current': '当前',
    'label.lightMode': '☀️ 亮色模式',
    'label.darkMode': '🌙 暗色模式',
    'label.scenarioSelect': '场景选择',
    'label.aiChat': '🤖 AI 对话',
    'label.codeGeneration': '💻 代码生成',
    'label.documentation': '📚 文档生成',
    'label.configPanel': '🎛️ 实时配置面板',
    'label.realtimeConfig': '⚡ 实时生效配置',
    'label.rerenderConfig': '🔄 重新渲染配置',
    'label.interval': '间隔 (ms)',
    'label.theme': '主题',
    'label.disableTyping': '禁用打字效果',
    'label.mathFormula': '数学公式',
    'label.timerType': '定时器类型',
    'label.autoStart': '自动开始',
    'label.typingStats': '📊 打字统计',
    'label.progress': '进度',
    'label.currentChar': '当前字符',
    'label.totalChars': '总字符',
    'label.avgSpeed': '平均速度',
    'label.performanceMonitor': '⚡ 性能监控',
    'label.frameCount': '帧数',
    'label.avgFrameTime': '平均帧时间',
    'label.timer': '定时器',
    'label.status': '状态',
    'label.running': '🟢 运行中',
    'label.stopped': '🔴 已停止',
    'label.callbackData': '🔄 回调数据',
    'text.rerenderDescription': '这些配置变更需要强制组件重新渲染',
  },
  en: {
    'site.title': 'react-markdown-typer',
    'site.subtitle': '🚀 Smart Markdown Typing Animation Rendering Engine',
    'nav.installation': 'Installation',
    'nav.basicUsage': 'Basic Usage',
    'nav.mathSupport': 'Math Support',
    'nav.typingAnimation': 'Typing Animation',
    'nav.themes': 'Themes',
    'nav.streaming': 'Streaming',
    'nav.api': 'API Docs',
    'section.installation': '📦 Installation',
    'section.basicUsage': '🚀 Basic Usage',
    'section.mathSupport': '🧮 Math Formula Support',
    'section.typingAnimation': '⌨️ Typing Animation Control',
    'section.themes': '🎨 Theme Switching',
    'section.streaming': '📺 Streaming Demo',
    'language.switch': 'Switch Language',
    'language.chinese': '中文',
    'language.english': 'English',
    'api.title': '📚 API Documentation',
    'api.props': 'Props Properties',
    'api.dsMarkdownMethods': 'Ref Methods - ReactMarkdownTyper',
    'api.markdownCMDMethods': 'Ref Methods - MarkdownCMD',
    'api.typeDefinitions': 'Type Definitions',
    'api.timerComparison': 'Timer Mode Comparison',
    'api.formulaDelimiters': 'Math Formula Delimiter Description',
    'api.bestPractices': 'Best Practice Recommendations',
    'demo.markdownString': 'Markdown String',
    'demo.code': 'Code',
    'demo.effect': 'Effect',
    'button.start': '▶️ Start',
    'button.restart': '🔄 Restart',
    'button.stop': '⏹️ Stop',
    'button.resume': '⏭️ Resume',
    'button.clear': '🗑️ Clear',
    'button.darkTheme': '🌙 Dark Theme',
    'button.lightTheme': '☀️ Light Theme',
    'button.enableTyping': 'Enable Typing Effect',
    'button.disableTyping': 'Disable Typing Effect',
    'button.enableMath': 'Enable Math Formula',
    'button.disableMath': 'Disable Math Formula',
    'button.switchToDark': 'Dark',
    'button.switchToLight': 'Light',
    'button.startDemo': '▶️ Start Demo',
    'button.startStreaming': '▶️ Start Streaming Demo',
    'label.current': 'Current',
    'label.lightMode': '☀️ Light Mode',
    'label.darkMode': '🌙 Dark Mode',
    'label.scenarioSelect': 'Scenario Select',
    'label.aiChat': '🤖 AI Chat',
    'label.codeGeneration': '💻 Code Generation',
    'label.documentation': '📚 Documentation',
    'label.configPanel': '🎛️ Real-time Config Panel',
    'label.realtimeConfig': '⚡ Real-time Config',
    'label.rerenderConfig': '🔄 Re-render Config',
    'label.interval': 'Interval (ms)',
    'label.theme': 'Theme',
    'label.disableTyping': 'Disable Typing Effect',
    'label.mathFormula': 'Math Formula',
    'label.timerType': 'Timer Type',
    'label.autoStart': 'Auto Start',
    'label.typingStats': '📊 Typing Statistics',
    'label.progress': 'Progress',
    'label.currentChar': 'Current Character',
    'label.totalChars': 'Total Characters',
    'label.avgSpeed': 'Average Speed',
    'label.performanceMonitor': '⚡ Performance Monitor',
    'label.frameCount': 'Frame Count',
    'label.avgFrameTime': 'Average Frame Time',
    'label.timer': 'Timer',
    'label.status': 'Status',
    'label.running': '🟢 Running',
    'label.stopped': '🔴 Stopped',
    'label.callbackData': '🔄 Callback Data',
    'text.rerenderDescription': 'These config changes require forcing component re-render',
  },
};

// localStorage 相关函数
const LANGUAGE_STORAGE_KEY = 'react-markdown-typer-language';

const getStoredLanguage = (): Language => {
  if (typeof window === 'undefined') return 'zh';

  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === 'zh' || stored === 'en') {
      return stored;
    }
  } catch (error) {
    console.warn('Error reading language from localStorage:', error);
  }

  // 默认根据浏览器语言检测
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('zh')) {
    return 'zh';
  }
  return 'en';
};

const setStoredLanguage = (language: Language): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn('Error saving language to localStorage:', error);
  }
};

const localLanguage = getStoredLanguage();
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(localLanguage);

  const setLanguage = (newLanguage: Language): void => {
    setLanguageState(newLanguage);
    setStoredLanguage(newLanguage);
  };

  const t = (key: string): string => {
    return (translations[language] as any)[key] || key;
  };

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
