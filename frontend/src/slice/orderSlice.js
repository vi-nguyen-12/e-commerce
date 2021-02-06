import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {ordersApi} from '../api/ordersApi';

// create order
export const createOrder=createAsyncThunk(
    'orders/createOrder',
    async(data)=>{
        try{
            const response=await ordersApi.createOrder(data);
            return {response}
        }
        catch(err){
            const error=err.response&&err.response.data.message
            ? err.response.data.message
            :err.message
            return {error} 
        }
})
export const orderCreateSlice=createSlice({
    name:'orderCreate',
    initialState:{order:{}},
    extraReducers:{
        [createOrder.fulfilled]:(state,{payload})=>{
            if("response" in payload){
                state.order=payload.response
                state.success=true
             }
            else{state.error=payload.error}       
        },
    }
})