import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (content) =>
          `@import "${path.resolve('./src/styles/variables').replace(/\\/g, '/')}";${content}`,
      },
    },
  },
})
