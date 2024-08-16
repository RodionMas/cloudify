import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../instanceAxios";

const initialState = {

};

export const subfolderSlice = createSlice({
  name: "subfolderSlice",
  initialState,
  reducers: {

  },
  extraReducers(builder) {}
  
});

export const {  } = subfolderSlice.actions;

export default subfolderSlice.reducer;
