import {createSelector} from 'reselect';
export const cartSelector=createSelector(
    state=>state.cart,
    state=>state
)