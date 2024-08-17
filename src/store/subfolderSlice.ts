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

const initialState: SubfolderState = {
  subfolderModal: false,
  renameSubfolder: {
    oldName: "",
    newName: "",
  },
  loading: "idle",
  err: null,
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
  },
});

export const { changeModal, renameSubfolderNew, renameSubfolderOld } = subfolderSlice.actions;

export default subfolderSlice.reducer;
