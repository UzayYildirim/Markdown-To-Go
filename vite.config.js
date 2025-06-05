import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue({
            template: {
                compilerOptions: {}
            }
        })
    ],
    // Cloudflare Pages configuration
    base: '/',
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    build: {
        // Optimized for Cloudflare Pages
        outDir: 'dist',
        sourcemap: false,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        },
        rollupOptions: {
            output: {
                format: 'esm',
                manualChunks: {
                    vendor: ['vue', 'vue-router', 'pinia'],
                    markdown: ['marked', 'dompurify']
                }
            }
        }
    },
    define: {
        __VUE_PROD_DEVTOOLS__: false
    }
});
