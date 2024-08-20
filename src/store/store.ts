import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import deleteReducer from "./deleteSlise";
import subfolderReducer  from "./subfolderSlice";
import moveReducer from "./moveSlice";
import foldersReducer from "./foldersSlice";

export const store = configureStore({
  reducer: { authReducer, foldersReducer, deleteReducer, subfolderReducer, moveReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
