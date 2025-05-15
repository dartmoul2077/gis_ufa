import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
    build: {
    assetsInlineLimit: 4096, // 4KB - файлы меньше этого размера инлайнятся
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]', // Четкая структура ассетов
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js'
      }
    },
    emptyOutDir: true // Очищает папку dist перед сборкой
  },
  base: './' // Критически важно для Electron!
})
