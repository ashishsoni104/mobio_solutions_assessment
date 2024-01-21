import axios from "axios";

// const baseUrl = document.body.dataset['app_base_url'];
const axiosInstance = axios.create({
  baseURL: 'https://fakestoreapi.com/'
});

// axiosInstance.baseURL = "http://localhost/carlos-saas";
// axiosInstance.interceptors.request.use(config => {

//   if(config.data instanceof FormData && !config.data.has("AdminToken") && localStorage.getItem("adminToken")) config.data.append("AdminToken", localStorage.getItem("adminToken"))
//   else if(typeof config.data === "object" && !config.data.AdminToken && localStorage.getItem("adminToken")){
//     config.data.AdminToken = localStorage.getItem("adminToken")
//   }
//   return config;
// });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;