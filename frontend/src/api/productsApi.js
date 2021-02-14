import axiosClient from "./axiosClient";
export const productsApi = {
  getProducts: () => {
    return axiosClient.get("/api/products");
  },
  getProduct: (id) => {
    return axiosClient.get(`/api/products/${id}`);
  },
  deleteProduct: (id) => {
    return axiosClient.delete(`/api/products/${id}`);
  },
  createProduct: () => {
    return axiosClient.post("api/products");
  },
};
