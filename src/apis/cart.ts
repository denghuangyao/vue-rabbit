import type { Cart } from "@/types";
import httpInstance from "@/utils/http";
export const insertCartAPI = ({skuId,count}:any)=>{
    return httpInstance({
        url:"/member/cart",
        method:"POST",
        data:{skuId,count}
    })
}
export const updateNewListAPI = ()=>{
    return httpInstance<Cart[]>({
        url:"/member/cart",
        method:"GET"
    })
}
export const delCartAPI = (ids:any[])=>{
    return httpInstance({
        url:"/member/cart",
        method:"DELETE",
        data:{ ids }
    })
}
export const selectCartAPI = (ids:any,selected:boolean)=>{
    return httpInstance({
        url:"/member/cart/selected",
        method:"PUT",
        data:{selected,ids}
    })
}
export const mergeCartAPI = (arr:any[])=>{
    return httpInstance({
        url:'/member/cart/merge',
        method:"POST",
        data:arr
    })
}
/**
 * 修改购物车商品信息
 */
export const updateCartAPI = (id:any,data:any)=>{
    return httpInstance({
        url:`/member/cart/${id}`,
        method:"PUT",
        data
    })
}