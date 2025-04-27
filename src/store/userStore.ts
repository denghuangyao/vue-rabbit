import { loginAPI } from "@/apis/user";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/types"
import userCartStore from "@/store/cartStore"
export default defineStore(
  "user",
  () => {
    const cartStore = userCartStore();
    const userInfo = ref<User>({});
    const getUserInfo = async (account: string, password: string) => {
      const { result } = await loginAPI({ account, password });
      // console.log("-result-", result);
      userInfo.value = result;
      //合并购物车
      cartStore.mergeCart();
      
    };
    const clearUserInfo = () => {
        userInfo.value = {};
        cartStore.clearCart();
        // console.log("userInfo", userInfo);
    };
    const logout = ()=>{
      userInfo.value = {};
    }
    return { userInfo, getUserInfo , clearUserInfo };
  },
  {
    persist: true,
  }
);
