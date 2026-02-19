import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./slice/Login.slice.js";
import memberReducer from "./slice/member.slice.js";
import eventReducer from "./slice/Event.slice.js";
import impactstory from "./slice/ImpactStory.slice.js"
import storyReducer from "./slice/Story.slice.js"


export const store = configureStore({
  reducer: {
    auth: loginReducer,
    member: memberReducer,
    event: eventReducer,
    impact:impactstory,
    story:storyReducer,
  },
});
