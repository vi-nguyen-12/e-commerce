import { createSelector } from "reselect";
export const userLoginSelector = createSelector(
  ({ userLogin }) => userLogin,
  (userLogin) => userLogin
);
export const userRegisterSelector = createSelector(
  ({ userRegister }) => userRegister,
  (userRegister) => userRegister
);
export const userDetailsSelector = createSelector(
  ({ userDetails }) => userDetails,
  (userDetails) => userDetails
);
export const userUpdateProfileSelector = createSelector(
  ({ userUpdateProfile }) => userUpdateProfile,
  (userUpdateProfile) => userUpdateProfile
);
export const userListSelector = createSelector(
  ({ userList }) => userList,
  (userList) => userList
);
export const userDeleteSelector = createSelector(
  ({ userDelete }) => userDelete,
  (userDelete) => userDelete
);
export const userUpdateSelector = createSelector(
  ({ userUpdate }) => userUpdate,
  (userUpdate) => userUpdate
);
