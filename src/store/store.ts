import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import FoldersReducer from "./FoldersSlice";
import deleteReducer from "./deleteSlise";
import subfolderReducer  from "./subfolderSlice";

export const store = configureStore({
  reducer: { authReducer, FoldersReducer, deleteReducer, subfolderReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
