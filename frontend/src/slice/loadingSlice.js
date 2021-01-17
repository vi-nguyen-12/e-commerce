import { createSlice} from '@reduxjs/toolkit';
import {getProductList,getProductDetail} from './productSlice'
import {addToCart} from './cartSlice'
import {login, register} from './userSlice'


export const loadingSlice=createSlice({
    name:'loading',
    initialState:{loading:false},
    extraReducers:{
        [getProductList.pending]:state=>{state.loading=true},
        [getProductList.fulfilled]:state=>{state.loading=false},
        [getProductList.rejected]:state=>{state.loading=false},

        [getProductDetail.pending]:state=>{state.loading=true},
        [getProductDetail.fulfilled]:state=>{state.loading=false},
        [getProductDetail.pending]:state=>{state.loading=false},
        
        [addToCart.pending]:state=>{state.loading=true},
        [addToCart.fulfilled]:state=>{state.loading=false},
        [addToCart.pending]:state=>{state.loading=false},

        [login.pending]:state=>{state.loading=true},
        [login.fulfilled]:state=>{state.loading=false},
        [login.pending]:state=>{state.loading=false},

        [register.pending]:state=>{state.loading=true},
        [register.fulfilled]:state=>{state.loading=false},
        [register.pending]:state=>{state.loading=false},
    }
})
