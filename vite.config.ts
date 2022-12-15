import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api': {
<<<<<<< HEAD
        target: 'http://120.27.224.251:8080/api/',
=======
        target: 'http://127.0.0.1:8888/api/',
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
<<<<<<< HEAD
      "com": path.resolve(__dirname, "src/components"),
=======
      "com": path.resolve(__dirname, "src/components")
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7
    }
  },
  css: {
    //css预处理
    preprocessorOptions: {
      scss: {
        //引入varibles.scss全局预定义变量
        additionalData: `@import "./src/styles/variables.scss";`,
      }
    }
  },
<<<<<<< HEAD
  build: {
    chunkSizeWarningLimit: 1500
  },
=======
>>>>>>> 0dadb255e225e856db3b3bd2d57bdd0041cb78e7
  plugins: [
    vue(),
    viteCompression(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ]
})