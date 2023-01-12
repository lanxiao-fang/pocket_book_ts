import { defineConfig } from 'vite'
import { resolve } from 'path'  // path模块是node.js内置的功能，但是node.js本身并不支持typescript,需要npm install @types/node --save-dev


import { createVitePlugins } from './build/vite/plugins/index';


function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
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
