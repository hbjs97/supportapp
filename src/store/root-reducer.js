import { combineReducers } from "redux";
import rootRouteReducer from "./routes/rootRoute/reducers";
import userReducer from "./user/reducer";

const rootReducer = combineReducers({
  rootRouteReducer,
  userReducer,
});

export default rootReducer;
