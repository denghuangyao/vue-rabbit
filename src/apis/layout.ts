import httpInstance from "@/utils/http";
import { type Category } from "@/types";
export function getCategoryAPI(){
    return httpInstance<Category[]>({
        url:"/home/category/head"
    })
}
