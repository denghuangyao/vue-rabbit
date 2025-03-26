// 首页分类
export interface Category {
    id:string,//分类id
    name:string,//分类名称
    picture?:string, 
    children?:[...Category[]]//下属分类
    goods?:[...CategoryGoods[]]
}
// 商品分类下的商品
export interface CategoryGoods {
    id:string;
    name:string;
    desc?:string;
    price:string;
    picture?:string
}
// export interface TopCategory{
//     id:number,//分类id
//     name:string,//分类名称
//     goods:[...CategoryGoods[]]
// }
//轮播图
export interface Banner{
    id:string
    imgUrl:string
}
//人气推荐数据
export interface Hot{
    id:string 
    picture:string 
    title:string,
    alt:string
}
//新鲜好物商品数据
export interface New{
    id:string,
    name:string,
    price:string,
    picture:string
}
// 产品列表数据
export interface Product extends Category{
    picture:string
    saleInfo:string
}