import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./root-reducer";

const persistConfig = { key: "config", storage };
export const persistedReducer = persistReducer(persistConfig, rootReducer);
