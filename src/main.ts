// import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import "@/styles/common.scss";
import router from '@/router';
import { getCategoryAPI } from '@/apis/testAPI';
getCategoryAPI().then((res:any)=>{
    console.log("-res-",res)
})
const app = createApp(App);
app.use(router);
app.mount('#app')
