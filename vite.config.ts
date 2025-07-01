import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-markdown-typer/',
  build: {
    sourcemap: false, // 或 'inline',
    outDir: 'dev',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('development'),
  },
});
