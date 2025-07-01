import React from 'react';
import './App.css';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';

// 导入组件
import Header from './components/Header';
import Navigation from './components/Navigation';
import DemoSection from './components/DemoSection';
import Footer from './components/Footer';
import ApiDocumentation from './components/ApiDocumentation';

// 导入演示组件
import { BasicUsageDemo, MathSupportDemo, TypingAnimationDemo, CustomThemeDemo, StreamingDemo } from './components/Demos';

import basicUsageDemoSource from './components/Demos/BasicUsageDemo/index.tsx?raw';
import mathSupportDemoSource from './components/Demos/MathSupportDemo/index.tsx?raw';
import typingAnimationDemoSource from './components/Demos/TypingAnimationDemo/index.tsx?raw';
import customThemeDemoSource from './components/Demos/CustomThemeDemo/index.tsx?raw';
import streamingDemoSource from './components/Demos/StreamingDemo/index.tsx?raw';

// 导入中文markdown文件
import basicUsageDemoMarkdownZh from './components/Demos/BasicUsageDemo/markdown.zh.md?raw';
import mathSupportDemoMarkdownZh from './components/Demos/MathSupportDemo/markdown.zh.md?raw';
import typingAnimationDemoMarkdownZh from './components/Demos/TypingAnimationDemo/markdown.zh.md?raw';
import customThemeDemoMarkdownZh from './components/Demos/CustomThemeDemo/markdown.zh.md?raw';
import streamingDemoMarkdownZh from './components/Demos/StreamingDemo/markdown.zh.md?raw';

// 导入英文markdown文件
import basicUsageDemoMarkdownEn from './components/Demos/BasicUsageDemo/markdown.en.md?raw';
import mathSupportDemoMarkdownEn from './components/Demos/MathSupportDemo/markdown.en.md?raw';
import typingAnimationDemoMarkdownEn from './components/Demos/TypingAnimationDemo/markdown.en.md?raw';
import customThemeDemoMarkdownEn from './components/Demos/CustomThemeDemo/markdown.en.md?raw';
import streamingDemoMarkdownEn from './components/Demos/StreamingDemo/markdown.en.md?raw';

const installationSource = `// npm
npm install react-markdown-typer
// yarn
yarn add react-markdown-typer
// pnpm
pnpm add react-markdown-typer
`;

// App内部组件，用于使用useLanguage hook
const AppContent: React.FC = () => {
  const { t, language } = useLanguage();

  // 根据语言选择对应的markdown内容
  const getMarkdownContent = (zhContent: string, enContent: string) => {
    return language === 'zh' ? zhContent : enContent;
  };

  return (
    <div id="app">
      <Header />
      <Navigation />

      <main className="main">
        <div className="container">
          <DemoSection
            id="installation"
            title={t('section.installation')}
            sourceCode={{
              code: installationSource,
              markdownString: installationSource,
              lang: 'bash',
            }}
            showHeader={false}
            onlyShowCode={true}
          />

          <DemoSection
            id="basic-usage"
            title={t('section.basicUsage')}
            sourceCode={{
              code: basicUsageDemoSource,
              markdownString: getMarkdownContent(basicUsageDemoMarkdownZh, basicUsageDemoMarkdownEn),
            }}
            renderComponent={React.createElement(BasicUsageDemo, {
              markdown: getMarkdownContent(basicUsageDemoMarkdownZh, basicUsageDemoMarkdownEn),
            })}
          />

          <DemoSection
            id="math-support"
            title={t('section.mathSupport')}
            sourceCode={{
              code: mathSupportDemoSource,
              markdownString: getMarkdownContent(mathSupportDemoMarkdownZh, mathSupportDemoMarkdownEn),
            }}
            renderComponent={React.createElement(MathSupportDemo, {
              markdown: getMarkdownContent(mathSupportDemoMarkdownZh, mathSupportDemoMarkdownEn),
            })}
          />

          <DemoSection
            id="typing-animation"
            title={t('section.typingAnimation')}
            sourceCode={{
              code: typingAnimationDemoSource,
              markdownString: getMarkdownContent(typingAnimationDemoMarkdownZh, typingAnimationDemoMarkdownEn),
            }}
            renderComponent={React.createElement(TypingAnimationDemo, {
              markdown: getMarkdownContent(typingAnimationDemoMarkdownZh, typingAnimationDemoMarkdownEn),
            })}
          />

          <DemoSection
            id="themes"
            title={t('section.themes')}
            sourceCode={{
              code: customThemeDemoSource,
              markdownString: getMarkdownContent(customThemeDemoMarkdownZh, customThemeDemoMarkdownEn),
            }}
            renderComponent={React.createElement(CustomThemeDemo, {
              markdown: getMarkdownContent(customThemeDemoMarkdownZh, customThemeDemoMarkdownEn),
            })}
          />

          <DemoSection
            id="streaming"
            title={t('section.streaming')}
            sourceCode={{
              code: streamingDemoSource,
              markdownString: getMarkdownContent(streamingDemoMarkdownZh, streamingDemoMarkdownEn),
            }}
            renderComponent={React.createElement(StreamingDemo, {
              markdown: getMarkdownContent(streamingDemoMarkdownZh, streamingDemoMarkdownEn),
            })}
          />

          <ApiDocumentation />
        </div>
      </main>

      <Footer />
    </div>
  );
};

// 主App组件
const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
