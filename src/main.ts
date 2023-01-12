import { createApp } from 'vue'
import 'amfe-flexible/index.js'

import router from './router'


import '@/style/global.scss'

import App from './App.vue'

createApp(App).use(router).mount('#app')
