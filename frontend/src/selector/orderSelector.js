import { createSelector } from "reselect";
export const orderCreateSelector = createSelector(
  ({ orderCreate }) => orderCreate,
  (orderCreate) => orderCreate
);
export const orderDetailsSelector = createSelector(
  ({ orderDetails }) => orderDetails,
  (orderDetails) => orderDetails
);
export const orderPaySelector = createSelector(
  ({ orderPay }) => orderPay,
  (orderPay) => orderPay
);
export const myOrderListSelector = createSelector(
  ({ myOrderList }) => myOrderList,
  (myOrderList) => myOrderList
);
