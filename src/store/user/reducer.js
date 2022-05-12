import { UPDATE_USER_ACTION } from "./modules/actionTypes";

export const initialState = {
  user: {
    id: null,
    email: null,
    name: null,
    role: null,
  },
};

const userReducer = (prevState = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_ACTION:
      return {
        user: {
          ...prevState.user,
          ...payload,
        },
      };
    default:
      return prevState;
  }
};

export default userReducer;
