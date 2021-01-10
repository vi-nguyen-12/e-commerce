import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: '',
  headers: { 
    "content-type": "application/json"
   },
  paramsSerializer: params => queryString.stringify(params)
});


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
  }
);
export default axiosClient;
