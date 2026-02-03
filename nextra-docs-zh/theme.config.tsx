import React from 'react';
import { DocsThemeConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';

const config: DocsThemeConfig = {
  logo: <span>react-markdown-typer</span>,
  project: {
    link: 'https://github.com/onshinpei/react-markdown-typer',
  },
  docsRepositoryBase: 'https://github.com/onshinpei/react-markdown-typer/tree/main/nextra-docs-zh',
  footer: {
    text: 'react-markdown-typer 文档',
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  search: {
    placeholder: '搜索文档...',
  },
  editLink: {
    text: '在 GitHub 上编辑此页',
  },
  feedback: {
    content: '问题反馈？给我们反馈 →',
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
      
      let enUrl: string;
      
      if (isDev) {
        // 开发环境：使用相对路径
        enUrl = router.asPath;
      } else {
        // 生产环境：router.asPath 不包含 basePath，需要手动添加
        // 例如：router.asPath = '/examples/cursor'
        // 需要转换为：'/react-markdown-typer/en/examples/cursor'
        enUrl = `/react-markdown-typer/en${router.asPath}`;
      }
      
      return (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <a
            href={enUrl}
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
            English
          </a>
        </div>
      );
    },
  },
};

export default config;

