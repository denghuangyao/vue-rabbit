import httpInstance from "@/utils/http";
import type { LoginData,User } from "@/types";
export function loginAPI({account,password}:LoginData){
    return httpInstance<User>({
        url:"/login",
        method:"POST",
        data:{account,password}
    })
}