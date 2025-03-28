import httpInstance from "@/utils/http";
import { type Category } from "@/types";
/**
 * 获取导航数据
 * @param id 
 * @returns 
 */
export function getTopCategoryAPI(id:any){
    return httpInstance<Category>({
        url:"/category",
        params:{ id }
    })
}
/**
 * 获取导航子分类数据
 * @param id 
 * @returns 
 */
export function getCategoryFilterAPI(id:any){
    return httpInstance({
        url:"/category/sub/filter",
        params:{id}
    })
}
/**
 * 获取分类商品列表
 * @param id 
 * @returns 
 */
type GoodsReq = { 
    categoryId: string ,
    page: number,
    pageSize: number,
    sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
} 
export function getCategoryGoodsAPI(data:GoodsReq){
    console.log("-getCategoryGoodsAPI-data-",data)
    return httpInstance({
        url:"/category/goods/temporary",
        method:"POST",
        data
    })
}