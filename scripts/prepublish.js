#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const RELEASE_MODE = !!process.env.RELEASE_MODE;

if (!RELEASE_MODE) {
  console.log('Run `npm run release` to publish the package');
  process.exit(1);
}

console.log('🔍 检查构建文件...');

// 检查必要的构建文件是否存在
const requiredFiles = ['es/index.js', 'es/index.d.ts'];

const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));

if (missingFiles.length > 0) {
  console.error('❌ 缺少以下构建文件:');
  missingFiles.forEach((file) => console.error(`  - ${file}`));
  console.error('\n请先运行 npm run build:lib');
  process.exit(1);
}

console.log('✅ 所有构建文件都存在');

// 检查package.json中的入口点
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const entryPoints = [packageJson.main, packageJson.module, packageJson.types].filter(Boolean);

console.log('📦 检查入口点文件...');
const missingEntryPoints = entryPoints.filter((file) => !fs.existsSync(file));

if (missingEntryPoints.length > 0) {
  console.error('❌ 缺少以下入口点文件:');
  missingEntryPoints.forEach((file) => console.error(`  - ${file}`));
  process.exit(1);
}

console.log('✅ 所有入口点文件都存在');
console.log('🚀 准备发布...');
