import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import {productsApi} from '../api/productsApi'
import {setLoading,stopLoading} from './loadingSlice';

//productList
export const getProductList=createAsyncThunk('products/getProductList',async(_,{dispatch})=>{
    // dispatch(setLoading());
    try{
        const res=await productsApi.getProducts();
        return res
    }
    catch(err){
        console.log(err)
    }
    // dispatch(stopLoading())
    
})
export const productListSlice=createSlice({
    name:'productList',
    initialState:{products:[]},
    extraReducers:{
        [getProductList.fulfilled]:(state,{payload})=>{
            state.products=payload
        }
    }
})

//productDetail
export const getProductDetail=createAsyncThunk('products/getProductDetail',async(id)=>{
    try{
        const res=await productsApi.getProduct(id);
        return res}
    catch(err){
        console.log(err)
    }
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