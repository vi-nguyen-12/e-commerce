import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: '',
  headers: { 
    "content-type": "application/json",
   },
  paramsSerializer: params => queryString.stringify(params)
});

axiosClient.interceptors.request.use(async (config)=>{
  // Handle token here...
  const currentUser=localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  :null

  if(currentUser){
    const token= await currentUser.token;
    config.headers.Authorization=`Bearer ${token}`;
  }
  return config
})


axiosClient.interceptors.response.use(
  res => {
    if (res && res.data) return res.data;
    return res;
  },
  err => {
    const {status}=err.response
    if(status===500){
      console.log('error 500')
    }
    if(status===401){
      console.log('error 401: unauthorized')
    }
    return Promise.reject(err)
  }
);
export default axiosClient;
