import { loginAPI } from "@/apis/login";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/types"
import userCartStore from "@/store/cartStore"
export default defineStore(
  "user",
  () => {
    const cartStore = userCartStore();
    let userInfo = ref<User>({});
    const getUserInfo = async (account: string, password: string) => {
      let { result } = await loginAPI({ account, password });
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
    return { userInfo, getUserInfo , clearUserInfo };
  },
  {
    persist: true,
  }
);
