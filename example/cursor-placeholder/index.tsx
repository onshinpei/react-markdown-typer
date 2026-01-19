import React, { useEffect, useRef } from 'react';
import { MarkdownTyperCMD, MarkdownTyperCMDRef } from '../../src';

/**
 * 占位符 rehype 插件模式示例
 * 使用内置的 rehype 插件自动处理光标渲染 - 零配置！
 */
const CursorPlaceholderDemo: React.FC = () => {
  const cmdRef1 = useRef<MarkdownTyperCMDRef>(null!);
  const cmdRef2 = useRef<MarkdownTyperCMDRef>(null!);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) {
      return;
    }
    mountedRef.current = true;

    async function pushData() {
      const text1 = '# rehype 插件模式\n\n这是使用**内置 rehype 插件**的光标演示。\n\n✅ **零配置** - 自动处理！';
      const text2 = '# 自定义光标\n\n在这个示例中，光标是一个**绿色的方块**，带有自定义动画。\n\n只需传入 ReactNode，插件会自动处理渲染！';

      // 模拟流式输出
      const pushText = async (ref: React.RefObject<MarkdownTyperCMDRef>, text: string) => {
        const chars = text.split('');
        for (const char of chars) {
          await new Promise((resolve) => setTimeout(resolve, 30));
          ref.current?.push(char);
        }
      };

      await Promise.all([
        pushText(cmdRef1, text1),
        pushText(cmdRef2, text2),
      ]);
    }

    pushData();
  }, []);

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>光标 rehype 插件模式示例</h1>
      <p>使用 <code>useCursorPlaceholder={`{true}`}</code> - 内置 rehype 插件自动处理，零配置！</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '30px' }}>
        {/* 示例 1: 字符串光标 - 零配置 */}
        <div>
          <h3>字符串光标（零配置）</h3>
          <div style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: '#f9f9f9',
            minHeight: '200px'
          }}>
            <MarkdownTyperCMD 
              ref={cmdRef1} 
              interval={50}
              showCursor={true}
              cursor="|"  // 字符串光标 - rehype 插件自动处理！
            />
          </div>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            ✅ 无需配置 components，插件自动处理
          </p>
        </div>

        {/* 示例 2: ReactNode 光标 - 零配置 */}
        <div>
          <h3>ReactNode 光标（零配置）</h3>
          <div style={{ 
            border: '1px solid #e0e0e0', 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: '#f9f9f9',
            minHeight: '200px'
          }}>
            <MarkdownTyperCMD 
              ref={cmdRef2} 
              interval={50}
              showCursor={true}
              cursor={
                // 直接传入 ReactNode - rehype 插件自动处理！
                <span className="custom-cursor">
                  ▋
                  <style>{`
                    .custom-cursor {
                      display: inline-block;
                      color: #00ff00;
                      font-weight: bold;
                      animation: custom-cursor-blink 0.6s step-end infinite;
                    }
                    @keyframes custom-cursor-blink {
                      0%, 50% { opacity: 1; }
                      51%, 100% { opacity: 0; }
                    }
                  `}</style>
                </span>
              }
            />
          </div>
          <p style={{ marginTop: '10px', fontSize: '14px', color: '#666' }}>
            ✅ ReactNode 也是零配置，插件自动渲染
          </p>
        </div>
      </div>

      <div style={{ marginTop: '40px', padding: '20px', backgroundColor: '#e3f2fd', borderRadius: '8px' }}>
        <h3>💡 rehype 插件模式的优势</h3>
        <ul>
          <li>✅ **零配置** - 自动处理一切！</li>
          <li>✅ 光标始终紧跟在文本后（即使是块级元素）</li>
          <li>✅ 支持字符串和 ReactNode</li>
          <li>✅ 可以与其他 rehype 插件完美配合</li>
          <li>✅ 不需要手动配置 components</li>
        </ul>
        
        <h4>实现原理</h4>
        <p>库在 markdown 末尾添加 <code>`___CURSOR___`</code>，内置的 <strong>rehype 插件</strong>会自动在 HTML AST 中找到并替换为你的光标。</p>
      </div>

      <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#c8e6c9', borderRadius: '8px' }}>
        <h3>🎉 完全自动化</h3>
        <p>使用 rehype 插件模式时，<strong>无需任何配置</strong>！</p>
        <p>只需要：</p>
        <pre style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
{`<MarkdownTyperCMD 
  showCursor={true}
  cursor="|"  // 或者 cursor={<YourComponent />}
/>`}
        </pre>
        <p style={{ marginTop: '10px' }}>插件会自动处理一切！✨</p>
      </div>
    </div>
  );
};

export default CursorPlaceholderDemo;

