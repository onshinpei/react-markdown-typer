import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

// 语言切换组件 - 切换到中文
function LanguageSwitch() {
  const router = useRouter()
  const basePath = '/react-markdown-typer/en'
  const currentPath = router.asPath || router.pathname
  
  // 获取不包含 basePath 的路径
  let pathWithoutBase = currentPath
  if (currentPath.startsWith(basePath)) {
    pathWithoutBase = currentPath.slice(basePath.length) || '/'
  }
  
  const switchToZh = () => {
    // 切换到中文版本
    const zhPath = `/react-markdown-typer/zh${pathWithoutBase}`
    window.location.href = zhPath
  }

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
      <button
        onClick={switchToZh}
        style={{
          padding: '4px 8px',
          border: '1px solid var(--nextra-border-color)',
          borderRadius: '4px',
          background: 'transparent',
          color: 'var(--nextra-text-color)',
          cursor: 'pointer',
          fontSize: '14px',
        }}
      >
        中文
      </button>
      <span style={{ 
        padding: '4px 8px',
        background: 'var(--nextra-primary-color)',
        color: 'white',
        borderRadius: '4px',
        fontSize: '14px',
      }}>
        EN
      </span>
    </div>
  )
}

const config: DocsThemeConfig = {
  logo: <span>react-markdown-typer</span>,
  project: {
    link: 'https://github.com/onshinpei/react-markdown-typer',
  },
  docsRepositoryBase: 'https://github.com/onshinpei/react-markdown-typer/tree/main/nextra-docs-en',
  footer: {
    content: 'react-markdown-typer Documentation',
  },
  navbar: {
    extraContent: <LanguageSwitch />,
  },
}

export default config

