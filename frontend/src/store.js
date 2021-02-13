import { configureStore } from "@reduxjs/toolkit";
import {
  productListSlice,
  productDetailSlice,
  productDeleteSlice,
  productCreateSlice,
} from "./slice/productSlice";
import { cartSlice } from "./slice/cartSlice";
import { loadingSlice } from "./slice/loadingSlice";
import {
  userLoginSlice,
  userRegisterSlice,
  userDetailsSlice,
  userUpdateProfileSlice,
  userListSlice,
  userDeleteSlice,
  userUpdateSlice,
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
    productDelete: productDeleteSlice.reducer,
    productCreate: productCreateSlice.reducer,
    cart: cartSlice.reducer,

    userLogin: userLoginSlice.reducer,
    userRegister: userRegisterSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    userUpdateProfile: userUpdateProfileSlice.reducer,

    orderCreate: orderCreateSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    orderPay: orderPaySlice.reducer,
    myOrderList: myOrderListSlice.reducer,
    userList: userListSlice.reducer,
    userDelete: userDeleteSlice.reducer,
    userUpdate: userUpdateSlice.reducer,
  },
});

export default store;
