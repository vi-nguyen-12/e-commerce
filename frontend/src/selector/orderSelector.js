import { createSelector } from "reselect";
export const orderCreateSelector = createSelector(
  ({ orderCreate }) => orderCreate,
  (orderCreate) => orderCreate
);
export const orderDetailsSelector = createSelector(
  ({ orderDetails }) => orderDetails,
  (orderDetails) => orderDetails
);
