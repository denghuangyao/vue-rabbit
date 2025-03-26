import { createRouter,createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
export default createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            component:Layout,
            children:[
                {
                    path:"",
                    component:Home
                },
                {
                    path:"/category/:id",
                    component:Category
                }
            ]
        },
        {
            path:"/login",
            component:Login
        },

    ]
});