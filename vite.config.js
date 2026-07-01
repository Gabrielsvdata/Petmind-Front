import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [path.resolve('./src/styles')],
        additionalData: `@use 'sass:color';\n@use 'variables' as *;\n`,
      },
    },
  },
})
