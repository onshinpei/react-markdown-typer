// API Data Definitions - English Version
export interface ApiProperty {
  prop: string;
  type: string;
  description: string;
  defaultValue: string;
}

export interface RefMethod {
  method: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  requestAnimationFrame: string;
  setTimeout: string;
}

export interface FormulaType {
  type: string;
  inline: string;
  block: string;
  example: string;
}

// Props Properties Data
export const propsData: ApiProperty[] = [
  {
    prop: 'interval',
    type: 'number',
    description: 'Typing interval (milliseconds)',
    defaultValue: '30',
  },
  {
    prop: 'timerType',
    type: "'setTimeout' | 'requestAnimationFrame'",
    description: 'Timer type, recommend using requestAnimationFrame. Does not support dynamic modification',
    defaultValue: "'setTimeout'",
  },
  {
    prop: 'disableTyping',
    type: 'boolean',
    description: 'Disable typing animation, shows all content immediately when set to true',
    defaultValue: 'false',
  },
  {
    prop: 'math',
    type: 'IMarkdownMath',
    description: 'Math formula configuration, supports KaTeX rendering',
    defaultValue: "{ splitSymbol: 'dollar' }",
  },
  {
    prop: 'onStart',
    type: '(data: StartData) => void',
    description: 'Callback function when typing starts',
    defaultValue: 'undefined',
  },
  {
    prop: 'onEnd',
    type: '(data: EndData) => void',
    description: 'Callback function when typing ends',
    defaultValue: 'undefined',
  },
  {
    prop: 'onBeforeTypedChar',
    type: '(data: IBeforeTypedChar) => Promise<void>',
    description: 'Callback function before typing each character, supports async operations, blocks subsequent typing',
    defaultValue: 'undefined',
  },
  {
    prop: 'onTypedChar',
    type: '(data: ITypedChar) => void',
    description: 'Callback function after typing each character',
    defaultValue: 'undefined',
  },
  {
    prop: 'autoStartTyping',
    type: 'boolean',
    description: 'Whether to auto start typing animation, requires manual trigger when set to false, does not support dynamic modification',
    defaultValue: 'true',
  },
];

// ReactMarkdownTyper Ref Methods
export const dsMarkdownMethods: RefMethod[] = [
  {
    method: 'start()',
    description: 'Start typing animation, manually trigger animation start',
  },
  {
    method: 'stop()',
    description: 'Pause typing animation, can be called during typing process',
  },
  {
    method: 'resume()',
    description: 'Resume typing animation, used together with stop()',
  },
  {
    method: 'restart()',
    description: 'Restart typing animation, play current content from the beginning',
  },
];

// MarkdownCMD Ref Methods
export const markdownCMDMethods: RefMethod[] = [
  {
    method: 'push(content)',
    description: 'Add content and start typing, supports streaming data',
  },
  {
    method: 'clear()',
    description: 'Clear all content and state, reset component',
  },
  {
    method: 'triggerWholeEnd()',
    description: 'Manually trigger completion callback',
  },
  {
    method: 'start()',
    description: 'Start typing animation, manually trigger animation start',
  },
  {
    method: 'stop()',
    description: 'Pause typing animation',
  },
  {
    method: 'resume()',
    description: 'Resume typing animation',
  },
  {
    method: 'restart()',
    description: 'Restart typing animation, play current content from the beginning',
  },
];

// ITypedChar Type Definition
export const iTypedCharData: ApiProperty[] = [
  {
    prop: 'currentIndex',
    type: 'number',
    description: 'Index of current character in the entire string',
    defaultValue: '0',
  },
  {
    prop: 'currentChar',
    type: 'string',
    description: 'Current typed character',
    defaultValue: '-',
  },
  {
    prop: 'prevStr',
    type: 'string',
    description: 'Prefix string of current type content',
    defaultValue: '-',
  },
  {
    prop: 'currentStr',
    type: 'string',
    description: 'Complete string of current type content',
    defaultValue: '-',
  },
  {
    prop: 'percent',
    type: 'number',
    description: 'Typing progress percentage (0-100)',
    defaultValue: '0',
  },
];

// IBeforeTypedChar Type Definition
export const iBeforeTypedCharData: ApiProperty[] = [
  {
    prop: 'currentIndex',
    type: 'number',
    description: 'Index of current character in the entire string',
    defaultValue: '0',
  },
  {
    prop: 'currentChar',
    type: 'string',
    description: 'Character about to be typed',
    defaultValue: '-',
  },
  {
    prop: 'prevStr',
    type: 'string',
    description: 'Prefix string of current type content',
    defaultValue: '-',
  },
  {
    prop: 'percent',
    type: 'number',
    description: 'Typing progress percentage (0-100)',
    defaultValue: '0',
  },
];

// IMarkdownMath Type Definition
export const iMarkdownMathData: ApiProperty[] = [
  {
    prop: 'splitSymbol',
    type: "'dollar' | 'bracket'",
    description: 'Math formula delimiter type',
    defaultValue: "'dollar'",
  },
];

// IMarkdownPlugin Type Definition
export const iMarkdownPluginData: ApiProperty[] = [
  {
    prop: 'remarkPlugin',
    type: 'unknown',
    description: 'remark plugin instance',
    defaultValue: '-',
  },
  {
    prop: 'rehypePlugin',
    type: 'unknown',
    description: 'rehype plugin instance',
    defaultValue: '-',
  },
  {
    prop: 'type',
    type: "'buildIn' | 'custom'",
    description: 'Plugin type, built-in or custom',
    defaultValue: '-',
  },
  {
    prop: 'id',
    type: 'any',
    description: 'Plugin unique identifier',
    defaultValue: '-',
  },
];

// Timer Mode Comparison Data
export const timerComparisonData: ComparisonRow[] = [
  {
    feature: 'Character Processing',
    requestAnimationFrame: 'Multiple characters per frame',
    setTimeout: 'One character per call',
  },
  {
    feature: 'High-frequency Interval',
    requestAnimationFrame: '✅ Excellent (5ms → 3 chars per frame)',
    setTimeout: '❌ May stutter',
  },
  {
    feature: 'Low-frequency Interval',
    requestAnimationFrame: '✅ Normal (100ms → 1 char after 6 frames)',
    setTimeout: '✅ Precise',
  },
  {
    feature: 'Visual Effect',
    requestAnimationFrame: '🎬 Smooth animation',
    setTimeout: '⚡ Precise rhythm',
  },
  {
    feature: 'Performance Cost',
    requestAnimationFrame: '🟢 Low (frame sync)',
    setTimeout: '🟡 Medium (timer)',
  },
  {
    feature: 'Recommended Scenarios',
    requestAnimationFrame: 'Modern web apps, AI conversations, high-frequency typing',
    setTimeout: 'High compatibility requirements, retro effects',
  },
];

// Math Formula Delimiter Data
export const formulaTypesData: FormulaType[] = [
  {
    type: "'dollar'",
    inline: '$...$',
    block: '$$...$$',
    example: '$E = mc^2$',
  },
  {
    type: "'bracket'",
    inline: '\\(...\\)',
    block: '\\[...\\]',
    example: '\\(a + b = c\\)',
  },
];

// Best Practice Recommendations
export const bestPractices = [
  {
    title: 'Performance Optimization',
    description: 'Recommend using requestAnimationFrame mode with interval set to 15-30ms',
  },
  {
    title: 'Streaming Data',
    description: 'Use MarkdownCMD imperative API to handle streaming data, avoid frequent children updates',
  },
  {
    title: 'Math Formulas',
    description: "Import 'react-markdown-typer/katex.css' style file on demand",
  },
  {
    title: 'Type Safety',
    description: 'Use TypeScript for complete type hints and checking',
  },
  {
    title: 'Plugin Usage',
    description: 'Configure plugin order properly to ensure no conflicts between plugins',
  },
];
