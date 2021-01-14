import axiosClient from "./axiosClient";
export const usersApi = {
  login: ({email,password}) => {
    return axiosClient.post("/api/users/login",{email,password});
  },
  register:({name,email,password})=>{
    return axiosClient.post("/api/users",{name,email,password});
  },
  getProfile:(id)=>{
    return axiosClient.get(`/api/users/${id}`);
  },
  updateProfile:(user)=>{
    return axiosClient.put('api/users/profile',user)
  }
};