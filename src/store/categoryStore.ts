import { defineStore } from "pinia";
import { reactive } from "vue";
import { getCategoryAPI } from "@/apis/layout";
import { type Category } from "@/types"
export const useCategoryStore = defineStore('category',()=>{
    //state 导航列表数据
    let categoryList = <Category[]>reactive([]);
    //action 获取导航数据方法
    const getCategory = async ()=>{
        let res = await getCategoryAPI();
        // console.log("-getCategory-",res);
        categoryList.length=0;
        res.result.forEach((category) => {
            categoryList.push({
                id:category.id,
                name:category.name,
                children:category.children||[],
                goods:category.goods||[]
            })
        });;
    }
    return {categoryList,getCategory}
})