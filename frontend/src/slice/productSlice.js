import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productsApi } from "../api/productsApi";

//update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async (product) => {
    try {
      const response = await productsApi.updateProduct(product);
      return { response };
    } catch (error) {
      return { error };
    }
  }
);
export const productUpdateSlice = createSlice({
  name: "productUpdate",
  initialState: {},
  reducers: {
    resetUpdate: () => ({}),
  },
  extraReducers: {
    [updateProduct.fulfilled]: (state, { payload }) => {
      if ("response" in payload) {
        state.success = true;
        state.product = payload.response;
      } else {
        state.error = payload.error;
      }
    },
  },
});
export const { resetUpdate } = productUpdateSlice.actions;

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
    resetCreate: () => ({}),
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
export const { resetCreate } = productCreateSlice.actions;

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
  reducers: {
    resetDelete: () => ({}),
  },
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
export const { resetDelete } = productDeleteSlice.actions;

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
    [resetUpdate]: (state) => {
      state.product = {};
    },
  },
});
//productReviewCreate
export const createProductReview = createAsyncThunk(
  "products/createProductReview",
  async (data) => {
    try {
      const response = await productsApi.createProductReview(data);
      return { response };
    } catch (err) {
      const error =
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message;
      return { error };
    }
  }
);
export const productReviewCreateSlice = createSlice({
  name: "productReviewCreate",
  initialState: {},
  reducers: {
    resetReviewCreate: () => ({}),
  },
  extraReducers: {
    [createProductReview.fulfilled]: (state, { payload }) => {
      if ("response" in payload) {
        state.success = true;
      } else {
        state.error = payload.error;
      }
    },
  },
});
export const { resetReviewCreate } = productReviewCreateSlice.actions;
