import { configureStore } from "@reduxjs/toolkit";
import registerReducer from "./slice/registerslice.js";
import eventReducer from "./slice/Events.slice.js";
import editMemberReducer from "./slice/editMember.slice.js"
import userImpactReducer from "./slice/ImpactStory.slice.js";
import testimonialReducer from "./slice/Testimonial.slice.js"
import regionalHeadsReducer from"./slice/RegionalHeads.slice.js"

const store = configureStore({
  reducer: {
    memberRegister: registerReducer,
    event: eventReducer,
    editMember: editMemberReducer,
     userImpact: userImpactReducer,
    testimonial:testimonialReducer,
    regionalHeads: regionalHeadsReducer,
  },

  // Redux DevTools enabled automatically in development
  devTools: true,
});

export default store;
