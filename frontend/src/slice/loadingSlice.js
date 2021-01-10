import { createSlice} from '@reduxjs/toolkit';
import {getProductList} from './productSlice'

export const loadingSlice=createSlice({
    name:'loading',
    initialState:{loading:false},
    reducers:{
        setLoading:state=>state.loading=true,
        stopLoading:state=>state.loading=false
    },
    // extraReducers:{
    //     [getProductList.pending]:state=>state.loading=true,
    //     [getProductList.fulfilled]:state=>state.loading=false,
    //     [getProductList.rejected]:state=>state.loading=false,
    // }
})
export const {setLoading,stopLoading}=loadingSlice.actions;
