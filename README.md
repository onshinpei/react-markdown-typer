# react-markdown-typer

> 🚀 HReact Markdown typing animation component

**[🇨🇳 中文](./README.zh.md) | 🇺🇸 English**

A React component designed for modern AI applications, providing smooth real-time typing animation and full Markdown rendering capabilities.

[![npm version](https://img.shields.io/npm/v/react-markdown-typer)](https://www.npmjs.com/package/react-markdown-typer)
[![npm downloads](https://img.shields.io/npm/dm/react-markdown-typer.svg)](https://www.npmjs.com/package/react-markdown-typer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-markdown-typer)](https://bundlephobia.com/package/react-markdown-typer)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 Online Demo](https://onshinpei.github.io/react-markdown-typer/)

<!-- [DEMO: 🔧 Try on StackBlitz](https://stackblitz.com/edit/vitejs-vite-ddfw8avb?file=src%2FApp.tsx) -->

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
  Supports light/dark themes, compatible with remark/rehype plugins for advanced customization and extension.

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
    - [Math Formula Support](#math-formula-support)
    - [AI Chat Scenario](#ai-chat-scenario)
    - [🎯 Advanced Callback Control](#-advanced-callback-control)
    - [🔄 Restart Animation Demo](#-restart-animation-demo)
    - [▶️ Manual Start Animation Demo](#️-manual-start-animation-demo)
  - [📚 Full API Documentation](#-full-api-documentation)
    - [Default Exported Props for MarkdownTyper and MarkdownCMD](#default-exported-props-for-markdowntyper-and-markdowncmd)
    - [IBeforeTypedChar](#ibeforetypedchar)
    - [ITypedChar](#itypedchar)
      - [IMarkdownMath](#imarkdownmath)
      - [IMarkdownPlugin](#imarkdownplugin)
    - [Exposed Methods](#exposed-methods)
      - [Default Export MarkdownTyper](#default-export-markdowntyper)
      - [MarkdownCMD Exposed Methods](#markdowncmd-exposed-methods)
  - [🧮 Math Formula Guide](#-math-formula-guide)
    - [Basic Syntax](#basic-syntax)
    - [Delimiter Selection](#delimiter-selection)
    - [Streaming Math Formulas](#streaming-math-formulas)
    - [Style Customization](#style-customization)
  - [🔌 Plugin System](#-plugin-system)
  - [🎛️ Timer Modes Explained](#️-timer-modes-explained)
    - [`requestAnimationFrame` Mode 🌟 (Recommended)](#requestanimationframe-mode--recommended)
    - [`setTimeout` Mode 📟 (Compatible)](#settimeout-mode--compatible)
    - [📊 Performance Comparison](#-performance-comparison)
  - [💡 Practical Examples](#-practical-examples)
    - [📝 AI Streaming Chat](#-ai-streaming-chat)
    - [🧮 Streaming Math Formula Rendering](#-streaming-math-formula-rendering)
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

<!-- [DEMO](https://stackblitz.com/edit/stackblitz-starters-7vcclcw7?file=index.html) -->

```html
<!-- Import the component -->
<script type="module">
  import Markdown from 'https://esm.sh/react-markdown-typer';
</script>
```

## 🚀 5-Minute Quick Start

### Basic Usage

<!-- [DEMO](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx) -->

```tsx
import MarkdownTyper from 'react-markdown-typer';
import 'react-markdown-typer/style.css';

function App() {
  return (
    <MarkdownTyper interval={20} answerType="answer">
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

### Math Formula Support

```tsx
import MarkdownTyper from 'react-markdown-typer';
// If you need to display formulas, import the formula plugins
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

function MathDemo() {
  return (
    <MarkdownTyper interval={20} reactMarkdownProps={{ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }} math={{ splitSymbol: 'dollar' }}>
      # Pythagorean Theorem In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides: $a^2 + b^2 = c^2$ Where: - $a$ and $b$ are the legs - $c$ is the
      hypotenuse For the classic "3-4-5 triangle": $c = \sqrt{3 ^ (2 + 4) ^ 2} = \sqrt{25} = 5$
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

| Prop                | Type                                        | Description                                                                                       | Default                                                                       |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `interval`          | `number`                                    | Typing interval (ms)                                                                              | `30`                                                                          |
| `timerType`         | `'setTimeout'` \| `'requestAnimationFrame'` | Timer type, not dynamically changeable                                                            | Default is `setTimeout`, will switch to `requestAnimationFrame` in the future |
| `theme`             | `'light'` \| `'dark'`                       | Theme type                                                                                        | `'light'`                                                                     |
| `plugins`           | `IMarkdownPlugin[]`                         | Plugin config                                                                                     | `[]`                                                                          |
| `math`              | [IMarkdownMath](#IMarkdownMath)             | Math formula config                                                                               | `{ splitSymbol: 'dollar' }`                                                   |
| `onEnd`             | `(data: EndData) => void`                   | Typing end callback                                                                               | -                                                                             |
| `onStart`           | `(data: StartData) => void`                 | Typing start callback                                                                             | -                                                                             |
| `onBeforeTypedChar` | `(data: IBeforeTypedChar) => Promise<void>` | Callback before typing a character, supports async, blocks next typing                            | -                                                                             |
| `onTypedChar`       | `(data: ITypedChar) => void`                | Callback after each character                                                                     | -                                                                             |
| `disableTyping`     | `boolean`                                   | Disable typing animation                                                                          | `false`                                                                       |
| `autoStartTyping`   | `boolean`                                   | Whether to auto start typing animation, set false to trigger manually, not dynamically changeable | `true`                                                                        |

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

#### IMarkdownMath

| Prop          | Type                      | Description                 | Default    |
| ------------- | ------------------------- | --------------------------- | ---------- |
| `splitSymbol` | `'dollar'` \| `'bracket'` | Math formula delimiter type | `'dollar'` |

**Delimiter Explanation:**

- `'dollar'`: Use `$...$` and `$$...$$` syntax
- `'bracket'`: Use `\(...\)` and `\[...\]` syntax

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

## 🧮 Math Formula Guide

<!-- [DEMO1: Pythagorean Theorem](https://stackblitz.com/edit/vitejs-vite-z94syu8j?file=src%2FApp.tsx) -->

<!-- [DEMO2: Problem Solution](https://stackblitz.com/edit/vitejs-vite-xk9lxagc?file=README.md) -->

### Basic Syntax

```tsx
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// 1. Enable math formula support
<MarkdownTyper reactMarkdownProps={{ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex]}}>
  # Math Formula Example

  // Inline formula
  This is an inline formula: $E = mc^2$

  // Block formula
  $$\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$$
</MarkdownTyper>
```

### Delimiter Selection

```tsx
// Use dollar sign delimiter (default)
<MarkdownTyper
  reactMarkdownProps={{ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex]}}
  math={{ splitSymbol: 'dollar' }}
>
  Inline: $a + b = c$
  Block: $$\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n$$
</MarkdownTyper>

// Use bracket delimiter
<MarkdownTyper
  reactMarkdownProps={{ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex]}}
  math={{ splitSymbol: 'bracket' }}
>
  Inline: \(a + b = c\)
  Block: \[\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n\]
</MarkdownTyper>
```

### Streaming Math Formulas

```tsx
// Perfectly supports streaming output of math formulas
const mathContent = [
  'Pythagorean theorem:',
  '$a^2 + b^2 = c^2$',
  '\n\n',
  'Where:',
  '- $a$ and $b$ are the legs\n',
  '- $c$ is the hypotenuse\n\n',
  'For the classic "3-4-5 triangle":\n',
  '$c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$\n\n',
  'This theorem has wide applications in geometry!',
];

mathContent.forEach((chunk) => {
  markdownRef.current?.push(chunk, 'answer');
});
```

### Style Customization

```css
/* Math formula style customization */
.katex {
  font-size: 1.1em;
}

.katex-display {
  margin: 1em 0;
  text-align: center;
}

/* Dark theme adaptation */
[data-theme='dark'] .katex {
  color: #e1e1e1;
}
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

### 🧮 Streaming Math Formula Rendering

```tsx
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

function MathStreamingDemo() {
  const markdownRef = useRef<MarkdownCMDRef>(null);

  const simulateMathResponse = async () => {
    markdownRef.current?.clear();

    const mathChunks = [
      '# Pythagorean Theorem Explained\n\n',
      'In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides:\n\n',
      '$a^2 + b^2 = c^2$\n\n',
      'Where:\n',
      '- $a$ and $b$ are the legs\n',
      '- $c$ is the hypotenuse\n\n',
      'For the classic "3-4-5 triangle":\n',
      '$c = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$\n\n',
      'This theorem has wide applications in geometry!',
    ];

    for (const chunk of mathChunks) {
      await delay(150);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={simulateMathResponse}>📐 Explain Pythagorean Theorem</button>

      <MarkdownCMD
        ref={markdownRef}
        interval={20}
        timerType="requestAnimationFrame"
        reactMarkdownProps={{ remarkPlugins: [remarkMath], rehypePlugins: [rehypeKatex] }}
        math={{ splitSymbol: 'dollar' }}
      />
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

</rewritten_file>
