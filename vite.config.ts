import { defineConfig } from 'vite'
import { resolve } from 'path'  // path模块是node.js内置的功能，但是node.js本身并不支持typescript,需要npm install @types/node --save-dev


import { createVitePlugins } from './build/vite/plugins/index';


function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // 服务配置
    port: 9999, // 类型： number 指定服务器端口;
    open: true, // 类型： boolean | string在服务器启动时自动在浏览器中打开应用程序；
    cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
    proxy: {
      '/dev-api': {
        target: 'http://47.99.134.126:7008',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev-api/, '')
      },
      '/prod-api': {
        target: 'http://47.99.134.126:7008',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/prod-api/, '')
      }
    }
  },
  resolve: {
    // 设置别名，需要在tsconfig.json也设置，否则vscode识别不出来
    alias: {
      '@': resolve(__dirname, 'src'),
      '@view': resolve(__dirname, 'view'),

    }
  },
  plugins: createVitePlugins(),
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/style/variables.scss";'
      }
    },
  },
})
