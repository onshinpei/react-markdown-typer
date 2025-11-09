# react-markdown-typer

> 🚀 React Markdown 打字动画组件

**如果您需要带有样式，支持数据公式、mermaid图表渲染，推荐您用 [ds-markdown](https://github.com/onshinpei/ds-markdown)**

**🇨🇳 中文 | [🇺🇸 English](./README.md) **

一个专为现代 AI 应用设计的 React 组件，提供流畅的实时打字动画和完整的 Markdown 渲染能力。

[![npm version](https://img.shields.io/npm/v/react-markdown-typer)](https://www.npmjs.com/package/react-markdown-typer)
[![npm downloads](https://img.shields.io/npm/dm/react-markdown-typer.svg)](https://www.npmjs.com/package/react-markdown-typer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-markdown-typer)](https://bundlephobia.com/package/react-markdown-typer)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 在线演示](https://onshinpei.github.io/react-markdown-typer/)

[DEMO：🔧 StackBlitz 体验](https://stackblitz.com/edit/vitejs-vite-ndgqzcbp?file=README.md)

---

## ❓ 为什么要用 react-markdown-typer？

- **后端流式数据完美适配**  
  很多 AI/LLM 后端接口（如 OpenAI、DeepSeek 等）推送的数据 chunk 往往一次包含多个字符，普通打字机实现会出现卡顿、跳字等问题。  
  **react-markdown-typer 会自动将每个 chunk 拆分为单个字符，逐字流畅渲染动画，无论后端一次推送多少字，都能保证每个字都流畅打字。**

- **极致开发体验**  
  丰富的命令式 API，支持流式数据、异步回调、插件扩展，开发者可灵活控制动画和内容。

- **轻量高性能**  
  体积小、性能优，适配移动端和桌面端。核心依赖 [react-markdown](https://github.com/remarkjs/react-markdown)（业界主流、成熟的 Markdown 渲染库），无其它重量级依赖，开箱即用。

- **多主题与插件化架构**  
  兼容 [react-markdown](https://github.com/remarkjs/react-markdown) remark/rehype 插件，满足个性化和高级扩展需求。

- **适用场景广泛**
  - AI 聊天机器人/助手
  - 实时问答/知识库
  - 教育/数学/编程内容展示
  - 产品演示、交互式文档
  - 任何需要"打字机"动画和流式 Markdown 渲染的场景

---

## 📋 目录

- [✨ 核心特性](#-核心特性)
- [📦 快速安装](#-快速安装)
- [🚀 5分钟上手](#-5分钟上手)
  - [基础用法](#基础用法)
  - [禁用打字动画](#禁用打字动画)
  - [数学公式支持](#数学公式支持)
  - [AI 对话场景](#ai-对话场景)
  - [🎯 高级回调控制](#-高级回调控制)
  - [🔄 重新开始动画演示](#-重新开始动画演示)
  - [▶️ 手动开始动画演示](#️-手动开始动画演示)
- [📚 完整 API 文档](#-完整-api-文档)
- [🧮 数学公式使用指南](#-数学公式使用指南)
- [🔌 插件系统](#-插件系统)
- [🎛️ 定时器模式详解](#️-定时器模式详解)
- [💡 实战示例](#-实战示例)

---

## ✨ 核心特性

### 🤖 **AI 对话场景**

- 1:1 复刻 [DeepSeek 官网](https://chat.deepseek.com/) 聊天响应效果
- 支持思考过程 (`thinking`) 和回答内容 (`answer`) 双模式
- 流式数据完美适配，零延迟响应用户输入

### 📊 **内容展示场景**

- 完整 Markdown 语法支持，包括代码高亮、表格、列表等
- 数学公式渲染 (KaTeX)，支持 `$...$` 和 `\[...\]` 语法
- 支持亮色/暗色主题，适配不同产品风格
- 插件化架构，支持 remark/rehype 插件扩展

### 🔧 **开发体验**

- 支持打字中断 `stop` 和继续 `resume`
- 支持打字关闭与开启

### 🎬 **流畅动画**

- 双模式定时器优化，支持`requestAnimationFrame`和`setTimeout`模式
- 高频打字支持（`requestAnimationFrame`模式下打字间隔最低可接近于`0ms`）
- 帧同步渲染，与浏览器刷新完美配合
- 智能字符批量处理，视觉效果更自然

---

## 📦 快速安装

```bash
# npm
npm install react-markdown-typer

# yarn
yarn add react-markdown-typer

# pnpm
pnpm add react-markdown-typer
```

### 通过 ESM CDN 使用

无需安装，直接在浏览器中使用：

<!-- [DEMO](https://stackblitz.com/edit/stackblitz-starters-7vcclcw7?file=index.html) -->

```html
<!-- 导入组件 -->
<script type="module">
  import Markdown from 'https://esm.sh/react-markdown-typer';
</script>
```

## 🚀 5分钟上手

### 基础用法

[DEMO](https://stackblitz.com/edit/vitejs-vite-ndgqzcbp?file=src%2FApp.tsx)

```tsx
import MarkdownTyper from 'react-markdown-typer';

function App() {
  return <MarkdownTyper interval={20}># Hello react-markdown-typer 这是一个**高性能**的打字动画组件！ ## 特性 - ⚡ 零延迟流式处理 - 🎬 流畅打字动画 - 🎯 完美语法支持</MarkdownTyper>;
}
```

### 禁用打字动画

```tsx
import MarkdownTyper from 'react-markdown-typer';

function StaticDemo() {
  const [disableTyping, setDisableTyping] = useState(false);

  return (
    <div>
      <button onClick={() => setDisableTyping(!disableTyping)}>{disableTyping ? '开启' : '关闭'}打字机效果</button>

      <MarkdownTyper interval={20} disableTyping={disableTyping}>
        # 静态展示模式 当 `disableTyping` 为 `true` 时，内容会立即全部显示，无打字动画效果。 这在某些场景下非常有用： - 📄 静态文档展示 - 🔄 切换显示模式 - ⚡ 快速预览内容
      </MarkdownTyper>
    </div>
  );
}
```

### 自定义 Markdown 处理

```tsx
import MarkdownTyper from 'react-markdown-typer';

function CustomMarkdownDemo() {
  const customConvertMarkdownString = (markdownString) => {
    // 自定义处理逻辑
    return markdownString
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>') // 转换链接
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // 转换粗体
      .replace(/\*([^*]+)\*/g, '<em>$1</em>'); // 转换斜体
  };

  return (
    <MarkdownTyper interval={20} customConvertMarkdownString={customConvertMarkdownString}>
      # 自定义 Markdown 处理 这是**粗体文字**和*斜体文字*。查看[我们的网站](https://example.com)了解更多信息！
    </MarkdownTyper>
  );
}
```

### AI 对话场景

```tsx
function ChatDemo() {
  const [answer, setAnswer] = useState('');

  const handleAsk = () => {
    setAnswer(`# 关于 React 19

React 19 带来了许多激动人心的新特性：

## 🚀 主要更新
1. **React Compiler** - 自动优化性能
2. **Actions** - 简化表单处理
3. **Document Metadata** - 内置 SEO 支持

让我们一起探索这些新功能！`);
  };

  return (
    <div>
      <button onClick={handleAsk}>询问 AI</button>

      {answer && <MarkdownTyper interval={15}>{answer}</MarkdownTyper>}
    </div>
  );
}
```

### 🎯 高级回调控制

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownTyperCMDRef } from 'react-markdown-typer';

function AdvancedCallbackDemo() {
  const markdownRef = useRef<MarkdownTyperCMDRef>(null);
  const [typingStats, setTypingStats] = useState({ progress: 0, currentChar: '', totalChars: 0 });

  const handleBeforeTypedChar = async (data) => {
    // 在字符打字前进行异步操作
    console.log('即将打字:', data.currentChar);

    // 可以在这里进行网络请求、数据验证等异步操作
    if (data.currentChar === '!') {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 模拟延迟
    }
  };

  const handleTypedChar = (data) => {
    // 更新打字统计信息
    setTypingStats({
      progress: Math.round(data.percent),
      currentChar: data.currentChar,
      totalChars: data.currentIndex + 1,
    });

    // 可以在这里添加音效、动画等效果
    if (data.currentChar === '.') {
      // 播放句号音效
      console.log('播放句号音效');
    }
  };

  const handleStart = (data) => {
    console.log('开始打字:', data.currentChar);
  };

  const handleEnd = (data) => {
    console.log('打字完成:', data.str);
  };

  const startDemo = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# 高级回调演示\n\n' +
        '这个示例展示了如何使用 `onBeforeTypedChar` 和 `onTypedChar` 回调：\n\n' +
        '- 🎯 **打字前回调**：可以在字符显示前进行异步操作\n' +
        '- 📊 **打字后回调**：可以实时更新进度和添加特效\n' +
        '- ⚡ **性能优化**：支持异步操作，不影响打字流畅度\n\n' +
        '当前进度：' +
        typingStats.progress +
        '%\n' +
        '已打字数：' +
        typingStats.totalChars +
        '\n\n' +
        '这是一个非常强大的功能！',
      'answer',
    );
  };

  return (
    <div>
      <button onClick={startDemo}>🚀 开始高级演示</button>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>打字统计：</strong> 进度 {typingStats.progress}% | 当前字符: "{typingStats.currentChar}" | 总字符数: {typingStats.totalChars}
      </div>

      <MarkdownCMD ref={markdownRef} interval={30} onBeforeTypedChar={handleBeforeTypedChar} onTypedChar={handleTypedChar} onStart={handleStart} onEnd={handleEnd} />
    </div>
  );
}
```

### 🔄 重新开始动画演示

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownTyperCMDRef } from 'react-markdown-typer';

function RestartDemo() {
  const markdownRef = useRef<MarkdownTyperCMDRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startContent = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# 重新开始动画演示\n\n' +
        '这个示例展示了如何使用 `restart()` 方法：\n\n' +
        '- 🔄 **重新开始**：从头开始播放当前内容\n' +
        '- ⏸️ **暂停恢复**：可以随时暂停和恢复\n' +
        '- 🎯 **精确控制**：完全控制动画播放状态\n\n' +
        '当前状态：' +
        (isPlaying ? '播放中' : '已暂停') +
        '\n\n' +
        '这是一个非常实用的功能！',
      'answer',
    );
    setIsPlaying(true);
  };

  const handleStart = () => {
    if (hasStarted) {
      // 如果已经开始过，则重新开始
      markdownRef.current?.restart();
    } else {
      // 第一次开始
      markdownRef.current?.start();
      setHasStarted(true);
    }
    setIsPlaying(true);
  };

  const handleStop = () => {
    markdownRef.current?.stop();
    setIsPlaying(false);
  };

  const handleResume = () => {
    markdownRef.current?.resume();
    setIsPlaying(true);
  };

  const handleRestart = () => {
    markdownRef.current?.restart();
    setIsPlaying(true);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={startContent}>🚀 开始内容</button>
        <button onClick={handleStart} disabled={isPlaying}>
          {hasStarted ? '🔄 重新开始' : '▶️ 开始'}
        </button>
        <button onClick={handleStop} disabled={!isPlaying}>
          ⏸️ 暂停
        </button>
        <button onClick={handleResume} disabled={isPlaying}>
          ▶️ 恢复
        </button>
        <button onClick={handleRestart}>🔄 重新开始</button>
      </div>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>动画状态：</strong> {isPlaying ? '🟢 播放中' : '🔴 已暂停'}
      </div>

      <MarkdownCMD ref={markdownRef} interval={25} onEnd={handleEnd} />
    </div>
  );
}
```

### ▶️ 手动开始动画演示

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownTyperCMDRef } from 'react-markdown-typer';

function StartDemo() {
  const markdownRef = useRef<MarkdownTyperCMDRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const loadContent = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# 手动开始动画演示\n\n' +
        '这个示例展示了如何使用 `start()` 方法：\n\n' +
        '- 🎯 **手动控制**：当 `autoStartTyping=false` 时，需要手动调用 `start()`\n' +
        '- ⏱️ **延迟开始**：可以在用户交互后开始动画\n' +
        '- 🎮 **游戏化**：适合需要用户主动触发的场景\n\n' +
        '点击"开始动画"按钮来手动启动打字效果！',
      'answer',
    );
    setIsPlaying(false);
  };

  const handleStart = () => {
    if (hasStarted) {
      // 如果已经开始过，则重新开始
      markdownRef.current?.restart();
    } else {
      // 第一次开始
      markdownRef.current?.start();
      setHasStarted(true);
    }
    setIsPlaying(true);
  };

  const handleEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <div style={{ marginBottom: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button onClick={loadContent}>📝 加载内容</button>
        <button onClick={handleStart} disabled={isPlaying}>
          {hasStarted ? '🔄 重新开始' : '▶️ 开始动画'}
        </button>
      </div>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>状态：</strong> {isPlaying ? '🟢 动画播放中' : '🔴 等待开始'}
      </div>

      <MarkdownCMD ref={markdownRef} interval={30} autoStartTyping={false} onEnd={handleEnd} />
    </div>
  );
}
```

---

## 📚 完整 API 文档

### 默认导出 MarkdownTyper 和 MarkdownCMD 的 props

```js
import MarkdownTyper, { MarkdownCMD } from 'react-markdown-typer';
```

| 属性                          | 类型                                        | 说明                                                          | 默认值                                                      |
| ----------------------------- | ------------------------------------------- | ------------------------------------------------------------- | ----------------------------------------------------------- |
| `interval`                    | `number`                                    | 打字间隔 (毫秒)                                               | `30`                                                        |
| `timerType`                   | `'setTimeout'` \| `'requestAnimationFrame'` | 定时器类型，不支持动态修改                                    | 当前默认值是`setTimeout`，后期会改为`requestAnimationFrame` |
| `theme`                       | `'light'` \| `'dark'`                       | 主题类型                                                      | `'light'`                                                   |
| `customConvertMarkdownString` | `(markdownString: string) => string`        | 自定义 markdown 字符串转换函数                                | -                                                           |
| `onEnd`                       | `(data: EndData) => void`                   | 打字结束回调                                                  | -                                                           |
| `onStart`                     | `(data: StartData) => void`                 | 打字开始回调                                                  | -                                                           |
| `onBeforeTypedChar`           | `(data: IBeforeTypedChar) => Promise<void>` | 字符打字前的回调，支持异步操作，会阻塞之后的打字              | -                                                           |
| `onTypedChar`                 | `(data: ITypedChar) => void`                | 每字符打字后的回调                                            | -                                                           |
| `disableTyping`               | `boolean`                                   | 禁用打字动画效果                                              | `false`                                                     |
| `autoStartTyping`             | `boolean`                                   | 是否自动开始打字动画，设为 false 时需手动触发，不支持动态修改 | `true`                                                      |

> 注意： 如果当在打字中 `disableTyping`从 `true` 变为 `false`，则在下一个打字触发时，会把剩下的所有字一次性显示

### IBeforeTypedChar

| 属性           | 类型     | 说明                         | 默认值 |
| -------------- | -------- | ---------------------------- | ------ |
| `currentIndex` | `number` | 当前字符在整个字符串中的索引 | `0`    |
| `currentChar`  | `string` | 当前即将打字的字符           | -      |
| `prevStr`      | `string` | 当前类型内容的前缀字符串     | -      |
| `percent`      | `number` | 打字进度百分比 (0-100)       | `0`    |

### ITypedChar

| 属性           | 类型     | 说明                         | 默认值 |
| -------------- | -------- | ---------------------------- | ------ |
| `currentIndex` | `number` | 当前字符在整个字符串中的索引 | `0`    |
| `currentChar`  | `string` | 当前已打字的字符             | -      |
| `prevStr`      | `string` | 当前类型内容的前缀字符串     | -      |
| `currentStr`   | `string` | 当前类型内容的完整字符串     | -      |
| `percent`      | `number` | 打字进度百分比 (0-100)       | `0`    |

#### 自定义 Markdown 转换

`customConvertMarkdownString` 函数允许您在渲染前预处理 markdown 内容。这适用于：

- 自定义 markdown 语法扩展
- 内容过滤或清理
- 与外部 markdown 处理器集成
- 自定义链接处理或格式化

**示例：**

```tsx
const customConvertMarkdownString = (markdownString) => {
  // 在这里添加自定义处理逻辑
  return markdownString.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
};
```

#### IMarkdownPlugin

可以通过 `reactMarkdownProps` 传入 react-markdown 所有的属性来支持

### 组件暴露的方法

#### 默认导出 MarkdownTyper

| 方法      | 参数 | 说明                                   |
| --------- | ---- | -------------------------------------- |
| `start`   | -    | 开始打字动画                           |
| `stop`    | -    | 暂停打字动画                           |
| `resume`  | -    | 恢复打字动画                           |
| `restart` | -    | 重新开始打字动画，从头开始播放当前内容 |

#### MarkdownCMD 暴露的方法

| 方法              | 参数                                        | 说明                                   |
| ----------------- | ------------------------------------------- | -------------------------------------- |
| `push`            | `(content: string, answerType: AnswerType)` | 添加内容并开始打字                     |
| `clear`           | -                                           | 清空所有内容和状态                     |
| `triggerWholeEnd` | -                                           | 手动触发完成回调                       |
| `start`           | -                                           | 开始打字动画                           |
| `stop`            | -                                           | 暂停打字动画                           |
| `resume`          | -                                           | 恢复打字动画                           |
| `restart`         | -                                           | 重新开始打字动画，从头开始播放当前内容 |

**用法示例：**

```tsx
markdownRef.current?.start(); // 开始动画
markdownRef.current?.stop(); // 暂停动画
markdownRef.current?.resume(); // 恢复动画
markdownRef.current?.restart(); // 重新开始动画
```

---

## 🔧 自定义 Markdown 处理指南

### 基本用法

```tsx
import MarkdownTyper from 'react-markdown-typer';

function CustomMarkdownDemo() {
  const customConvertMarkdownString = (markdownString) => {
    // 在这里添加您的自定义处理逻辑
    return markdownString
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  };

  return (
    <MarkdownTyper interval={20} customConvertMarkdownString={customConvertMarkdownString}>
      # 自定义 Markdown 处理 这是**粗体文字**和*斜体文字*。查看[我们的网站](https://example.com)了解更多信息！
    </MarkdownTyper>
  );
}
```

### 高级处理

````tsx
// 复杂的自定义处理示例
const customConvertMarkdownString = (markdownString) => {
  return (
    markdownString
      // 自定义表情符号处理
      .replace(/:([a-zA-Z0-9_]+):/g, '<span class="emoji">:$1:</span>')
      // 自定义提及处理
      .replace(/@([a-zA-Z0-9_]+)/g, '<span class="mention">@$1</span>')
      // 自定义代码块处理
      .replace(/```(\w+)\n([\s\S]*?)```/g, '<pre class="code-block"><code class="language-$1">$2</code></pre>')
      // 自定义链接处理（带安全性）
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        if (url.startsWith('http')) {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        }
        return match;
      })
  );
};
````

### 与外部处理器集成

```tsx
import { marked } from 'marked';

const customConvertMarkdownString = (markdownString) => {
  // 使用 marked.js 进行处理
  return marked(markdownString, {
    breaks: true,
    gfm: true,
  });
};
```

### 内容过滤

```tsx
const customConvertMarkdownString = (markdownString) => {
  // 过滤敏感内容
  const filteredContent = markdownString.replace(/password[:\s]*[^\s]+/gi, 'password: [已过滤]').replace(/token[:\s]*[^\s]+/gi, 'token: [已过滤]');

  return filteredContent;
};
```

---

## 🔌 插件系统

可查看 [react-markdown](https://github.com/remarkjs/react-markdown)

---

## 🎛️ 定时器模式详解

### `requestAnimationFrame` 模式 🌟 (推荐)

```typescript
// 🎯 特性
- 时间驱动：基于真实经过时间计算字符数量
- 批量处理：单帧内可处理多个字符
- 帧同步：与浏览器 60fps 刷新率同步
- 高频优化：完美支持 interval < 16ms 的高速打字

// 🎯 适用场景
- 现代 Web 应用的默认选择
- 追求流畅动画效果
- 高频打字 (interval > 0 即可)
- AI 实时对话场景
```

### `setTimeout` 模式 📟 (兼容)

```typescript
// 🎯 特性
- 单字符：每次精确处理一个字符
- 固定间隔：严格按设定时间执行
- 节拍感：经典打字机的节奏感
- 精确控制：适合特定时序要求

// 🎯 适用场景
- 需要精确时间控制
- 营造复古打字机效果
- 兼容性要求较高的场景
```

### 📊 性能对比

| 特性         | requestAnimationFrame        | setTimeout       |
| ------------ | ---------------------------- | ---------------- |
| **字符处理** | 每帧可处理多个字符           | 每次处理一个字符 |
| **高频间隔** | ✅ 优秀 (5ms → 每帧3字符)    | ❌ 可能卡顿      |
| **低频间隔** | ✅ 正常 (100ms → 6帧后1字符) | ✅ 精确          |
| **视觉效果** | 🎬 流畅动画感                | ⚡ 精确节拍感    |
| **性能开销** | 🟢 低 (帧同步)               | 🟡 中等 (定时器) |

高频推荐`requestAnimationFrame`,低频推荐 `setTimeout`

---

## 💡 实战示例

### 📝 AI 流式对话

<!-- [DEMO: 🔧 StackBlitz 体验](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx) -->

````tsx
import { useRef } from 'react';
import { MarkdownCMD, MarkdownTyperCMDRef } from 'react-markdown-typer';

function StreamingChat() {
  const markdownRef = useRef<MarkdownTyperCMDRef>(null);

  // 模拟 AI 流式响应
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // 思考阶段
    markdownRef.current?.push('🤔 正在分析您的问题...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ 分析完成，开始回答', 'thinking');

    // 流式回答
    const chunks = [
      '# React 19 新特性解析\n\n',
      '## 🚀 React Compiler\n',
      'React 19 最大的亮点是引入了 **React Compiler**：\n\n',
      '- 🎯 **自动优化**：无需手动 memo 和 useMemo\n',
      '- ⚡ **性能提升**：编译时优化，运行时零开销\n',
      '- 🔧 **向后兼容**：现有代码无需修改\n\n',
      '## 📝 Actions 简化表单\n',
      '新的 Actions API 让表单处理变得更简单：\n\n',
      '```tsx\n',
      'function ContactForm({ action }) {\n',
      '  const [state, formAction] = useActionState(action, null);\n',
      '  return (\n',
      '    <form action={formAction}>\n',
      '      <input name="email" type="email" />\n',
      '      <button>提交</button>\n',
      '    </form>\n',
      '  );\n',
      '}\n',
      '```\n\n',
      '希望这个解答对您有帮助！🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div className="chat-container">
      <button onClick={simulateAIResponse}>🤖 询问 React 19 新特性</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('段落完成:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🔧 自定义 Markdown 处理演示

```tsx
function CustomMarkdownStreamingDemo() {
  const markdownRef = useRef<MarkdownTyperCMDRef>(null);

  const customConvertMarkdownString = (markdownString) => {
    return markdownString
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code>$1</code>');
  };

  const simulateCustomResponse = async () => {
    markdownRef.current?.clear();

    const customChunks = [
      '# 自定义 Markdown 处理\n\n',
      '这个演示展示了如何在流式内容中使用**自定义 markdown 处理**：\n\n',
      '## 功能特性\n',
      '- *自定义链接处理*\n',
      '- **粗体和斜体**文字处理\n',
      '- `行内代码`格式化\n',
      '- [外部链接](https://example.com) 带安全属性\n\n',
      '`customConvertMarkdownString` 函数允许您在渲染前预处理内容！',
    ];

    for (const chunk of customChunks) {
      await delay(150);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={simulateCustomResponse}>🔧 自定义 Markdown 演示</button>

      <MarkdownCMD ref={markdownRef} interval={20} timerType="requestAnimationFrame" customConvertMarkdownString={customConvertMarkdownString} />
    </div>
  );
}
```

### 🎯 高级回调控制

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownTyperCMDRef } from 'react-markdown-typer';

function AdvancedCallbackDemo() {
  const markdownRef = useRef<MarkdownTyperCMDRef>(null);
  const [typingStats, setTypingStats] = useState({ progress: 0, currentChar: '', totalChars: 0 });

  const handleBeforeTypedChar = async (data) => {
    // 在字符打字前进行异步操作
    console.log('即将打字:', data.currentChar);

    // 可以在这里进行网络请求、数据验证等异步操作
    if (data.currentChar === '!') {
      await new Promise((resolve) => setTimeout(resolve, 500)); // 模拟延迟
    }
  };

  const handleTypedChar = (data) => {
    // 更新打字统计信息
    setTypingStats({
      progress: Math.round(data.percent),
      currentChar: data.currentChar,
      totalChars: data.currentIndex + 1,
    });

    // 可以在这里添加音效、动画等效果
    if (data.currentChar === '.') {
      // 播放句号音效
      console.log('播放句号音效');
    }
  };

  const handleStart = (data) => {
    console.log('开始打字:', data.currentChar);
  };

  const handleEnd = (data) => {
    console.log('打字完成:', data.str);
  };

  const startDemo = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# 高级回调演示\n\n' +
        '这个示例展示了如何使用 `onBeforeTypedChar` 和 `onTypedChar` 回调：\n\n' +
        '- 🎯 **打字前回调**：可以在字符显示前进行异步操作\n' +
        '- 📊 **打字后回调**：可以实时更新进度和添加特效\n' +
        '- ⚡ **性能优化**：支持异步操作，不影响打字流畅度\n\n' +
        '当前进度：' +
        typingStats.progress +
        '%\n' +
        '已打字数：' +
        typingStats.totalChars +
        '\n\n' +
        '这是一个非常强大的功能！',
      'answer',
    );
  };

  return (
    <div>
      <button onClick={startDemo}>🚀 开始高级演示</button>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>打字统计：</strong> 进度 {typingStats.progress}% | 当前字符: "{typingStats.currentChar}" | 总字符数: {typingStats.totalChars}
      </div>

      <MarkdownCMD ref={markdownRef} interval={30} onBeforeTypedChar={handleBeforeTypedChar} onTypedChar={handleTypedChar} onStart={handleStart} onEnd={handleEnd} />
    </div>
  );
}
```
