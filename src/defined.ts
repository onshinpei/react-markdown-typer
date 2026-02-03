import { Options } from 'react-markdown';

export type IntervalType =
  | number
  | {
      /** Maximum interval */
      max: number;
      /** Minimum interval */
      min: number;
      /** Custom curve function */
      curveFn?: (x: number) => number;
      /** Curve function, if curveFn is configured, curve will be ignored */
      curve?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | 'step-start' | 'step-end';
    };

/**
 * Character interface
 */
export interface IChar {
  content: string;
  tokenId: number;
  /** Character index */
  index: number;
}

/**
 * Paragraph type
 * When paragraph type is br, it represents a line break
 * When paragraph type is text, it represents text
 */
export interface IParagraph {
  /** Paragraph content */
  content?: string;
  /** Whether it has been typed */
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

export interface MarkdownTyperBaseProps {
  reactMarkdownProps?: Options;
  /** Timer type: supports setTimeout and requestAnimationFrame */
  timerType?: 'setTimeout' | 'requestAnimationFrame';
  /** Typing animation interval time */
  interval: IntervalType;
  /** Whether to disable typing animation */
  disableTyping?: boolean;
  /** Callback after typing is complete */
  onEnd?: (data?: IEndData) => void;
  /** Callback when typing starts */
  onStart?: (data?: IOnTypedCharData) => void;
  /** Callback before typing a character */
  onBeforeTypedChar?: (data?: IBeforeTypedChar) => Promise<void>;
  /**
   * Callback after typing a character
   * @param char Character
   * @param index Character index
   */
  onTypedChar?: (data?: ITypedChar) => void;

  /** Whether to automatically start typing animation */
  autoStartTyping?: boolean;

  /** Custom function to convert markdown string */
  customConvertMarkdownString?: (markdownString: string) => string;

  /** Whether to show cursor during typing */
  showCursor?: boolean;

  /** Custom cursor, can be string or ReactNode, default is '|' */
  cursor?: React.ReactNode;

  /** Whether to show cursor when typing is paused, default is true */
  showCursorOnPause?: boolean;
}

export interface MarkdownTyperProps extends MarkdownTyperBaseProps {
  children: string | undefined;
}

/** MarkdownCMD component does not need children */
export interface MarkdownTyperCMDProps extends MarkdownTyperBaseProps {
  children?: undefined;
}

export interface IMarkdownPlugin {
  remarkPlugin?: unknown;
  rehypePlugin?: unknown;
  type: 'buildIn' | 'custom';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  id?: any;
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

/** Markdown component ref type */
export type MarkdownTyperRef = MarkdownBaseRef;

/** MarkdownCMD component ref type */
export interface MarkdownTyperCMDRef extends MarkdownBaseRef {
  push: (content: string) => void;
  clear: () => void;
  triggerWholeEnd: () => void;
}

export interface IEndData {
  manual: boolean;
  /** The string typed by the typewriter, same as answerStr */
  str: string;
}
