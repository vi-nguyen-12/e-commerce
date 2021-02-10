import { configureStore } from "@reduxjs/toolkit";
import { productListSlice, productDetailSlice } from "./slice/productSlice";
import { cartSlice } from "./slice/cartSlice";
import { loadingSlice } from "./slice/loadingSlice";
import {
  userLoginSlice,
  userRegisterSlice,
  userDetailsSlice,
  userUpdateProfileSlice,
} from "./slice/userSlice";
import {
  orderCreateSlice,
  orderDetailsSlice,
  orderPaySlice,
  myOrderListSlice,
} from "./slice/orderSlice";

const store = configureStore({
  reducer: {
    loading: loadingSlice.reducer,
    productList: productListSlice.reducer,
    productDetail: productDetailSlice.reducer,
    cart: cartSlice.reducer,

    userLogin: userLoginSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userUpdateProfile: userUpdateProfileSlice.reducer,

    orderCreate: orderCreateSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    orderPay: orderPaySlice.reducer,
    myOrderList: myOrderListSlice.reducer,
  },
});

export default store;
