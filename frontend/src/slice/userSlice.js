import { createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {usersApi} from '../api/usersApi';

//register
export const register=createAsyncThunk(
    'users/register',
    async(data)=>{
        try{
            const response=await usersApi.register(data);
            localStorage.setItem('userInfo',JSON.stringify(response));
            return {response}
        }
        catch(err){
            const error=err.response&&err.response.data.message
            ? err.response.data.message
            :err.message
            return {error} 
        }
})
export const userRegisterSlice=createSlice({
    name:'userRegister',
    initialState:{userInfo:null},
    extraReducers:{
        [register.fulfilled]:(state,{payload})=>{
            if("response" in payload){state.userInfo=payload.response }
            else{state.error=payload.error}       
        },
    }
})

//login logout
export const login=createAsyncThunk(
    'users/login',
    async(data)=>{
        try{
            const response=await usersApi.login(data);
            localStorage.setItem('userInfo',JSON.stringify(response));
            return {response}
        }
        catch(err){
            const error=err.response&&err.response.data.message
            ? err.response.data.message
            :err.message
            return {error} 
        }
})
const userInfoFromStorage=localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    :null

export const userLoginSlice=createSlice({
    name:'userLogin',
    initialState:{userInfo:userInfoFromStorage},
    reducers:{
        logout:state=>{
            state.userInfo=null;
            localStorage.removeItem('userInfo',)
        }
    },
    extraReducers:{
        [login.fulfilled]:(state,{payload})=>{
            console.log(payload);
            if("response" in payload){state.userInfo=payload.response }
            else{state.error=payload.error}       
        },
        [register.fulfilled]:(state,{payload})=>{
            if("response" in payload){state.userInfo=payload.response }
        }
    }
})

const {logout}=userLoginSlice.actions;
export {logout}

// get Details
export const getUserDetails=createAsyncThunk(
    'users/getUserDetails',
    async(id)=>{
        try{
            const response=await usersApi.getProfile(id);
            return {response}
        }
        catch(err){
            const error=err.response&&err.response.data.message
            ? err.response.data.message
            :err.message
            return {error} 
        }
})
export const userDetailsSlice=createSlice({
    name:'userDetails',
    initialState:{user:{}},
    extraReducers:{
        [getUserDetails.fulfilled]:(state,{payload})=>{
            console.log(payload);
            if("response" in payload){state.user=payload.response }
            else{state.error=payload.error}       
        }
    }
})

// update profile
export const updateUserProfile=createAsyncThunk(
    'users/updateUserProfile',
    async(user)=>{
        try{
            const response=await usersApi.updateProfile(user);
            return {response}
        }
        catch(err){
            const error=err.response&&err.response.data.message
            ? err.response.data.message
            :err.message
            return {error} 
        }
})
export const userUpdateProfileSlice=createSlice({
    name:'userUpdateProfile',
    initialState:{userInfo:{}},
    extraReducers:{
        [updateUserProfile.fulfilled]:(state,{payload})=>{
            console.log(payload);
            if("response" in payload){
                state.userInfo=payload.response;
                state.success=true
             }
            else{state.error=payload.error}       
        }
    }
})