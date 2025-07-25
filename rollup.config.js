import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';

// 基础配置
const baseConfig = {
  input: 'src/index.tsx',
  external: ['react', 'react/jsx-runtime', 'react-dom', 'react-markdown'],
  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig-rollup.json',
      declaration: false,
      outDir: undefined,
    }),
  ],
};

// ESM 配置
const esmConfig = {
  ...baseConfig,
  output: {
    file: 'dist/esm/index.js',
    format: 'esm',
    sourcemap: true,
  },
  plugins: [...baseConfig.plugins],
};

// CJS 配置
const cjsConfig = {
  ...baseConfig,
  output: {
    file: 'dist/cjs/index.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [...baseConfig.plugins],
};

// 类型声明文件配置
const dtsConfig = {
  input: 'src/index.tsx',
  output: [
    {
      file: 'dist/esm/index.d.ts',
      format: 'esm',
    },
    {
      file: 'dist/cjs/index.d.ts',
      format: 'cjs',
    },
  ],
  plugins: [dts()],
};

export default defineConfig([esmConfig, cjsConfig, dtsConfig]);
