import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {productsApi} from '../api/productsApi'

export const getProductList=createAsyncThunk('products/getProductList',async()=>{
    const res=await productsApi.getProducts();
    return res
})
export const productListSlice=createSlice({
    name:'productList',
    initialState:{products:[]},
    extraReducers:{
        [getProductList.pending]:state=>{state.loading=true},
        [getProductList.fulfilled]:(state,{payload})=>{
            state.loading=false
            state.products=payload
        },
        [getProductList.rejected]:(state,{payload})=>{
            state.loading=false
            state.error=payload
        },
    }
})

export const getProductDetail=createAsyncThunk('products/getProductDetail',async(id)=>{
    const res=await productsApi.getProduct(id);
    return res
})
export const productDetailSlice=createSlice({
    name:'productDetail',
    initialState:{product:{}},
    extraReducers:{
        [getProductDetail.pending]:state=>{state.loading=true},
        [getProductDetail.fulfilled]:(state,{payload})=>{
            state.loading=false
            state.product=payload
        },
        [getProductDetail.rejected]:(state,{payload})=>{
            state.loading=false
            state.error=payload
        },
    }
})