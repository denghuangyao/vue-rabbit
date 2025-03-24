import { defineStore } from "pinia";
import { reactive } from "vue";
import { getCategoryAPI } from "@/apis/layout";
type Category = {
    id:number,//分类id
    name:string,//分类名称
}
export const useCategoryStore = defineStore('category',()=>{
    //state 导航列表数据
    let categoryList = <Category[]>reactive([]);
    //action 获取导航数据方法
    const getCategory = async ()=>{
        let res = await getCategoryAPI();
        res.data.result.forEach((category:Category) => {
            categoryList.push({
                id:category.id,
                name:category.name
            })
        });;
    }
    return {categoryList,getCategory}
})