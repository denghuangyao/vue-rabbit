import { loginAPI } from "@/apis/login";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import type { User } from "@/types"
export default defineStore(
  "user",
  () => {
    let userInfo = ref<User>({});
    const router = useRouter();
    const doLogin = async (account: string, password: string) => {
      let { result } = await loginAPI({ account, password });
      console.log("-result-", result);
      userInfo.value = result;
      ElMessage({ type: "success", message: "登录成功" });
      router.replace("/");
    };
    const clearUserInfo = () => {
        userInfo.value = {};
        console.log("userInfo", userInfo);
    };
    return { userInfo, doLogin, clearUserInfo };
  },
  {
    persist: true,
  }
);
