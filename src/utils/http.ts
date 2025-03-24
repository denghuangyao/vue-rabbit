import axios from "axios";
const httpInstance = axios.create({
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  timeout: 5000,
});
//拦截器
axios.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);
axios.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
export default httpInstance;
