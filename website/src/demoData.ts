import type { DemoData } from './defined';

// 双语演示数据
export const demoDataZh: DemoData = {
  installation: `# 📦 安装 react-markdown-typer

\`\`\`bash
# 使用 npm 安装
npm install react-markdown-typer

# 使用 yarn 安装  
yarn add react-markdown-typer

# 使用 pnpm 安装
pnpm add react-markdown-typer
\`\`\`

## 快速开始

安装完成后，你就可以在项目中使用这个强大的 Markdown 打字动画组件了！

> 💡 **提示**: 记得同时引入样式文件来获得最佳视觉效果。`,

  basic: `# Hello react-markdown-typer

这是一个**高性能**的打字动画组件！

## ✨ 特性

- ⚡ 零延迟流式处理
- 🎬 流畅打字动画  
- 🎯 完美语法支持
- 📊 丰富的内容类型

### 代码示例

\`\`\`javascript
const message = "Hello World!";
console.log(message);

// 支持多种编程语言高亮
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

### 表格支持

| 特性 | 支持程度 | 说明 |
|------|----------|------|
| Markdown | ✅ 完整 | 支持标准 Markdown 语法 |
| 打字动画 | ✅ 流畅 | 可自定义速度和效果 |
| 数学公式 | ✅ KaTeX | 支持复杂数学公式 |
| 代码高亮 | ✅ 多语言 | 支持主流编程语言 |

> 这是一个引用块，展示了 Markdown 的强大功能。`,

  math: `# 🧮 勾股定理

在直角三角形中，斜边的平方等于两条直角边的平方和：

$a^2 + b^2 = c^2$

其中：
- $a$ 和 $b$ 是直角边
- $c$ 是斜边

## 示例计算

对于经典的"勾三股四弦五"：

$c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$

## 更复杂的公式

**二次公式：**
$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

**积分：**
$\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$

> 💡 数学公式使用 KaTeX 渲染，支持绝大部分 LaTeX 数学语法。`,

  typing: `# ⌨️ 打字动画演示

这段文字会以打字机的效果逐字显示...

## 控制功能

1. **开启/关闭打字效果** - 可以切换静态显示模式
2. **暂停/继续** - 可以在打字过程中暂停和继续  
3. **速度控制** - 通过 interval 属性调整打字速度

### 使用场景

- 📄 **AI 对话界面** - 模拟真实的对话体验
- 📝 **在线文档展示** - 增加阅读的趣味性
- 🎬 **动画效果展示** - 吸引用户注意力
- 📊 **数据流式加载** - 实时展示数据变化

> ⚡ 打字动画支持多种模式，可以实现流畅的视觉效果。`,

  theme: `# 🎨 主题演示

当前主题：**{{THEME}}模式**

## 支持的主题

1. **light** - 亮色主题，适合日间使用 ☀️
2. **dark** - 暗色主题，适合夜间使用 🌙

### 代码高亮

\`\`\`javascript
const theme = 'dark';
if (theme === 'dark') {
    document.body.classList.add('dark-theme');
} else {
    document.body.classList.remove('dark-theme');
}
\`\`\`

> 两种主题都有完美的代码高亮支持，确保在任何环境下都有良好的阅读体验。`,

  streaming: `# 🌊 流式数据演示

## 使用 MarkdownCMD 组件

\`\`\`tsx
import React, { useRef } from 'react';
import { MarkdownCMD, MarkdownTyperCMDRef } from 'react-markdown-typer';

function StreamingDemo() {
  const markdownRef = useRef<MarkdownTyperCMDRef>(null);

  const handleStreaming = async () => {
    // 清空之前的内容
    markdownRef.current?.clear();
    
    // 模拟思考过程
    markdownRef.current?.push('🤔 正在分析...', 'thinking');
    await delay(1000);
    
    // 流式推送内容
    const chunks = [
      '# AI 助手回答\\n\\n',
      '根据您的问题，我来为您详细解答：\\n\\n',
      '## 主要特点\\n\\n',
      '- ⚡ **高性能**：基于优化的渲染引擎\\n',
      '- 🎬 **流畅动画**：支持多种打字效果\\n',
      '- 🎯 **完美兼容**：支持完整 Markdown 语法\\n'
    ];
    
    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={handleStreaming}>
        开始流式演示
      </button>
      <MarkdownCMD 
        ref={markdownRef}
        interval={15}
        timerType="requestAnimationFrame"
      />
    </div>
  );
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
\`\`\`

## 核心特性

- **实时流式处理** - 支持网络流式数据
- **思考模式** - 模拟 AI 思考过程
- **中断恢复** - 支持暂停和继续
- **多种场景** - AI 对话、代码生成、文档生成

> 💡 流式演示完美模拟了真实的 AI 对话体验，支持思考过程和回答内容的区分。`,
};

export const demoDataEn: DemoData = {
  installation: `# 📦 Install react-markdown-typer

\`\`\`bash
# Install with npm
npm install react-markdown-typer

# Install with yarn  
yarn add react-markdown-typer

# Install with pnpm
pnpm add react-markdown-typer
\`\`\`

## Quick Start

After installation, you can use this powerful Markdown typing animation component in your project!

> 💡 **Tip**: Remember to import the style file for optimal visual effects.`,

  basic: `# Hello react-markdown-typer

This is a **high-performance** typing animation component!

## ✨ Features

- ⚡ Zero-latency streaming processing
- 🎬 Smooth typing animation  
- 🎯 Perfect syntax support
- 📊 Rich content types

### Code Example

\`\`\`javascript
const message = "Hello World!";
console.log(message);

// Support multiple programming language highlighting
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

### Table Support

| Feature | Support Level | Description |
|---------|---------------|-------------|
| Markdown | ✅ Complete | Support standard Markdown syntax |
| Typing Animation | ✅ Smooth | Customizable speed and effects |
| Math Formulas | ✅ KaTeX | Support complex mathematical formulas |
| Code Highlighting | ✅ Multi-language | Support mainstream programming languages |

> This is a quote block, showcasing the powerful features of Markdown.`,

  math: `# 🧮 Pythagorean Theorem

In a right triangle, the square of the hypotenuse equals the sum of the squares of the other two sides:

$a^2 + b^2 = c^2$

Where:
- $a$ and $b$ are the legs
- $c$ is the hypotenuse

## Example Calculation

For the classic "3-4-5 triangle":

$c = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$

## More Complex Formulas

**Quadratic Formula:**
$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$

**Integral:**
$\\int_{0}^{\\infty} e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}$

> 💡 Math formulas are rendered using KaTeX, supporting most LaTeX mathematical syntax.`,

  typing: `# ⌨️ Typing Animation Demo

This text will be displayed character by character with typewriter effect...

## Control Features

1. **Enable/Disable Typing Effect** - Switch to static display mode
2. **Pause/Resume** - Pause and resume during typing process  
3. **Speed Control** - Adjust typing speed through interval property

### Use Cases

- 📄 **AI Conversation Interface** - Simulate real conversation experience
- 📝 **Online Documentation Display** - Add reading interest
- 🎬 **Animation Effect Display** - Attract user attention
- 📊 **Data Streaming Loading** - Real-time data change display

> ⚡ Typing animation supports multiple modes for smooth visual effects.`,

  theme: `# 🎨 Theme Demo

Current theme: **{{THEME}} mode**

## Supported Themes

1. **light** - Light theme, suitable for daytime use ☀️
2. **dark** - Dark theme, suitable for nighttime use 🌙

### Code Highlighting

\`\`\`javascript
const theme = 'dark';
if (theme === 'dark') {
    document.body.classList.add('dark-theme');
} else {
    document.body.classList.remove('dark-theme');
}
\`\`\`

> Both themes have perfect code highlighting support, ensuring good reading experience in any environment.`,

  streaming: `# 🌊 Streaming Data Demo

## Using MarkdownCMD Component

\`\`\`tsx
import React, { useRef } from 'react';
import { MarkdownCMD, MarkdownTyperCMDRef } from 'react-markdown-typer';

function StreamingDemo() {
  const markdownRef = useRef<MarkdownTyperCMDRef>(null);

  const handleStreaming = async () => {
    // Clear previous content
    markdownRef.current?.clear();
    
    // Simulate thinking process
    markdownRef.current?.push('🤔 Analyzing...', 'thinking');
    await delay(1000);
    
    // Stream content
    const chunks = [
      '# AI Assistant Answer\\n\\n',
      'Based on your question, let me provide a detailed answer:\\n\\n',
      '## Key Features\\n\\n',
      '- ⚡ **High Performance**: Based on optimized rendering engine\\n',
      '- 🎬 **Smooth Animation**: Support various typing effects\\n',
      '- 🎯 **Perfect Compatibility**: Support complete Markdown syntax\\n'
    ];
    
    for (const chunk of chunks) {
      await delay(100);
      markdownRef.current?.push(chunk, 'answer');
    }
  };

  return (
    <div>
      <button onClick={handleStreaming}>
        Start Streaming Demo
      </button>
      <MarkdownCMD 
        ref={markdownRef}
        interval={15}
        timerType="requestAnimationFrame"
      />
    </div>
  );
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
\`\`\`

## Core Features

- **Real-time Streaming Processing** - Support network streaming data
- **Thinking Mode** - Simulate AI thinking process
- **Interrupt Recovery** - Support pause and resume
- **Multiple Scenarios** - AI conversation, code generation, document generation

> 💡 Streaming demo perfectly simulates real AI conversation experience, supporting distinction between thinking process and answer content.`,
};

// 兼容性导出，默认使用中文
export const demoData = demoDataZh;
