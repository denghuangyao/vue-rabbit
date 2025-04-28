import axios from "axios";
import useUserStore from "@/store/userStore";
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout:20000,
  headers:{
    get:{
        'Content-Type':'application/x-www-form-urlencoded;chartset=utf-8',
    },
    post:{
        'Content-Type':'application/json;chartset=utf-8',
    }
  }
});
httpInstance.interceptors.request.use(
    config => {
        const userStore = useUserStore();
        const token = userStore.userInfo.token
        if (token) {
            config.headers["Authorization"]=`Bearer ${token}`
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)
httpInstance.interceptors.response.use(
    response => {
        console.log("axios-response",response);
        if(response.status==200){
            if(response.data.code==="1"){
                return Promise.resolve(response.data);
            }else{
                return Promise.reject(response); 
            }
        }else{
            return Promise.reject(response);
        }
    },
    error => {
        console.log("axios-response-error",error);
        if(error.response.status===401){
            const userStore = useUserStore();
            userStore.clearUserInfo()
            router.replace("/login")
        }else{
            ElMessage.error(error.response.data.message);
        }
        return Promise.reject(error);
    }
)
export const httpGet = async (url,params={}) => {
    return new Promise((resolve,reject)=>{
        httpInstance.get(url,{params}).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })
    })
}
export const httpPost = async (url,data={},params={}) => {
    return new Promise((resolve,reject)=>{
        httpInstance({
            method:"POST",
            transformRequest:(data)=>{
                console.log("-transformRequest-data-",data)
                return JSON.stringify(data);
            },
            transformResponse:(data)=>{
                console.log("-transformResponse-data-",data)
                return JSON.parse(data);
            },
            url,
            data,
            params
        })
        // httpInstance.post(url,data,params)
        .then(res=>{
            console.log("-res-",res)
            resolve(res)
        }).catch(err=>{
            reject(err)
        });
    });
}
