import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "../instanceAxios";

interface UserTypeState {
  user: User;
  loading: string;
  err: any;
  isAuth: boolean;
}

interface User {
  username: string;
  password: string;
}

interface UserRespone extends User {}

export const fetchLogin = createAsyncThunk(
  "login/fetchLogin",
  async (user: any, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/auth/login`, user);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRegister = createAsyncThunk(
  "login/fetchRegister",
  async (user: any, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/auth/register`, user);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: UserTypeState = {
  user: {
    username: "",
    password: "",
  },
  loading: "idle",
  err: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
      console.log(action.payload);
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.loading = "failed";
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload);
    });
    builder.addCase(fetchRegister.rejected, (state) => {
      state.loading = "failed";
    });
  },
});

export const {} = authSlice.actions;

// export const selectCount = (state: RootState) => state;

export default authSlice.reducer;
