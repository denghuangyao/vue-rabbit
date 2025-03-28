import httpInstance from "@/utils/http";
import type { Banner,New,Hot,Product } from "@/types"

/**
 * 获取轮播图数据
 */
export function getBannerAPI(distributionSite:string="1"){
    return httpInstance<Banner[]>({
        url:"/home/banner",
        params:{
            distributionSite
        }
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