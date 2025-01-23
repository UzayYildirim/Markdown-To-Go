import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {}
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      events: 'events',
      stream: 'stream-browserify',
      util: 'util'
    },
  },
  optimizeDeps: {
    include: ['html-to-docx'],
    esbuildOptions: {
      mainFields: ['module', 'main'],
      resolveExtensions: ['.js', '.jsx', '.ts', '.tsx'],
      format: 'esm'
    }
  },
  build: {
    rollupOptions: {
      output: {
        format: 'esm'
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true,
      requireReturnsDefault: 'namespace'
    }
  },
  define: {
    __VUE_PROD_DEVTOOLS__: false
  }
})

