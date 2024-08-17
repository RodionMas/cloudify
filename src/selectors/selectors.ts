import { RootState } from "../store/store";

export const selectAuth = (state: RootState) => state.authReducer;

export const selectFolders = (state: RootState) => state.FoldersReducer;

export const selectDelete = (state: RootState) => state.deleteReducer;

export const selectSubfolders = (state: RootState) => state.subfolderReducer;
