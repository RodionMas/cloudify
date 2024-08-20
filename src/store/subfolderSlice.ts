import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../instanceAxios";
import { RenameSubfolderType, SubfolderState } from "../types/subfolderTypes";

export const fetchRenameSubfolder = createAsyncThunk<
  string,
  RenameSubfolderType,
  { rejectValue: string }
>("subfolder/fetchRenameSubfolder", async (rename, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch(`/subfolders`, rename);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const FetchsubfoldersPackage = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("subfolder/FetchsubfoldersPackage", async (subfoldersURL, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/files?path=${subfoldersURL}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchsubfolderDel = createAsyncThunk<
  string,
  {folderPath: string},
  { rejectValue: string }
>("subfolder/FetchsubfolderDel", async (folderName, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/subfolders`, {data: folderName}); 
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: SubfolderState = {
  subfolderModal: false,
  renameSubfolder: {
    oldName: "",
    newName: "",
  },
  loading: "idle",
  err: null,
  subfoldersForPackage: [],
  subfilesForPackage: [],
  subfoldersURL: '',
};

const handlePending = (state: SubfolderState) => {
  state.loading = "pending";
};

const handleFulfilled = (
  state: SubfolderState,
  action: PayloadAction<any>
) => {
  state.loading = "succeeded";
  return action.payload;
};

const handleRejected = (
  state: SubfolderState,
  action: PayloadAction<string | undefined>
) => {
  state.err = action.payload ?? "Something went wrong";
  state.loading = "failed";
};

export const subfolderSlice = createSlice({
  name: "subfolderSlice",
  initialState,
  reducers: {
    changeModal: (state) => {
      state.subfolderModal = !state.subfolderModal;
    },
    renameSubfolderNew: (state, action: PayloadAction<string>) => {
      state.renameSubfolder = {
        ...state.renameSubfolder,
        newName: action.payload,
      };
    },
    renameSubfolderOld: (state, action: PayloadAction<string>) => {
      state.renameSubfolder = {
        ...state.renameSubfolder,
        oldName: action.payload,
      };
    },
    setFoldersURL: (state, action) => {
      const path = action.payload;
      const parts = path.split("/"); // Разбиваем строку на массив по "/"
      const index = parts.indexOf("userfolder"); // Находим индекс "userfolder"

      if (index !== -1) {
        const result = parts.slice(index + 1).join("/"); // Забираем все элементы после "userfolder" и соединяем их обратно в строку
        const encodedPath = result.replace(/\//g, "%2F");
        state.subfoldersURL = encodedPath;
      }
    },
  },
  extraReducers(builder) {
    const addAsyncThunkCases = (
      thunk: any,
      onFulfilled: (state: SubfolderState, action: PayloadAction<any>) => void
    ) => {
      builder
        .addCase(thunk.pending, handlePending)
        .addCase(thunk.fulfilled, (state, action) => {
          handleFulfilled(state, action);
          onFulfilled(state, action);
        })
        .addCase(thunk.rejected, handleRejected);
    };
    addAsyncThunkCases(fetchRenameSubfolder, () => {});

    addAsyncThunkCases(fetchsubfolderDel, () => {});

    addAsyncThunkCases(FetchsubfoldersPackage, (state, action) => {
      state.subfoldersForPackage = [...action.payload.folders];
      state.subfilesForPackage = [...action.payload.files];
    });
  },
});

export const { changeModal, renameSubfolderNew, renameSubfolderOld, setFoldersURL } = subfolderSlice.actions;

export default subfolderSlice.reducer;
