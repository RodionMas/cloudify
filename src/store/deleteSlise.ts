import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../instanceAxios";
import { DeleteSelectedFiles, DeleteTypeState, RecoverFilesType } from "../types/deleteTypes";

const initialState: DeleteTypeState = {
    files: [],
    loading: "idle",
    err: null,
};

export const fetchDeleteSelected = createAsyncThunk<
string,
DeleteSelectedFiles[],
  { rejectValue: string }
>("delete/fetchDeleteSelected", async (files, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/files`, {
        data: files
    });
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchRecoverFiles = createAsyncThunk<
string,
RecoverFilesType[],
  { rejectValue: string }
>("delete/fetchRecoverFiles", async (files, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/files/recover`, files);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const deleteSlise = createSlice({
  name: "deleteSlise",
  initialState,
  reducers: {
    deleteSelected: (state, action: PayloadAction<DeleteSelectedFiles>) => {
        state.files = [...state.files, action.payload];
    },
    changeDeleteSelected: (state, action: PayloadAction<string>) => {
        state.files = state.files.filter(file => file.filename !== action.payload)
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchDeleteSelected.pending, (state) => {
        state.loading = "pending";
        state.err = null;
      });
      builder.addCase(fetchDeleteSelected.fulfilled, (state) => {
          state.loading = "succeeded";
      });
      builder.addCase(fetchDeleteSelected.rejected, (state) => {
        state.loading = "failed";
      });
      builder.addCase(fetchRecoverFiles.pending, (state) => {
        state.loading = "pending";
        state.err = null;
      });
      builder.addCase(fetchRecoverFiles.fulfilled, (state) => {
          state.loading = "succeeded";
      });
      builder.addCase(fetchRecoverFiles.rejected, (state) => {
        state.loading = "failed";
      });
  },
});

export const { deleteSelected, changeDeleteSelected } = deleteSlise.actions;

export default deleteSlise.reducer;
