import httpInstance from "@/utils/http";
import { type Category } from "@/types"
export function getTopCategoryAPI(id:string|string[]){
    return httpInstance<Category>({
        url:"/category",
        params:{ id }
    })
}