/// <reference types="vite/client" />
// 让.ts文件可以.vue文件类型，以免vscode报错
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
  }
  