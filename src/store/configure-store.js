import { createWrapper } from "next-redux-wrapper";
import { legacy_createStore as createStore } from "redux";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./persist-reducer";
import rootReducer from "./root-reducer";

const makeConfiguredStore = (reducer) => createStore(reducer, undefined);
const makeStore = () => {
  const isServer = typeof window === "undefined";

  if (isServer) {
    return makeConfiguredStore(rootReducer);
  } else {
    const store = makeConfiguredStore(persistedReducer);
    let persistor = persistStore(store);
    return { persistor, ...store };
  }
};

const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
