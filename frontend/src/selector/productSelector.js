import { createSelector } from "reselect";

export const productListSelector = createSelector(
  ({ productList }) => productList,
  (productList) => productList
);

export const productDetailSelector = createSelector(
  ({ productDetail }) => productDetail,
  (productDetail) => productDetail
);

export const productDeleteSelector = createSelector(
  ({ productDelete }) => productDelete,
  (productDelete) => productDelete
);
