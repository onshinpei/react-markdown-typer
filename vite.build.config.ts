import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      name: 'MyLib', // 你的库名
      fileName: (format) => `my-lib.${format}.js`,
      formats: ['es', 'cjs'], // 输出格式
    },
    rollupOptions: {
      // 确保外部化处理你不想打包进库的依赖
      external: ['react', 'react-dom', 'remark-gfm', 'react-markdown', 'react-syntax-highlighter'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
})
