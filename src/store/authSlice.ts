import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import axios from "../instanceAxios";

interface UserTypeState {
  user: User;
  userRegister: User;
  loading: string;
  err: string | unknown | null;
  isAuth: boolean;
}

interface User {
  username: string | undefined;
  password: string | undefined;
}

interface UserRespone extends User {}

export const fetchLogin = createAsyncThunk<
  UserRespone,
  User,
  { rejectValue: string }
>("login/fetchLogin", async (user, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/auth/login`, user);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchRegister = createAsyncThunk<
  UserRespone,
  User,
  { rejectValue: string }
>("login/fetchRegister", async (user, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/auth/register`, user);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: UserTypeState = {
  user: {
    username: "",
    password: "",
  },
  userRegister: {
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
  reducers: {
    changeRegUser: (state, action: PayloadAction<User>) => {
      state.userRegister = {
        ...state.userRegister,
        username: action.payload.username,
        password: action.payload.password,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.user = action.payload;
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
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.err = action.payload;
      console.log(action.payload);
      state.loading = "failed";
    });
  },
});

export const { changeRegUser } = authSlice.actions;

export default authSlice.reducer;
