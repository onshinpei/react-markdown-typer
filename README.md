# react-markdown-typer

> 🚀 React Markdown typing animation component

**if you need styling, support for mathematical formulas, and mermaid chart rendering, we recommend using [ds-markdown](https://github.com/onshinpei/ds-markdown)**

**[🇨🇳 中文](./README.zh.md) | 🇺🇸 English**

A React component designed for modern AI applications, providing smooth real-time typing animation and full Markdown rendering capabilities.

[![npm version](https://img.shields.io/npm/v/react-markdown-typer)](https://www.npmjs.com/package/react-markdown-typer)
[![npm downloads](https://img.shields.io/npm/dm/react-markdown-typer.svg)](https://www.npmjs.com/package/react-markdown-typer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-markdown-typer)](https://bundlephobia.com/package/react-markdown-typer)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 Online Demo](https://onshinpei.github.io/react-markdown-typer/)

[DEMO: 🔧 Try on StackBlitz](https://stackblitz.com/edit/vitejs-vite-zbrdonvx?file=src%2FApp.tsx)

---

## ❓ Why use react-markdown-typer?

- **Perfect for backend streaming data**  
  Many AI/LLM backend APIs (like OpenAI, DeepSeek, etc.) push data chunks containing multiple characters at once. Ordinary typewriter implementations may stutter or skip characters.  
  **react-markdown-typer automatically splits each chunk into single characters and renders them smoothly one by one, ensuring a fluid typing animation no matter how many characters are pushed at once.**

- **Ultimate developer experience**  
  Rich imperative API, supports streaming data, async callbacks, plugin extensions, and flexible animation/content control.

- **Lightweight & high performance**  
  Small bundle size, high performance, works on both mobile and desktop. Core dependency is [react-markdown](https://github.com/remarkjs/react-markdown) (industry-standard, mature Markdown renderer), no heavy dependencies, ready to use out of the box.

- **Multi-theme & plugin architecture**  
  compatible with [react-markdown](https://github.com/remarkjs/react-markdown) remark/rehype plugins for advanced customization and extension.

- **Wide range of use cases**
  - AI chatbots/assistants
  - Real-time Q&A/knowledge base
  - Educational/math/programming content
  - Product demos, interactive docs
  - Any scenario needing "typewriter" animation and streaming Markdown rendering

---

## 📋 Table of Contents

- [react-markdown-typer](#react-markdown-typer)
  - [❓ Why use react-markdown-typer?](#-why-use-react-markdown-typer)
  - [📋 Table of Contents](#-table-of-contents)
  - [✨ Core Features](#-core-features)
    - [🤖 **AI Chat Scenario**](#-ai-chat-scenario)
    - [📊 **Content Display Scenario**](#-content-display-scenario)
    - [🔧 **Developer Experience**](#-developer-experience)
    - [🎬 **Smooth Animation**](#-smooth-animation)
  - [📦 Quick Installation](#-quick-installation)
    - [Use via ESM CDN](#use-via-esm-cdn)
  - [🚀 5-Minute Quick Start](#-5-minute-quick-start)
    - [Basic Usage](#basic-usage)
    - [Disable Typing Animation](#disable-typing-animation)
    - [Custom Markdown Processing](#custom-markdown-processing)
    - [AI Chat Scenario](#ai-chat-scenario)
    - [🎯 Advanced Callback Control](#-advanced-callback-control)
    - [🔄 Restart Animation Demo](#-restart-animation-demo)
    - [▶️ Manual Start Animation Demo](#️-manual-start-animation-demo)
  - [📚 Full API Documentation](#-full-api-documentation)
    - [Default Exported Props for MarkdownTyper and MarkdownCMD](#default-exported-props-for-markdowntyper-and-markdowncmd)
    - [IBeforeTypedChar](#ibeforetypedchar)
    - [ITypedChar](#itypedchar)
      - [Custom Markdown Conversion](#custom-markdown-conversion)
      - [IMarkdownPlugin](#imarkdownplugin)
    - [Exposed Methods](#exposed-methods)
      - [Default Export MarkdownTyper](#default-export-markdowntyper)
      - [MarkdownCMD Exposed Methods](#markdowncmd-exposed-methods)
  - [🔧 Custom Markdown Processing Guide](#-custom-markdown-processing-guide)
    - [Basic Usage](#basic-usage-1)
    - [Advanced Processing](#advanced-processing)
    - [Integration with External Processors](#integration-with-external-processors)
    - [Content Filtering](#content-filtering)
  - [🔌 Plugin System](#-plugin-system)
  - [🎛️ Timer Modes Explained](#️-timer-modes-explained)
    - [`requestAnimationFrame` Mode 🌟 (Recommended)](#requestanimationframe-mode--recommended)
    - [`setTimeout` Mode 📟 (Compatible)](#settimeout-mode--compatible)
    - [📊 Performance Comparison](#-performance-comparison)
  - [💡 Practical Examples](#-practical-examples)
    - [📝 AI Streaming Chat](#-ai-streaming-chat)
    - [🔧 Custom Markdown Processing Demo](#-custom-markdown-processing-demo)
    - [🎯 Advanced Callback Control](#-advanced-callback-control-1)

---

## ✨ Core Features

### 🤖 **AI Chat Scenario**

- 1:1 replica of [DeepSeek official site](https://chat.deepseek.com/) chat response effect
- Supports both `thinking` and `answer` modes
- Perfectly fits streaming data, zero-latency user response

### 📊 **Content Display Scenario**

- Full Markdown support, including code highlighting, tables, lists, etc.
- Math formula rendering (KaTeX), supports `$...$` and `\[...\]` syntax
- Light/dark theme support for different product styles
- Plugin architecture, supports remark/rehype plugin extensions

### 🔧 **Developer Experience**

- Supports typing interruption with `stop` and resume with `resume`
- Typing animation can be enabled/disabled

### 🎬 **Smooth Animation**

- Dual timer optimization: supports both `requestAnimationFrame` and `setTimeout` modes
- High-frequency typing supported (with `requestAnimationFrame`, interval can be nearly `0ms`)
- Frame-synced rendering, perfectly matches browser refresh
- Smart batch character handling for more natural visuals

---

## 📦 Quick Installation

```bash
# npm
npm install react-markdown-typer

# yarn
yarn add react-markdown-typer

# pnpm
pnpm add react-markdown-typer
```

### Use via ESM CDN

No installation needed, use directly in the browser:

<!-- [DEMO](https://stackblitz.com/edit/vitejs-vite-zbrdonvx?file=src%2FApp.tsx) -->

```html
<!-- Import the component -->
<script type="module">
  import Markdown from 'https://esm.sh/react-markdown-typer';
</script>
```

## 🚀 5-Minute Quick Start

### Basic Usage

[DEMO](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx)

```tsx
import MarkdownTyper from 'react-markdown-typer';
import 'react-markdown-typer/style.css';

function App() {
  return (
    <MarkdownTyper interval={20}>
      # Hello react-markdown-typer This is a **high-performance** typing animation component! ## Features - ⚡ Zero-latency streaming - 🎬 Smooth typing animation - 🎯 Perfect syntax support
    </MarkdownTyper>
  );
}
```

### Disable Typing Animation

```tsx
import MarkdownTyper from 'react-markdown-typer';
import 'react-markdown-typer/style.css';

function StaticDemo() {
  const [disableTyping, setDisableTyping] = useState(false);

  return (
    <div>
      <button onClick={() => setDisableTyping(!disableTyping)}>{disableTyping ? 'Enable' : 'Disable'} typewriter effect</button>

      <MarkdownTyper interval={20} disableTyping={disableTyping}>
        # Static Display Mode When `disableTyping` is `true`, all content is shown instantly with no typing animation. This is useful for: - 📄 Static document display - 🔄 Switching display modes -
        ⚡ Quick content preview
      </MarkdownTyper>
    </div>
  );
}
```

### Custom Markdown Processing

```tsx
import MarkdownTyper from 'react-markdown-typer';

function CustomMarkdownDemo() {
  const customConvertMarkdownString = (markdownString) => {
    // Custom processing logic
    return markdownString
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>') // Convert links
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // Convert bold
      .replace(/\*([^*]+)\*/g, '<em>$1</em>'); // Convert italic
  };

  return (
    <MarkdownTyper interval={20} customConvertMarkdownString={customConvertMarkdownString}>
      # Custom Markdown Processing This is **bold text** and *italic text*. Check out [our website](https://example.com) for more info!
    </MarkdownTyper>
  );
}
```

### AI Chat Scenario

```tsx
function ChatDemo() {
  const [answer, setAnswer] = useState('');

  const handleAsk = () => {
    setAnswer(`# About React 19

React 19 brings many exciting new features:

## 🚀 Major Updates
1. **React Compiler** - Automatic performance optimization
2. **Actions** - Simplified form handling
3. **Document Metadata** - Built-in SEO support

Let's explore these new features together!`);
  };

  return (
    <div>
      <button onClick={handleAsk}>Ask AI</button>

      {answer && <MarkdownTyper interval={15}>{answer}</MarkdownTyper>}
    </div>
  );
}
```

### 🎯 Advanced Callback Control

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'react-markdown-typer';

function AdvancedCallbackDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [typingStats, setTypingStats] = useState({ progress: 0, currentChar: '', totalChars: 0 });

  const handleBeforeTypedChar = async (data) => {
    // Async operation before typing a character
    console.log('About to type:', data.currentChar);

    // You can do network requests, data validation, etc. here
    if (data.currentChar === '!') {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    }
  };

  const handleTypedChar = (data) => {
    // Update typing stats
    setTypingStats({
      progress: Math.round(data.percent),
      currentChar: data.currentChar,
      totalChars: data.currentIndex + 1,
    });

    // Add sound effects, animations, etc. here
    if (data.currentChar === '.') {
      // Play period sound effect
      console.log('Play period sound');
    }
  };

  const handleStart = (data) => {
    console.log('Typing started:', data.currentChar);
  };

  const handleEnd = (data) => {
    console.log('Typing finished:', data.str);
  };

  const startDemo = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Advanced Callback Demo\n\n' +
        'This example shows how to use `onBeforeTypedChar` and `onTypedChar` callbacks:\n\n' +
        '- 🎯 **Before typing callback**: Async operations before displaying a character\n' +
        '- 📊 **After typing callback**: Real-time progress updates and effects\n' +
        '- ⚡ **Performance**: Async operations without affecting typing smoothness\n\n' +
        'Current progress: ' +
        typingStats.progress +
        '%\n' +
        'Characters typed: ' +
        typingStats.totalChars +
        '\n\n' +
        'This is a very powerful feature!',
      'answer',
    );
  };

  return (
    <div>
      <button onClick={startDemo}>🚀 Start Advanced Demo</button>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Typing Stats:</strong> Progress {typingStats.progress}% | Current char: "{typingStats.currentChar}" | Total chars: {typingStats.totalChars}
      </div>

      <MarkdownCMD ref={markdownRef} interval={30} onBeforeTypedChar={handleBeforeTypedChar} onTypedChar={handleTypedChar} onStart={handleStart} onEnd={handleEnd} />
    </div>
  );
}
```

### 🔄 Restart Animation Demo

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'react-markdown-typer';

function RestartDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const startContent = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Restart Animation Demo\n\n' +
        'This example shows how to use the `restart()` method:\n\n' +
        '- 🔄 **Restart**: Play current content from the beginning\n' +
        '- ⏸️ **Pause/Resume**: Pause and resume anytime\n' +
        '- 🎯 **Precise control**: Full control over animation state\n\n' +
        'Current state: ' +
        (isPlaying ? 'Playing' : 'Paused') +
        '\n\n' +
        'This is a very practical feature!',
      'answer',
    );
    setIsPlaying(true);
  };

  const handleStart = () => {
    if (hasStarted) {
      // If already started, restart
      markdownRef.current?.restart();
    } else {
      // First start
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
        <button onClick={startContent}>🚀 Start Content</button>
        <button onClick={handleStart} disabled={isPlaying}>
          {hasStarted ? '🔄 Restart' : '▶️ Start'}
        </button>
        <button onClick={handleStop} disabled={!isPlaying}>
          ⏸️ Pause
        </button>
        <button onClick={handleResume} disabled={isPlaying}>
          ▶️ Resume
        </button>
        <button onClick={handleRestart}>🔄 Restart</button>
      </div>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Animation State:</strong> {isPlaying ? '🟢 Playing' : '🔴 Paused'}
      </div>

      <MarkdownCMD ref={markdownRef} interval={25} onEnd={handleEnd} />
    </div>
  );
}
```

### ▶️ Manual Start Animation Demo

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'react-markdown-typer';

function StartDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const loadContent = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Manual Start Animation Demo\n\n' +
        'This example shows how to use the `start()` method:\n\n' +
        '- 🎯 **Manual control**: When `autoStartTyping=false`, you need to call `start()` manually\n' +
        '- ⏱️ **Delayed start**: Start animation after user interaction\n' +
        '- 🎮 **Gamification**: Suitable for scenarios requiring user trigger\n\n' +
        'Click the "Start Animation" button to manually trigger typing!',
      'answer',
    );
    setIsPlaying(false);
  };

  const handleStart = () => {
    if (hasStarted) {
      // If already started, restart
      markdownRef.current?.restart();
    } else {
      // First start
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
        <button onClick={loadContent}>📝 Load Content</button>
        <button onClick={handleStart} disabled={isPlaying}>
          {hasStarted ? '🔄 Restart' : '▶️ Start Animation'}
        </button>
      </div>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Status:</strong> {isPlaying ? '🟢 Animation Playing' : '🔴 Waiting to Start'}
      </div>

      <MarkdownCMD ref={markdownRef} interval={30} autoStartTyping={false} onEnd={handleEnd} />
    </div>
  );
}
```

---

## 📚 Full API Documentation

### Default Exported Props for MarkdownTyper and MarkdownCMD

```js
import MarkdownTyper, { MarkdownCMD } from 'react-markdown-typer';
```

| Prop                          | Type                                        | Description                                                                                       | Default                                                                       |
| ----------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `interval`                    | `number`                                    | Typing interval (ms)                                                                              | `30`                                                                          |
| `timerType`                   | `'setTimeout'` \| `'requestAnimationFrame'` | Timer type, not dynamically changeable                                                            | Default is `setTimeout`, will switch to `requestAnimationFrame` in the future |
| `theme`                       | `'light'` \| `'dark'`                       | Theme type                                                                                        | `'light'`                                                                     |
| `customConvertMarkdownString` | `(markdownString: string) => string`        | Custom markdown string conversion function                                                        | -                                                                             |
| `onEnd`                       | `(data: EndData) => void`                   | Typing end callback                                                                               | -                                                                             |
| `onStart`                     | `(data: StartData) => void`                 | Typing start callback                                                                             | -                                                                             |
| `onBeforeTypedChar`           | `(data: IBeforeTypedChar) => Promise<void>` | Callback before typing a character, supports async, blocks next typing                            | -                                                                             |
| `onTypedChar`                 | `(data: ITypedChar) => void`                | Callback after each character                                                                     | -                                                                             |
| `disableTyping`               | `boolean`                                   | Disable typing animation                                                                          | `false`                                                                       |
| `autoStartTyping`             | `boolean`                                   | Whether to auto start typing animation, set false to trigger manually, not dynamically changeable | `true`                                                                        |

> Note: If `disableTyping` changes from `true` to `false` during typing, all remaining characters will be displayed at once on the next typing trigger.

### IBeforeTypedChar

| Prop           | Type     | Description                     | Default |
| -------------- | -------- | ------------------------------- | ------- |
| `currentIndex` | `number` | Index of current character      | `0`     |
| `currentChar`  | `string` | Character to be typed           | -       |
| `prevStr`      | `string` | Prefix string of current type   | -       |
| `percent`      | `number` | Typing progress percent (0-100) | `0`     |

### ITypedChar

| Prop           | Type     | Description                     | Default |
| -------------- | -------- | ------------------------------- | ------- |
| `currentIndex` | `number` | Index of current character      | `0`     |
| `currentChar`  | `string` | Character just typed            | -       |
| `prevStr`      | `string` | Prefix string of current type   | -       |
| `currentStr`   | `string` | Full string of current type     | -       |
| `percent`      | `number` | Typing progress percent (0-100) | `0`     |

#### Custom Markdown Conversion

The `customConvertMarkdownString` function allows you to preprocess markdown content before it's rendered. This is useful for:

- Custom markdown syntax extensions
- Content filtering or sanitization
- Integration with external markdown processors
- Custom link handling or formatting

**Example:**

```tsx
const customConvertMarkdownString = (markdownString) => {
  // Add custom processing logic here
  return markdownString.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>').replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
};
```

#### IMarkdownPlugin

You can pass all react-markdown props via `reactMarkdownProps` to support plugins.

### Exposed Methods

#### Default Export MarkdownTyper

| Method    | Params | Description                                 |
| --------- | ------ | ------------------------------------------- |
| `start`   | -      | Start typing animation                      |
| `stop`    | -      | Pause typing animation                      |
| `resume`  | -      | Resume typing animation                     |
| `restart` | -      | Restart typing animation from the beginning |

#### MarkdownCMD Exposed Methods

| Method            | Params                                      | Description                                 |
| ----------------- | ------------------------------------------- | ------------------------------------------- |
| `push`            | `(content: string, answerType: AnswerType)` | Add content and start typing                |
| `clear`           | -                                           | Clear all content and state                 |
| `triggerWholeEnd` | -                                           | Manually trigger completion callback        |
| `start`           | -                                           | Start typing animation                      |
| `stop`            | -                                           | Pause typing animation                      |
| `resume`          | -                                           | Resume typing animation                     |
| `restart`         | -                                           | Restart typing animation from the beginning |

**Usage Example:**

```tsx
markdownRef.current?.start(); // Start animation
markdownRef.current?.stop(); // Pause animation
markdownRef.current?.resume(); // Resume animation
markdownRef.current?.restart(); // Restart animation
```

---

## 🔧 Custom Markdown Processing Guide

### Basic Usage

```tsx
import MarkdownTyper from 'react-markdown-typer';

function CustomMarkdownDemo() {
  const customConvertMarkdownString = (markdownString) => {
    // Add your custom processing logic here
    return markdownString
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  };

  return (
    <MarkdownTyper interval={20} customConvertMarkdownString={customConvertMarkdownString}>
      # Custom Markdown Processing This is **bold text** and *italic text*. Check out [our website](https://example.com) for more info!
    </MarkdownTyper>
  );
}
```

### Advanced Processing

````tsx
// Complex custom processing example
const customConvertMarkdownString = (markdownString) => {
  return (
    markdownString
      // Custom emoji processing
      .replace(/:([a-zA-Z0-9_]+):/g, '<span class="emoji">:$1:</span>')
      // Custom mention processing
      .replace(/@([a-zA-Z0-9_]+)/g, '<span class="mention">@$1</span>')
      // Custom code block processing
      .replace(/```(\w+)\n([\s\S]*?)```/g, '<pre class="code-block"><code class="language-$1">$2</code></pre>')
      // Custom link processing with security
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
        if (url.startsWith('http')) {
          return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
        }
        return match;
      })
  );
};
````

### Integration with External Processors

```tsx
import { marked } from 'marked';

const customConvertMarkdownString = (markdownString) => {
  // Use marked.js for processing
  return marked(markdownString, {
    breaks: true,
    gfm: true,
  });
};
```

### Content Filtering

```tsx
const customConvertMarkdownString = (markdownString) => {
  // Filter out sensitive content
  const filteredContent = markdownString.replace(/password[:\s]*[^\s]+/gi, 'password: [FILTERED]').replace(/token[:\s]*[^\s]+/gi, 'token: [FILTERED]');

  return filteredContent;
};
```

---

## 🔌 Plugin System

See [react-markdown](https://github.com/remarkjs/react-markdown)

---

## 🎛️ Timer Modes Explained

### `requestAnimationFrame` Mode 🌟 (Recommended)

```typescript
// 🎯 Features
- Time-driven: Calculates character count based on real elapsed time
- Batch processing: Multiple characters per frame
- Frame sync: Syncs with browser 60fps refresh rate
- High-frequency optimization: Perfect for interval < 16ms

// 🎯 Use cases
- Default for modern web apps
- Pursue smooth animation
- High-frequency typing (interval > 0)
- AI real-time chat
```

### `setTimeout` Mode 📟 (Compatible)

```typescript
// 🎯 Features
- Single character: Processes one character at a time
- Fixed interval: Executes strictly by set time
- Rhythmic: Classic typewriter rhythm
- Precise control: For specific timing needs

// 🎯 Use cases
- Need precise timing
- Retro typewriter effect
- High compatibility scenarios
```

### 📊 Performance Comparison

| Feature       | requestAnimationFrame         | setTimeout        |
| ------------- | ----------------------------- | ----------------- |
| **Char proc** | Multiple chars per frame      | One char per call |
| **High freq** | ✅ Excellent (5ms → 3 chars)  | ❌ May stutter    |
| **Low freq**  | ✅ Normal (100ms → 1 char/6f) | ✅ Precise        |
| **Visual**    | 🎬 Smooth animation           | ⚡ Rhythmic       |
| **Perf cost** | 🟢 Low (frame sync)           | 🟡 Medium (timer) |

High frequency: use `requestAnimationFrame`, low frequency: use `setTimeout`

---

## 💡 Practical Examples

### 📝 AI Streaming Chat

<!-- [DEMO: 🔧 Try on StackBlitz](https://stackblitz.com/edit/vitejs-vite-2ri8kex3?file=src%2FApp.tsx) -->

````tsx
import { useRef } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'react-markdown-typer';

function StreamingChat() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  // Simulate AI streaming response
  const simulateAIResponse = async () => {
    markdownRef.current?.clear();

    // Thinking phase
    markdownRef.current?.push('🤔 Analyzing your question...', 'thinking');
    await delay(1000);
    markdownRef.current?.push('\n\n✅ Analysis complete, starting answer', 'thinking');

    // Streaming answer
    const chunks = [
      '# React 19 New Features\n\n',
      '## 🚀 React Compiler\n',
      'The highlight of React 19 is the introduction of **React Compiler**:\n\n',
      '- 🎯 **Auto optimization**: No need for manual memo/useMemo\n',
      '- ⚡ **Performance boost**: Compile-time optimization, zero runtime cost\n',
      '- 🔧 **Backward compatible**: No code changes needed\n\n',
      '## 📝 Actions Simplify Forms\n',
      'The new Actions API makes form handling easier:\n\n',
      '```tsx\n',
      'function ContactForm({ action }) {\n',
      '  const [state, formAction] = useActionState(action, null);\n',
      '  return (\n',
      '    <form action={formAction}>\n',
      '      <input name="email" type="email" />\n',
      '      <button>Submit</button>\n',
      '    </form>\n',
      '  );\n',
      '}\n',
      '```\n\n',
      'Hope this helps! 🎉',
    ];

    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div className="chat-container">
      <button onClick={simulateAIResponse}>🤖 Ask about React 19 features</button>

      <MarkdownCMD ref={markdownRef} interval={10} timerType="requestAnimationFrame" onEnd={(data) => console.log('Paragraph done:', data)} />
    </div>
  );
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
````

### 🔧 Custom Markdown Processing Demo

```tsx
function CustomMarkdownStreamingDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

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
      '# Custom Markdown Processing\n\n',
      'This demo shows how to use **custom markdown processing** with streaming content:\n\n',
      '## Features\n',
      '- *Custom link handling*\n',
      '- **Bold and italic** text processing\n',
      '- `Inline code` formatting\n',
      '- [External links](https://example.com) with security attributes\n\n',
      'The `customConvertMarkdownString` function allows you to preprocess content before rendering!',
    ];

    for (const chunk of customChunks) {
      await delay(150);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={simulateCustomResponse}>🔧 Custom Markdown Demo</button>

      <MarkdownCMD ref={markdownRef} interval={20} timerType="requestAnimationFrame" customConvertMarkdownString={customConvertMarkdownString} />
    </div>
  );
}
```

### 🎯 Advanced Callback Control

```tsx
import { useRef, useState } from 'react';
import { MarkdownCMD, MarkdownCMDRef } from 'react-markdown-typer';

function AdvancedCallbackDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);
  const [typingStats, setTypingStats] = useState({ progress: 0, currentChar: '', totalChars: 0 });

  const handleBeforeTypedChar = async (data) => {
    // Async operation before typing a character
    console.log('About to type:', data.currentChar);

    // You can do network requests, data validation, etc. here
    if (data.currentChar === '!') {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    }
  };

  const handleTypedChar = (data) => {
    // Update typing stats
    setTypingStats({
      progress: Math.round(data.percent),
      currentChar: data.currentChar,
      totalChars: data.currentIndex + 1,
    });

    // Add sound effects, animations, etc. here
    if (data.currentChar === '.') {
      // Play period sound effect
      console.log('Play period sound');
    }
  };

  const handleStart = (data) => {
    console.log('Typing started:', data.currentChar);
  };

  const handleEnd = (data) => {
    console.log('Typing finished:', data.str);
  };

  const startDemo = () => {
    markdownRef.current?.clear();
    markdownRef.current?.push(
      '# Advanced Callback Demo\n\n' +
        'This example shows how to use `onBeforeTypedChar` and `onTypedChar` callbacks:\n\n' +
        '- 🎯 **Before typing callback**: Async operations before displaying a character\n' +
        '- 📊 **After typing callback**: Real-time progress updates and effects\n' +
        '- ⚡ **Performance**: Async operations without affecting typing smoothness\n\n' +
        'Current progress: ' +
        typingStats.progress +
        '%\n' +
        'Characters typed: ' +
        typingStats.totalChars +
        '\n\n' +
        'This is a very powerful feature!',
      'answer',
    );
  };

  return (
    <div>
      <button onClick={startDemo}>🚀 Start Advanced Demo</button>

      <div style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5', borderRadius: '4px' }}>
        <strong>Typing Stats:</strong> Progress {typingStats.progress}% | Current char: "{typingStats.currentChar}" | Total chars: {typingStats.totalChars}
      </div>

      <MarkdownCMD ref={markdownRef} interval={30} onBeforeTypedChar={handleBeforeTypedChar} onTypedChar={handleTypedChar} onStart={handleStart} onEnd={handleEnd} />
    </div>
  );
}
```
