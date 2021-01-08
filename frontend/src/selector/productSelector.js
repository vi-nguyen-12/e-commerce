import {createSelector} from 'reselect';

export const productListSelector=createSelector(
    state=>state.productList,
    state=>state
)

export const productDetailSelector=createSelector(
    state=>state.productDetail,
    state=>state
)