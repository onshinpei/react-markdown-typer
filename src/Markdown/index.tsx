import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { __DEV__ } from '../constant';
import { MarkdownCMDRef, MarkdownProps, MarkdownRef } from '../defined';
import MarkdownCMD from '../MarkdownCMD';

interface MarkdownInnerProps extends MarkdownProps {
  markdownRef: React.ForwardedRef<MarkdownRef>;
}

const MarkdownInner: React.FC<MarkdownInnerProps> = ({ children: _children = '', markdownRef, ...rest }) => {
  const cmdRef = useRef<MarkdownCMDRef>(null!);
  const prefixRef = useRef('');
  const content = useMemo(() => {
    if (typeof _children === 'string') {
      return _children;
    }
    if (__DEV__) {
      console.error('Markdown component must have a string child');
    }
    return '';
  }, [_children]);

  useEffect(() => {
    if (prefixRef.current !== content) {
      let newContent = '';
      if (prefixRef.current === '') {
        newContent = content;
      } else {
        if (content.startsWith(prefixRef.current)) {
          newContent = content.slice(prefixRef.current.length);
        } else {
          newContent = content;
          cmdRef.current.clear();
        }
      }
      cmdRef.current.push(newContent);
      prefixRef.current = content;
    }
  }, [content]);

  useImperativeHandle(markdownRef, () => ({
    stop: () => {
      cmdRef.current.stop();
    },
    resume: () => {
      cmdRef.current.resume();
    },
    start: () => {
      cmdRef.current.start();
    },
    restart: () => {
      cmdRef.current.restart();
    },
  }));

  return <MarkdownCMD ref={cmdRef} {...rest} />;
};

const Markdown = forwardRef<MarkdownRef, MarkdownProps>((props, ref) => {
  const { children = '' } = props;

  if (__DEV__) {
    if (typeof children !== 'string') {
      throw new Error('Markdown component must have a string child');
    }
  }

  return <MarkdownInner {...props} markdownRef={ref} />;
});

export default memo(Markdown);
