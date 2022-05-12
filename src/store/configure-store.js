import { createWrapper } from "next-redux-wrapper";
import { applyMiddleware, compose, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore } from "redux-persist";
import { persistedReducer } from "./persist-reducer";

const configureStore = () => {
  const enhancer =
    process.env.NODE_ENV === "production"
      ? compose(applyMiddleware())
      : composeWithDevTools(applyMiddleware());

  const store = createStore(persistedReducer, enhancer);
  let persistor = persistStore(store);
  return { persistor, ...store };
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
