import React, { forwardRef, memo, useEffect, useImperativeHandle, useMemo, useRef } from 'react';
import { __DEV__ } from '../constant';
import { MarkdownTyperCMDRef, MarkdownTyperProps, MarkdownTyperRef } from '../defined';
import MarkdownTyperCMD from '../MarkdownTyperCMD';

interface MarkdownTyperInnerProps extends MarkdownTyperProps {
  markdownRef: React.ForwardedRef<MarkdownTyperRef>;
}

function getLongestCommonPrefixLength(a: string, b: string): number {
  const minLen = Math.min(a.length, b.length);
  let i = 0;
  while (i < minLen && a[i] === b[i]) {
    i += 1;
  }
  return i;
}

const MarkdownTyperInner: React.FC<MarkdownTyperInnerProps> = ({ children: _children = '', markdownRef, ...rest }) => {
  const cmdRef = useRef<MarkdownTyperCMDRef>(null!);
  const prefixRef = useRef('');
  const { experimentalIncrementalRender = false } = rest;
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
          if (experimentalIncrementalRender) {
            const lcpLen = getLongestCommonPrefixLength(prefixRef.current, content);
            const sharedPrefix = content.slice(0, lcpLen);
            cmdRef.current.setContent(sharedPrefix);
            newContent = content.slice(lcpLen);
          } else {
            newContent = content;
            cmdRef.current.clear();
          }
        }
      }
      cmdRef.current.push(newContent);
      prefixRef.current = content;
    }
  }, [content, experimentalIncrementalRender]);

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

  return <MarkdownTyperCMD ref={cmdRef} {...rest} />;
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
