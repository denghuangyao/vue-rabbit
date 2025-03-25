import httpInstance from "@/utils/http";
import {type Category} from "@/apis/layout"
export interface Banner{
    id:string
    imgUrl:string
}
export interface Hot{
    id:string 
    picture:string 
    title:string
}
export interface New{
    id:string,
    name:string,
    price:string,
    picture:string
}
export interface Product extends Category{
    saleInfo:string
}
/**
 * 获取轮播图数据
 */
export function getBannerAPI(){
    return httpInstance<Banner[]>({
        url:"/home/banner"
    })
}
export function getNewAPI(){
    return httpInstance<New[]>({
        url:"/home/new"
    })
}
/**
 * 获取人气推荐数据
 */
export function getHotAPI(){
    return httpInstance<Hot[]>({
        url:"/home/hot"
    })
}
/**
 * 获取产品列表
 */
export function getProductAPI(){
    return httpInstance<Product[]>({
        url:"/home/goods"
    })
}