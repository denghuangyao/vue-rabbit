// import './assets/main.css'
import { createApp } from 'vue'
/* 引入createPinia，用于创建pinia */
import { createPinia } from 'pinia'
import App from './App.vue'
import "@/styles/common.scss";
import router from '@/router';
/* 创建pinia */
const pinia = createPinia()
const app = createApp(App);
app.use(router);
app.use(pinia);/* 使用插件 */
app.mount('#app')
