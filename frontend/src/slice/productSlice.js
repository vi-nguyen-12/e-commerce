import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";

//productList
export const getProductList = createAsyncThunk(
  "products/getProductList",
  async () => {
    const res = await productsApi.getProducts();
    return res;
  }
);
export const productListSlice = createSlice({
  name: "productList",
  initialState: { products: [] },
  extraReducers: {
    [getProductList.fulfilled]: (state, { payload }) => {
      state.products = payload;
    },
  },
});

//productDetail
export const getProductDetail = createAsyncThunk(
  "products/getProductDetail",
  async (id) => {
    const res = await productsApi.getProduct(id);
    return res;
  }
);
export const productDetailSlice = createSlice({
  name: "productDetail",
  initialState: { product: {} },
  extraReducers: {
    [getProductDetail.fulfilled]: (state, { payload }) => {
      state.product = payload;
    },
    [getProductDetail.rejected]: (state, { payload }) => {
      state.error = payload;
    },
  },
});
// delete product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id) => {
    try {
      const response = await productsApi.deleteProduct(id);
      return { response };
    } catch (error) {
      return { error };
    }
  }
);
export const productDeleteSlice = createSlice({
  name: "productDelete",
  initialState: {},
  extraReducers: {
    [deleteProduct.fulfilled]: (state, { payload }) => {
      if ("response" in payload) {
        state.success = true;
      } else {
        state.error = payload.error;
      }
    },
  },
});

// create product
export const createProduct = createAsyncThunk(
  "products/createProduct",
  async () => {
    try {
      const response = await productsApi.createProduct();
      return { response };
    } catch (error) {
      return { error };
    }
  }
);
export const productCreateSlice = createSlice({
  name: "productCreate",
  initialState: {},
  reducers: {
    resetProduct: (state) => {
      state = {};
    },
  },
  extraReducers: {
    [createProduct.fulfilled]: (state, { payload }) => {
      if ("response" in payload) {
        state.success = true;
        state.product = payload.response;
      } else {
        state.error = payload.error;
      }
    },
  },
});
export const { resetProduct } = productCreateSlice.actions;
