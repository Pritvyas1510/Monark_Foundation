import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slice/registerslice";

const store = configureStore({
  reducer: {
    register: registerReducer,
  },

  // Redux DevTools enabled automatically in development
  devTools: true,
});

export default store;
