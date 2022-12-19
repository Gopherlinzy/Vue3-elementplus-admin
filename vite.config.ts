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
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'http://120.27.224.251:8080/api/',
        target: 'http://localhost:8888/api/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "com": path.resolve(__dirname, "src/components"),
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
  build: {
    chunkSizeWarningLimit: 1500,
    // Terser 相对较慢，但大多数情况下构建后的文件体积更小。ESbuild 最小化混淆更快但构建后 的文件相对更大。 
    // 设置为 false 可以禁用最小化混淆，或是用来指定使用哪种混淆器。默认为 Esbuild，它比 terser 快 20-40 倍，压缩率只差 1%-2%。
    minify: 'terser',
    terserOptions: {
      compress: { // 生产环境去除console 
        drop_console: true
      }
    }
  },
  plugins: [
    //配置自动导入element start
    viteCompression(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    //配置自动导入element end
    vue(),
  ],

})