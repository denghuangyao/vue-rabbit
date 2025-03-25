import axios,{type AxiosRequestConfig,type AxiosResponse} from "axios";
type Response<T> = {
  msg:string,
  code:string,
  result:T
}
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});
//拦截器
httpInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);
httpInstance.interceptors.response.use(
  (response) => {
    console.log("response-",response)
    return response//response.data
  },
  (error) => Promise.reject(error)
);
// export default httpInstance;
export default <T>(config:AxiosRequestConfig)=>{
  return new Promise<Response<T>>((resolve,reject)=>{
    httpInstance.request<Response<T>>(config).then((response)=>{
      resolve(response.data)
      // console.log("-response-dhy11-",response)
    }).catch(error=>{
      reject(error)
    })
  })
}