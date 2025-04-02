import { createRouter,createWebHistory } from "vue-router";
import Layout from "@/views/Layout/index.vue";
import Login from "@/views/Login/index.vue";
import Home from "@/views/Home/index.vue";
import Category from "@/views/Category/index.vue";
import SubCategory from "@/views/SubCategory/index.vue";
import Detail from "@/views/Detail/index.vue";
import CartList from "@/views/CartList/index.vue";
import Checkout from "@/views/Checkout/index.vue";
import Pay from "@/views/Pay/index.vue";
import PayBack from "@/views/Pay/PayBack.vue"
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
                },
                {
                    path:"/category/sub/:id",
                    component:SubCategory
                },
                {
                    path:"/detail/:id",
                    component:Detail
                },
                {
                    path:"/cartlist",
                    component:CartList
                },
                {
                    path:"/checkout",
                    component:Checkout
                },
                {
                    path:"/pay",
                    component:Pay
                },
                {
                    path:"/payback",
                    component:PayBack
                }
            ]
        },
        {
            path:"/login",
            component:Login
        },

    ],
    scrollBehavior () {
        return {
            top:0
        }
    }
});