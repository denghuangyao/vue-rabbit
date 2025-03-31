// import './assets/main.css'
import 'element-plus/theme-chalk/el-message.css'
import { createApp } from 'vue'
/* 引入createPinia，用于创建pinia */
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import "@/styles/common.scss";
import router from '@/router';
import { imgLazyPlugin } from "@/directives"
import componentPlugin from "@/components"
/* 创建pinia */
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(componentPlugin)
app.use(imgLazyPlugin)
app.use(router);
app.use(pinia);/* 使用插件 */
app.mount('#app')
