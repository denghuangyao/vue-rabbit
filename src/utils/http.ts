import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import useUserStore from "@/store/userStore";
import router from "@/router";
import { httpGet, httpPost } from "./axios";
// import { ElMessage } from "element-plus";
// import 'element-plus/theme-chalk/el-message.css'
type ApiResponse<T = any> = {
  msg: string;
  code: string;
  result: T;
};
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 50000,
});
//拦截器
httpInstance.interceptors.request.use(
  (config) => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("-request-error", error);
    return Promise.reject(error);
  }
);
httpInstance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // console.log("response-",response)
    return response;
    // return response.data
  },
  (error: any) => {
    console.log("response-error-", error, error.response.data.message);
    if (error.response.status === 401) {
      const userStore = useUserStore();
      userStore.clearUserInfo();
      router.replace("/login");
    } else {
      ElMessage.error(error.response.data.message);
    }
    // Promise.reject(error);
  }
);
// export default httpInstance;
export default <T>(config: AxiosRequestConfig) => {
  if (config.method === "GET") {
    return httpGet(config.url, config.params);
  } 
  else 
  if (config.method === "POST") {
    return httpPost(config.url, config.data);
  }  
  else {
    return new Promise<ApiResponse<T>>((resolve, reject) => {
      httpInstance
        .request<ApiResponse<T>>(config)
        .then((response: AxiosResponse<ApiResponse<T>>) => {
          // console.log("-response-dhy11-",response)
          if (response) {
            resolve(response.data);
          } else {
            reject();
          }
        })
        .catch((error) => {
          console.log("-response-dhy11-error", error);
          reject(error);
        });
    });
  }
};
