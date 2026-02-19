import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slice/registerslice.js";
import eventReducer from "./slice/Events.slice.js";
import editMemberReducer from "./slice/editMember.slice.js"
import userimpacetReducer from "./slice/Impactstory.slice.js"
import testimonialReducer from "./slice/Testimonial.slice.js"

const store = configureStore({
  reducer: {
    memberRegister: registerReducer,
    event: eventReducer,
    editMember: editMemberReducer,
    impact:userimpacetReducer,
    testimonial:testimonialReducer,
  },

  // Redux DevTools enabled automatically in development
  devTools: true,
});

export default store;
