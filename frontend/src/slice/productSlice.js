import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {productsApi} from '../api/productsApi'

//productList
export const getProductList=createAsyncThunk('products/getProductList',async()=>{
        const res=await productsApi.getProducts();
        return res
})
export const productListSlice=createSlice({
    name:'productList',
    initialState:{products:[]},
    extraReducers:{
        [getProductList.fulfilled]:(state,{payload})=>{
            state.products=payload;
        }
    }
})

//productDetail
export const getProductDetail=createAsyncThunk('products/getProductDetail',async(id)=>{
    const res=await productsApi.getProduct(id);
    return res
    }
)
export const productDetailSlice=createSlice({
    name:'productDetail',
    initialState:{product:{}},
    extraReducers:{
        [getProductDetail.fulfilled]:(state,{payload})=>{
            state.product=payload
        },
        [getProductDetail.rejected]:(state,{payload})=>{
            state.error=payload
        },
    }
})