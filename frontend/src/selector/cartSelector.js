import {createSelector} from 'reselect';
export const cartSelector=createSelector(
    ({cart})=>cart,
    cart=>cart
)