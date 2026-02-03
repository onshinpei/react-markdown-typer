import nextra from 'nextra';

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

export default withNextra({
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/react-markdown-typer/zh',
  assetPrefix: '/react-markdown-typer/zh',
});

