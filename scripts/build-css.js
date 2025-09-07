import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 检查是否安装了less
let less;
try {
  less = await import('less');
} catch (error) {
  console.error('❌ Error: less package is not installed. Please install it first:');
  console.error('npm install --save-dev less');
  process.exit(1);
}

// 读取文件内容
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}:`, error.message);
    return '';
  }
}

// 处理@import语句并合并文件
async function processImports(cssContent, baseDir) {
  const importRegex = /@import\s+['"]([^'"]+)['"];?/g;
  let result = cssContent;
  let match;

  while ((match = importRegex.exec(cssContent)) !== null) {
    const importPath = match[1];
    const fullPath = path.resolve(baseDir, importPath);

    if (fs.existsSync(fullPath)) {
      const importedContent = readFile(fullPath);
      // 递归处理导入文件中的@import
      const processedContent = await processImports(importedContent, path.dirname(fullPath));
      result = result.replace(match[0], processedContent);
    } else {
      console.warn(`Warning: Import file not found: ${fullPath}`);
    }
  }

  return result;
}

// 编译LESS内容
async function compileLess(lessContent) {
  try {
    const result = await less.default.render(lessContent, {
      compress: false,
      sourceMap: false,
    });
    return result.css;
  } catch (error) {
    console.error('❌ LESS compilation error:', error.message);
    throw error;
  }
}

// 主函数
async function buildCss() {
  const srcDir = path.join(__dirname, '../src');
  const distDir = path.join(__dirname, '../dist');
  const styleLessPath = path.join(srcDir, 'style.less');

  // 确保dist目录存在
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // 读取主样式文件
  const mainContent = readFile(styleLessPath);

  // 处理所有@import并合并
  const mergedContent = await processImports(mainContent, srcDir);

  // 编译LESS语法
  const compiledCss = await compileLess(mergedContent);

  // 写入输出文件
  const outputPath = path.join(distDir, 'style.css');
  fs.writeFileSync(outputPath, compiledCss);

  console.log(`✅ LESS files compiled and merged successfully to ${outputPath}`);
}

buildCss().catch((error) => {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
});
