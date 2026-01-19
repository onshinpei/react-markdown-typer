# react-markdown-typer

> 🚀 React Markdown 打字动画组件

**如果您需要带有样式，支持数据公式、mermaid图表渲染，推荐您用 [ds-markdown](https://github.com/onshinpei/ds-markdown)**

**🇨🇳 中文 | [🇺🇸 English](./README.md)**

一个专为现代 AI 应用设计的 React 组件，提供流畅的实时打字动画和完整的 Markdown 渲染能力。

[![npm version](https://img.shields.io/npm/v/react-markdown-typer)](https://www.npmjs.com/package/react-markdown-typer)
[![npm downloads](https://img.shields.io/npm/dm/react-markdown-typer.svg)](https://www.npmjs.com/package/react-markdown-typer)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-markdown-typer)](https://bundlephobia.com/package/react-markdown-typer)
[![React](https://img.shields.io/badge/React-16.8+-blue)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)](https://www.typescriptlang.org/)

[📖 在线演示](https://onshinpei.github.io/react-markdown-typer/) | [🔧 StackBlitz 体验](https://stackblitz.com/edit/vitejs-vite-ndgqzcbp?file=README.md)

---

## 为什么选择 react-markdown-typer？

### 专为 AI 应用优化

普通打字机遇到 AI 流式数据会卡顿？我们不会。**自动将每个 chunk 拆分为字符**，无论后端一次推送多少，都能逐字流畅渲染。

### 轻量但强大

- 基于业界标准 [react-markdown](https://github.com/remarkjs/react-markdown)
- 零额外依赖，开箱即用

### 完整的打字控制

不只是播放动画，还能 **暂停、继续、重新开始、清空**。完全的命令式 API，让你掌控一切。

### 插件生态兼容

兼容整个 remark/rehype 插件生态，轻松扩展功能。支持代码高亮、数学公式、表格、自定义光标等丰富功能。

### 生产就绪

- TypeScript 原生支持
- 完整的类型定义

**适用场景**

AI 聊天助手 · 实时问答系统 · 在线教育平台 · 产品演示 · 交互式文档 · 知识库展示

---

## 📦 快速安装

```bash
npm install react-markdown-typer
```

## 🚀 快速开始

### 基础用法

```tsx
import MarkdownTyper from 'react-markdown-typer';

function App() {
  return (
    <MarkdownTyper interval={20}>
      # Hello World
      
      这是一个**高性能**的打字动画组件！
      
      - ⚡ 流畅渲染
      - 🎯 完美语法支持
    </MarkdownTyper>
  );
}
```

### AI 流式对话

```tsx
import { useRef, useEffect } from 'react';
import { MarkdownTyperCMD, MarkdownTyperCMDRef } from 'react-markdown-typer';

function ChatDemo() {
  const cmdRef = useRef<MarkdownTyperCMDRef>(null);

  useEffect(() => {
    // 模拟流式数据
    async function simulateStreaming() {
      const chunks = ['# AI 回答\n\n', '这是', '一个', '流式', '响应'];
      
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

### 光标效果

```tsx
// 字符串光标
<MarkdownTyperCMD 
  ref={cmdRef}
  showCursor={true}
  cursor="|"
  interval={50}
/>

// 自定义 ReactNode 光标
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

### 控制动画

```tsx
const cmdRef = useRef<MarkdownTyperCMDRef>(null);

// 控制方法
cmdRef.current?.stop();     // 暂停
cmdRef.current?.resume();   // 继续
cmdRef.current?.restart();  // 重新开始
cmdRef.current?.clear();    // 清除
```

---

## 📚 API 文档

### MarkdownTyper Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `children` | `string` | - | Markdown 内容（必需） |
| `interval` | `number \| IntervalType` | `30` | 打字间隔（毫秒） |
| `timerType` | `'setTimeout' \| 'requestAnimationFrame'` | `'setTimeout'` | 定时器类型 |
| `showCursor` | `boolean` | `false` | 是否显示光标 |
| `cursor` | `React.ReactNode` | `"\|"` | 光标内容 |
| `disableTyping` | `boolean` | `false` | 禁用打字动画 |
| `autoStartTyping` | `boolean` | `true` | 是否自动开始 |
| `onStart` | `(data) => void` | - | 打字开始回调 |
| `onEnd` | `(data) => void` | - | 打字结束回调 |
| `onTypedChar` | `(data) => void` | - | 每个字符打字后回调 |
| `reactMarkdownProps` | `Options` | - | react-markdown 配置 |

### MarkdownTyperCMD Props

与 `MarkdownTyper` 相同，但不需要 `children`。

### MarkdownTyper Methods

| 方法 | 说明 |
|------|------|
| `start()` | 开始打字动画 |
| `stop()` | 暂停打字动画 |
| `resume()` | 恢复打字动画 |
| `restart()` | 重新开始 |

### MarkdownTyperCMD Methods

| 方法 | 参数 | 说明 |
|------|------|------|
| `push(content)` | `string` | 添加内容并开始打字 |
| `clear()` | - | 清空所有内容和状态 |
| `start()` | - | 开始打字动画 |
| `stop()` | - | 暂停打字动画 |
| `resume()` | - | 恢复打字动画 |
| `restart()` | - | 重新开始 |

### IntervalType

支持动态打字速度：

```typescript
type IntervalType = number | {
  max: number;      // 最大间隔
  min: number;      // 最小间隔
  curve?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  curveFn?: (x: number) => number;  // 自定义曲线函数
}
```

**示例**：
```tsx
<MarkdownTyper 
  interval={{
    min: 10,
    max: 100,
    curve: 'ease-out'  // 开始快，结束慢
  }}
>
  内容...
</MarkdownTyper>
```

---

## 🧮 数学公式

安装 KaTeX 插件：

```bash
npm install remark-math rehype-katex katex
```

使用：

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
  行内公式：$E = mc^2$
  
  块级公式：
  $$
  \int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
  $$
</MarkdownTyper>
```

---

## 🔌 插件系统

完全兼容 [react-markdown](https://github.com/remarkjs/react-markdown) 的插件生态：

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
  console.log('代码高亮');
  ```
</MarkdownTyper>
```

---

## 🎛️ 定时器模式

### `requestAnimationFrame` 模式（推荐）

- 时间驱动，批量处理字符
- 与浏览器 60fps 刷新率同步
- 适合高频打字（interval < 16ms）

### `setTimeout` 模式

- 单字符处理，固定间隔
- 精确时间控制
- 适合低频打字或需要精确节奏的场景

```tsx
// 高频推荐 requestAnimationFrame
<MarkdownTyper interval={5} timerType="requestAnimationFrame">
  快速打字
</MarkdownTyper>

// 低频推荐 setTimeout
<MarkdownTyper interval={100} timerType="setTimeout">
  慢速打字
</MarkdownTyper>
```

---

## 💡 高级功能

### 自定义 Markdown 转换

```tsx
<MarkdownTyper
  customConvertMarkdownString={(str) => {
    // 自定义处理逻辑
    return str.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
      '<a href="$2" target="_blank">$1</a>');
  }}
>
  [链接](https://example.com)
</MarkdownTyper>
```

### 回调函数

```tsx
<MarkdownTyper
  onStart={(data) => console.log('开始打字', data)}
  onEnd={(data) => console.log('打字结束', data)}
  onTypedChar={(data) => {
    console.log('进度:', data.percent + '%');
  }}
>
  内容...
</MarkdownTyper>
```

### 禁用打字动画

```tsx
const [disable, setDisable] = useState(false);

<MarkdownTyper disableTyping={disable}>
  内容会立即显示，无动画
</MarkdownTyper>
```

---

## 📖 示例项目

克隆仓库查看完整示例：

```bash
git clone https://github.com/onshinpei/react-markdown-typer.git
cd react-markdown-typer
npm install
npm run dev
```

示例位置：
- `example/basic/` - 基础用法
- `example/cmd/` - 命令式 API
- `example/cursor/` - 光标效果
- `example/katex/` - 数学公式

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT © [onshinpei](https://github.com/onshinpei)

---

## 🔗 相关项目

- [react-markdown](https://github.com/remarkjs/react-markdown) - Markdown 渲染核心
- [ds-markdown](https://github.com/onshinpei/ds-markdown) - 带样式的增强版（支持 mermaid 图表）
