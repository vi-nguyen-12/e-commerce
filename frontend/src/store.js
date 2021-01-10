import {configureStore} from '@reduxjs/toolkit';
import {
    productListSlice,
    productDetailSlice,
} from './slice/productSlice';
import {cartSlice} from './slice/cartSlice'
import {loadingSlice} from './slice/loadingSlice'



const store=configureStore({
    reducer:{
        loading:loadingSlice.reducer,
        productList:productListSlice.reducer,
        productDetail:productDetailSlice.reducer,
        cart: cartSlice.reducer
    }
})

export default store;