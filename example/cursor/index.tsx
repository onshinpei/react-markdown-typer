import React, { useEffect, useRef } from 'react';
import { MarkdownTyperCMD, MarkdownTyperCMDRef } from '../../src';
import data from './data.json';

/**
 * 光标效果示例
 * 使用 rehype 插件自动渲染光标 - 零配置！
 */
const CursorDemo: React.FC = () => {
  const cmdRef1 = useRef<MarkdownTyperCMDRef>(null!);
  const cmdRef2 = useRef<MarkdownTyperCMDRef>(null!);
  const cmdRef3 = useRef<MarkdownTyperCMDRef>(null!);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) {
      return;
    }
    mountedRef.current = true;

    async function pushData() {
      const text1 = `# 字符串光标\n\n使用简单字符串 ${data.description} 作为光标。\n\n✨ `;
      const text2 = `# ReactNode 光标\n\n自定义 React 组件作为光标。\n\n✨ ${data.description}`;
      const text3 = `# 方块光标\n\n使用 ${data.description} 字符作为光标。\n\n✨ ${data.description}`;

      cmdRef1.current.push(text1);
      cmdRef2.current.push(text2);
      cmdRef3.current.push(text3);
    }

    pushData();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>光标效果示例</h1>
      <p>使用内置的 <strong>rehype 插件</strong>自动处理光标渲染 - 零配置！</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginTop: '30px' }}>
        {/* 示例 1: 简单字符串光标 */}
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}>
          <MarkdownTyperCMD 
            ref={cmdRef1} 
            interval={50}
            showCursor={true}
            cursor="|"
          />
        </div>

        {/* 示例 2: ReactNode 光标 */}
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}>
          <MarkdownTyperCMD 
            ref={cmdRef2} 
            interval={50}
            showCursor={true}
            cursor={
              <span style={{ 
                color: '#007acc',
                fontWeight: 'bold',
                animation: 'blink 1s step-end infinite'
              }}>
                |
                <style>{`
                  @keyframes blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                  }
                `}</style>
              </span>
            }
          />
        </div>

        {/* 示例 3: 自定义字符光标 */}
        <div style={{ 
          border: '1px solid #e0e0e0', 
          borderRadius: '8px', 
          padding: '20px',
          backgroundColor: '#f9f9f9',
        }}>
          <MarkdownTyperCMD 
            ref={cmdRef3} 
            interval={50}
            showCursor={true}
            cursor="▋"
          />
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h3>✨ rehype 插件模式</h3>
        <p>使用内置的 rehype 插件自动处理光标：</p>
        <ul>
          <li>✅ **零配置** - 自动处理占位符</li>
          <li>✅ **字符串光标** - 直接传入字符</li>
          <li>✅ **ReactNode 光标** - 传入自定义组件</li>
          <li>✅ **光标紧跟** - 始终跟随文本</li>
        </ul>
        <p style={{ marginTop: '10px' }}>
          查看 <a href="https://github.com/onshinpei/react-markdown-typer/blob/main/REHYPE_CURSOR.md" target="_blank">REHYPE_CURSOR.md</a> 了解实现原理。
        </p>
      </div>
    </div>
  );
};

export default CursorDemo;

