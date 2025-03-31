import { loginAPI } from "@/apis/login";
import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "@/types"
export default defineStore(
  "user",
  () => {
    let userInfo = ref<User>({});
    const getUserInfo = async (account: string, password: string) => {
      let { result } = await loginAPI({ account, password });
      console.log("-result-", result);
      userInfo.value = result;
    };
    const clearUserInfo = () => {
        userInfo.value = {};
        console.log("userInfo", userInfo);
    };
    return { userInfo, getUserInfo , clearUserInfo };
  },
  {
    persist: true,
  }
);
