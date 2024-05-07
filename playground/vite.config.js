import { defineConfig } from 'vite'
import vue3 from '@vitejs/plugin-vue'
import vue3Jsx from '@vitejs/plugin-vue-jsx'
import * as vue3compiler from 'vue/compiler-sfc'
import vue2 from '@vitejs/plugin-vue2'
import vue2Jsx from '@vitejs/plugin-vue2-jsx'
import * as vue2compiler from 'vue2/compiler-sfc'
import { isVue2 } from 'vue-demi'
import { resolve as pathResolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// https://vitejs.dev/config/
const __dirname = fileURLToPath(new URL('.', import.meta.url))
const resolve = (str) => pathResolve(__dirname, str)
export default defineConfig({
  base: '/vue-fantable/',
  // build: {
  //   outDir: '../document'
  // },
  // host:true, // 表示可以通过 ip 进行访问
  resolve: {
    alias: {
      'vue-fantable': resolve('../'),
      // vue: isVue2 ? resolve('vue2') : resolve('vue'),
      '@': resolve('src'),
      '@C': resolve('src/components'),
      '@A': resolve('src/assets'),
      '@P': resolve('../packages')
    }
  },
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  server: {
    port: 7754,
    proxy: {
      '^/api/.*': {
        target: 'https://yourserver.com/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: isVue2
    ? [
      vue2({
        compiler: vue2compiler
      }),
      vue2Jsx()
    ]
    : [
      vue3({
        compiler: vue3compiler
      }),
      vue3Jsx()
    ]
})
