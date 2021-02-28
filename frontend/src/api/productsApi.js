import axiosClient from "./axiosClient";
export const productsApi = {
  getProducts: (keyword, pageNumber) => {
    return axiosClient.get(
      `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
    );
  },
  getProduct: (id) => {
    return axiosClient.get(`/api/products/${id}`);
  },
  deleteProduct: (id) => {
    return axiosClient.delete(`/api/products/${id}`);
  },
  createProduct: () => {
    return axiosClient.post("/api/products");
  },
  updateProduct: (product) => {
    return axiosClient.put(`/api/products/${product._id}`, product);
  },
  createProductReview: (data) => {
    const { id, rating, comment } = data;
    return axiosClient.post(`/api/products/${id}/reviews`, { rating, comment });
  },
};
