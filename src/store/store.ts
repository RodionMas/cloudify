import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import FoldersReducer from "./FoldersSlice";

export const store = configureStore({
  reducer: { authReducer, FoldersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
