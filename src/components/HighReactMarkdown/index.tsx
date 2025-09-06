import React, { useMemo } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';

interface HighReactMarkdownProps {
  reactMarkdownProps?: Options;
  children: string;
}

const HighReactMarkdown: React.FC<HighReactMarkdownProps> = ({ reactMarkdownProps, children }) => {
  return <ReactMarkdown {...reactMarkdownProps}>{children}</ReactMarkdown>;
};

export default HighReactMarkdown;
