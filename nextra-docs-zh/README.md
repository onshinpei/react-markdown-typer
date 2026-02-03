# react-markdown-typer 中文文档

这是 react-markdown-typer 的中文文档站点，使用 Nextra 构建。

## 开发

```bash
npm install
npm run dev
```

访问 http://localhost:3000 查看文档。

**同时运行中英文文档**：

```bash
# 终端 1：中文文档（端口 3000）
cd nextra-docs-zh
npm run dev

# 终端 2：英文文档（端口 3001）
cd nextra-docs-en
npm run dev
```

这样可以在开发环境测试语言切换功能。

## 构建

```bash
npm run build
```

构建后的静态文件在 `out/` 目录。

