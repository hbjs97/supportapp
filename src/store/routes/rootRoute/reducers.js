import { UPDATE_ROOT_ROUTE } from "./modules/actionTypes";

const initialState = {
  root: "login",
};

const rootRouteReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_ROOT_ROUTE:
      return {
        root: payload,
      };

    default:
      return state;
  }
};

export default rootRouteReducer;
