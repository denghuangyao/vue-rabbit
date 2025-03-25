import httpInstance from "@/utils/http";
export interface Category {
    id:number,//分类id
    name:string,//分类名称
    children?:[...Category[]]//下属分类
    goods:[...CategoryGoods[]]
}
// 商品分类下的商品
export interface CategoryGoods {
    id:number;
    name:string;
    desc?:string;
    price:string;
    picture?:string
}
export function getCategoryAPI(){
    return httpInstance<Category[]>({
        url:"/home/category/head"
    })
}
