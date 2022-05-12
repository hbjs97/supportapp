import { UPDATE_USER_ACTION } from "./modules/actionTypes";

export const updateUser = (diff) => ({
  type: UPDATE_USER_ACTION,
  payload: diff,
});
