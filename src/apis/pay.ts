import httpInstance from "@/utils/http";
export const getOrderAPI = (id:any)=>{
    return httpInstance({
        url:`/member/order/${id}`
    })
}
export const apliPayAPI = (orderId:any,redirect:any)=>{
    return httpInstance({
        url:"/pay/aliPay",
        params:{
            orderId,
            redirect
        }
    })
}