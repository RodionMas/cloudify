import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import FoldersReducer from "./foldersSlice";
import deleteReducer from "./deleteSlise";
import subfolderReducer  from "./subfolderSlice";
import moveReducer from "./moveSlice";

export const store = configureStore({
  reducer: { authReducer, FoldersReducer, deleteReducer, subfolderReducer, moveReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
