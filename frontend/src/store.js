import {configureStore} from '@reduxjs/toolkit';
import {
    productListSlice,
    productDetailSlice
} from './slice/productSlice';

const store=configureStore({
    reducer:{
        productList:productListSlice.reducer,
        productDetail:productDetailSlice.reducer
    }
})

export default store;