import { RootState } from "../store/store";

export const selectAuth = (state: RootState) => state.authReducer;

export const selectFolders = (state: RootState) => state.foldersReducer;

export const selectDelete = (state: RootState) => state.deleteReducer;

export const selectSubfolders = (state: RootState) => state.subfolderReducer;

export const selectMove = (state: RootState) => state.moveReducer;
