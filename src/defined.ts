import { Options } from 'react-markdown';

export type IntervalType =
  | number
  | {
      /** 最大间隔 */
      max: number;
      /** 最小间隔 */
      min: number;
      /** 曲线函数自定义 */
      curveFn?: (x: number) => number;
      /** 曲线函数，如果配置了curveFn，则curve无效 */
      curve?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end';
    };

/**
 * 字符接口
 */
export interface IChar {
  content: string;
  tokenId: number;
  /** 字符索引 */
  index: number;
}

/**
 * 段落类型
 * 段落类型为br时，表示换行
 * 段落类型为text时，表示文本
 */
export interface IParagraph {
  /** 段落内容 */
  content?: string;
  /** 是否已打字 */
  isTyped: boolean;
}

export interface ITokensReference {
  startIndex: number;
  raw: string;
}

export interface IOnTypedCharData {
  currentIndex: number;
  currentChar: string;
  prevStr: string;
}

export interface ITypedChar extends IOnTypedCharData {
  percent: number;
  currentStr: string;
}

export interface IBeforeTypedChar extends IOnTypedCharData {
  percent: number;
}

export interface MarkdownBaseProps {
  reactMarkdownProps?: Options;
  /** 计时类型： 支持setTimeout和requestAnimationFrame */
  timerType?: 'setTimeout' | 'requestAnimationFrame';
  /** 打字机效果间隔时间 */
  interval: IntervalType;
  /** 是否关闭打字机效果 */
  disableTyping?: boolean;
  /** 打字完成后回调,  */
  onEnd?: (data?: IEndData) => void;
  /** 开始打字回调 */
  onStart?: (data?: IOnTypedCharData) => void;
  /** 打字前回调 */
  onBeforeTypedChar?: (data?: IBeforeTypedChar) => Promise<void>;
  /**
   * 打字机打完一个字符回调
   * @param char 字符
   * @param index 字符索引
   */
  onTypedChar?: (data?: ITypedChar) => void;

  /** 是否自动开启打字动画 */
  autoStartTyping?: boolean;

  /** 自定义转换markdown string 函数 */
  customConvertMarkdownString?: (markdownString: string) => string;
}

export interface MarkdownProps extends MarkdownBaseProps {
  children: string | undefined;
}

/**  MarkdownCMD 组件不需要 children */
export interface MarkdownCMDProps extends MarkdownBaseProps {
  children?: undefined;
}

export interface IMarkdownPlugin {
  remarkPlugin?: unknown;
  rehypePlugin?: unknown;
  type: 'buildIn' | 'custom';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id?: any;
}

export interface IMarkdownMath {
  /** 是括号还是$作为分隔符, 默认是$ */
  splitSymbol: 'bracket' | 'dollar';
}

export interface IWholeContent {
  content: string;
  length: number;
  prevLength: number;
}

export interface MarkdownBaseRef {
  stop: () => void;
  resume: () => void;
  start: () => void;
  restart: () => void;
}

/** Markdown 组件的ref 类型 */
export type MarkdownRef = MarkdownBaseRef;

/** MarkdownCMD 组件的 ref 类型 */
export interface MarkdownCMDRef extends MarkdownBaseRef {
  push: (content: string) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}

export interface IEndData {
  manual: boolean;
  /** 打字机打过的字符串, 和answerStr 相同 */
  str: string;
}
