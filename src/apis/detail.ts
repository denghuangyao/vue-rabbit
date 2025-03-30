import type { CategoryGoods } from "@/types";
import httpInstance from "@/utils/http";
export function getDetailAPI(id:any){
    return httpInstance({
        url:"/goods",
        params:{id}
    })
}
/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
type HotReq = {
    id:string|string[]
    type:number
    limit?:number
}
export function getHotGoodsAPI({id,type,limit=3}:HotReq){
    // console.log("-getHotGoodsAPI-",id,type,limit)
    return httpInstance<CategoryGoods[]>({
        url:"/goods/hot",
        params:{id,type,limit}
    })
}