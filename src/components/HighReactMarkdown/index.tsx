import React, { useMemo } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import { IMarkdownMath } from '../../defined';
import { replaceMathBracket } from '../../utils/remarkMathBracket';

interface HighReactMarkdownProps {
  reactMarkdownProps?: Options;
  children: string;
  math?: IMarkdownMath;
}

const HighReactMarkdown: React.FC<HighReactMarkdownProps> = ({ reactMarkdownProps, children: _children, math }) => {
  const mathSplitSymbol = math?.splitSymbol ?? 'dollar';
  const children = useMemo(() => {
    /** 如果存在数学公式插件，并且数学公式分隔符为括号，则替换成 $ 符号 */
    if (mathSplitSymbol === 'bracket') {
      return replaceMathBracket(_children);
    }
    return _children;
  }, [mathSplitSymbol, _children]);
  return <ReactMarkdown {...reactMarkdownProps}>{children}</ReactMarkdown>;
};

export default HighReactMarkdown;
