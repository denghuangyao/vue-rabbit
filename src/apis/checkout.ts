import httpInstance from "@/utils/http";
import type { OrderSubimt } from "@/types"
export const getCheckoutInfoAPI = ()=>{
    return httpInstance({
        url:"/member/order/pre",
        method:"GET"
    })
}

export const createOrderAPI = (data:OrderSubimt)=>{
    let {deliveryTimeType=1,payType=1,payChannel=1,buyerMessage="",goods,addressId} = data;
    return httpInstance({
        url:"/member/order",
        method:"POST",
        data:{
            deliveryTimeType,
            payType,
            payChannel,
            buyerMessage,
            goods,
            addressId
        }
    })
}