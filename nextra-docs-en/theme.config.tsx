import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

const config: DocsThemeConfig = {
  logo: <span>react-markdown-typer</span>,
  project: {
    link: 'https://github.com/onshinpei/react-markdown-typer',
  },
  docsRepositoryBase: 'https://github.com/onshinpei/react-markdown-typer/tree/main/nextra-docs-en',
  footer: {
    text: 'react-markdown-typer Documentation',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  search: {
    placeholder: 'Search documentation...',
  },
  editLink: {
    text: 'Edit this page on GitHub',
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback',
  },
  i18n: [
    { locale: 'zh', text: '中文' },
    { locale: 'en', text: 'English' },
  ],
  useNextSeoProps() {
    return {
      titleTemplate: '%s – react-markdown-typer',
    };
  },
  navbar: {
    extraContent: () => {
      const router = useRouter();
      const isDev = process.env.NODE_ENV === 'development';
      
      let zhUrl: string;
      
      if (isDev) {
        // 开发环境：使用相对路径
        zhUrl = router.asPath;
      } else {
        // 生产环境：router.asPath 不包含 basePath，需要手动添加
        // 例如：router.asPath = '/examples/cursor'
        // 需要转换为：'/react-markdown-typer/zh/examples/cursor'
        zhUrl = `/react-markdown-typer/zh${router.asPath}`;
      }
      
      return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a
            href={zhUrl}
            style={{
              padding: '4px 8px',
              border: '1px solid var(--nextra-border-color)',
              borderRadius: '4px',
              background: 'transparent',
              color: 'var(--nextra-text-color)',
              cursor: 'pointer',
              fontSize: '14px',
              textDecoration: 'none',
            }}
          >
            中文
          </a>
        </div>
      );
    },
  },
};

export default config;

