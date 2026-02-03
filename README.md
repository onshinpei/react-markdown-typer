# react-markdown-typer

> 🚀 React Markdown Typing Animation Component

**If you need styling, support for math formulas, and mermaid chart rendering, we recommend [ds-markdown](https://github.com/onshinpei/ds-markdown)**

**🇨🇳 [中文](./README.zh.md) | 🇺🇸 English**

A React component designed for modern AI applications, providing smooth real-time typing animations and full Markdown rendering capabilities.

[![npm version](https://img.shields.io/npm/v/react-markdown-typer)](https://www.npmjs.com/package/react-markdown-typer)
[![npm downloads](https://img.shields.io/npm/dm/react-markdown-typer.svg)](https://www.npmjs.com/package/react-markdown-typer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-markdown-typer)](https://bundlephobia.com/package/react-markdown-typer)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 Live Demo](https://onshinpei.github.io/react-markdown-typer/) | [🔧 StackBlitz](https://stackblitz.com/edit/vitejs-vite-ndgqzcbp?file=README.md)

---

## Why choose react-markdown-typer?

### Optimized for AI Applications

Do regular typewriters stutter with AI streaming data? We don't. **Automatically splits each chunk into characters**, ensuring smooth character-by-character rendering no matter how much the backend pushes at once.

### Lightweight yet Powerful

- Built on industry-standard [react-markdown](https://github.com/remarkjs/react-markdown)
- Zero additional dependencies, works out of the box

### Complete Typing Control

Not just playing animations, but also **pause, resume, restart, and clear**. Full imperative API gives you complete control.

### Plugin Ecosystem Compatible

Compatible with the entire remark/rehype plugin ecosystem, easily extend functionality. Supports code highlighting, math formulas, tables, custom cursors, and more.

### Production Ready

- Native TypeScript support
- Complete type definitions

**Use Cases**

AI Chat Assistants · Real-time Q&A Systems · Online Education Platforms · Product Demos · Interactive Documentation · Knowledge Base Display

---

## Quick Install

```bash
npm install react-markdown-typer
```

## Quick Start

### Basic Usage

```tsx
import MarkdownTyper from 'react-markdown-typer';

function App() {
  return (
    <MarkdownTyper interval={20}>
      # Hello World
      
      This is a **high-performance** typing animation component!
      
      - ⚡ Smooth rendering
      - 🎯 Perfect syntax support
    </MarkdownTyper>
  );
}
```

### AI Streaming Chat

```tsx
import { useRef, useEffect } from 'react';
import { MarkdownTyperCMD, MarkdownTyperCMDRef } from 'react-markdown-typer';

function ChatDemo() {
  const cmdRef = useRef<MarkdownTyperCMDRef>(null);

  useEffect(() => {
    // Simulate streaming data
    async function simulateStreaming() {
      const chunks = ['# AI Response\n\n', 'This', 'is', 'a', 'streaming', 'response'];
      
      for (const chunk of chunks) {
        await new Promise(resolve => setTimeout(resolve, 100));
        cmdRef.current?.push(chunk);
      }
    }
    
    simulateStreaming();
  }, []);

  return (
    <MarkdownTyperCMD 
      ref={cmdRef}
      interval={30}
    />
  );
}
```

### Cursor Effect

```tsx
// String cursor
<MarkdownTyperCMD 
  ref={cmdRef}
  showCursor={true}
  cursor="|"
  interval={50}
/>

// Custom ReactNode cursor
<MarkdownTyperCMD 
  ref={cmdRef}
  showCursor={true}
  cursor={
    <span style={{ 
      color: '#007acc',
      animation: 'blink 1s infinite'
    }}>|</span>
  }
  interval={50}
/>
```

### Control Animation

```tsx
const cmdRef = useRef<MarkdownTyperCMDRef>(null);

// Control methods
cmdRef.current?.stop();     // Pause
cmdRef.current?.resume();   // Resume
cmdRef.current?.restart();  // Restart
cmdRef.current?.clear();    // Clear
```

---

## API Documentation

### MarkdownTyper Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `children` | `string` | - | Markdown content (required) |
| `interval` | `number \| IntervalType` | `30` | Typing interval (milliseconds) |
| `timerType` | `'setTimeout' \| 'requestAnimationFrame'` | `'setTimeout'` | Timer type |
| `showCursor` | `boolean` | `false` | Whether to show cursor |
| `cursor` | `React.ReactNode` | `"\|"` | Cursor content |
| `showCursorOnPause` | `boolean` | `true` | Whether to show cursor when paused |
| `disableTyping` | `boolean` | `false` | Disable typing animation |
| `autoStartTyping` | `boolean` | `true` | Auto start typing |
| `onStart` | `(data) => void` | - | Typing start callback |
| `onEnd` | `(data) => void` | - | Typing end callback |
| `onTypedChar` | `(data) => void` | - | Callback after each character |
| `reactMarkdownProps` | `Options` | - | react-markdown configuration |

### MarkdownTyperCMD Props

Same as `MarkdownTyper`, but without `children`.

### MarkdownTyper Methods

| Method | Description |
|--------|-------------|
| `start()` | Start typing animation |
| `stop()` | Pause typing animation |
| `resume()` | Resume typing animation |
| `restart()` | Restart animation |

### MarkdownTyperCMD Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `push(content)` | `string` | Add content and start typing |
| `clear()` | - | Clear all content and state |
| `start()` | - | Start typing animation |
| `stop()` | - | Pause typing animation |
| `resume()` | - | Resume typing animation |
| `restart()` | - | Restart animation |

### IntervalType

Supports dynamic typing speed:

```typescript
type IntervalType = number | {
  max: number;      // Maximum interval
  min: number;      // Minimum interval
  curve?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  curveFn?: (x: number) => number;  // Custom curve function
}
```

**Example**:
```tsx
<MarkdownTyper 
  interval={{
    min: 10,
    max: 100,
    curve: 'ease-out'  // Fast start, slow end
  }}
>
  Content...
</MarkdownTyper>
```

---

## Math Formulas

Install KaTeX plugins:

```bash
npm install remark-math rehype-katex katex
```

Usage:

```tsx
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

<MarkdownTyper
  interval={20}
  reactMarkdownProps={{
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex]
  }}
>
  Inline formula: $E = mc^2$
  
  Block formula:
  $$
  \int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
  $$
</MarkdownTyper>
```

---

## Plugin System

Fully compatible with [react-markdown](https://github.com/remarkjs/react-markdown) plugin ecosystem:

```tsx
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import 'highlight.js/styles/github.css';

<MarkdownTyper
  reactMarkdownProps={{
    remarkPlugins: [remarkGfm],
    rehypePlugins: [rehypeHighlight]
  }}
>
  ```javascript
  console.log('Syntax highlighting');
  ```
</MarkdownTyper>
```

---

## Timer Modes

### `requestAnimationFrame` Mode (Recommended)

- Time-driven, batch character processing
- Synchronized with browser 60fps refresh rate
- Suitable for high-frequency typing (interval < 16ms)

### `setTimeout` Mode

- Single character processing, fixed interval
- Precise time control
- Suitable for low-frequency typing or scenarios requiring precise rhythm

```tsx
// High frequency: recommend requestAnimationFrame
<MarkdownTyper interval={5} timerType="requestAnimationFrame">
  Fast typing
</MarkdownTyper>

// Low frequency: recommend setTimeout
<MarkdownTyper interval={100} timerType="setTimeout">
  Slow typing
</MarkdownTyper>
```

---

## Advanced Features

### Custom Markdown Conversion

```tsx
<MarkdownTyper
  customConvertMarkdownString={(str) => {
    // Custom processing logic
    return str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" target="_blank">$1</a>');
  }}
>
  [Link](https://example.com)
</MarkdownTyper>
```

### Callback Functions

```tsx
<MarkdownTyper
  onStart={(data) => console.log('Typing started', data)}
  onEnd={(data) => console.log('Typing ended', data)}
  onTypedChar={(data) => {
    console.log('Progress:', data.percent + '%');
  }}
>
  Content...
</MarkdownTyper>
```

### Disable Typing Animation

```tsx
const [disable, setDisable] = useState(false);

<MarkdownTyper disableTyping={disable}>
  Content displays immediately, no animation
</MarkdownTyper>
```

---

## Example Projects

Clone the repository to view complete examples:

```bash
git clone https://github.com/onshinpei/react-markdown-typer.git
cd react-markdown-typer
npm install
npm run dev
```

Example locations:
- `example/basic/` - Basic usage
- `example/cmd/` - Imperative API
- `example/cursor/` - Cursor effects
- `example/katex/` - Math formulas

---

## Contributing

Issues and Pull Requests are welcome!

## License

MIT © [onshinpei](https://github.com/onshinpei)

---

## Related Projects

- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering core
- [ds-markdown](https://github.com/onshinpei/ds-markdown) - Enhanced version with styling (supports mermaid charts)

