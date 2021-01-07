import axiosClient from "./axiosClient";
export const productsApi = {
  getProducts: () => {
    return axiosClient.get("/api/products");
  },
  getProduct:(id)=>{
    return axiosClient.get(`/api/products/${id}`)
  }
};
