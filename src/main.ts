import { createApp } from 'vue'
import 'amfe-flexible/index.js'

import router from './router'

import piniaStore from './store';


import '@/style/global.scss'

// 初始化主题
import { initTheme } from '@/theme/index'
initTheme()

import App from './App.vue'

createApp(App).use(router).use(piniaStore).mount('#app')
