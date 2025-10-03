import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { __DEV__ } from '../constant';
import { MarkdownTyperCMDRef, MarkdownTyperProps, MarkdownTyperRef } from '../defined';
import MarkdownCMD from '../MarkdownCMD';

interface MarkdownTyperInnerProps extends MarkdownTyperProps {
  markdownRef: React.ForwardedRef<MarkdownTyperRef>;
}

const MarkdownTyperInner: React.FC<MarkdownTyperInnerProps> = ({ children: _children = '', markdownRef, ...rest }) => {
  const cmdRef = useRef<MarkdownTyperCMDRef>(null!);
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
    return () => {
      console.log('unmount');
    };
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

const MarkdownTyper = forwardRef<MarkdownTyperRef, MarkdownTyperProps>((props, ref) => {
  const { children = '' } = props;

  if (__DEV__) {
    if (typeof children !== 'string') {
      throw new Error('Markdown component must have a string child');
    }
  }

  return <MarkdownTyperInner {...props} markdownRef={ref} />;
});

export default memo(MarkdownTyper);
