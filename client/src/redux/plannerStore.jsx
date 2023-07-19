import { configureStore, createSlice } from "@reduxjs/toolkit";
import plannerReducer from "./plannerSlice/plannerSlice";

export const store = configureStore({
  reducer: {
    planner: plannerReducer,
  },
});
