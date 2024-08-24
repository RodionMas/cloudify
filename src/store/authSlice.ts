import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../instanceAxios";
import { GetMeType, Username, userRegister, UserRespone, UserTypeState } from "../types/authTypes";



export const fetchLogin = createAsyncThunk<
  UserRespone,
  Username,
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
  Username,
  { rejectValue: string }
>("login/fetchRegister", async (user, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/users/register`, user);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchLogout = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>("login/fetchLogout", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/auth/logout`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchGetMe = createAsyncThunk<
GetMeType,
undefined,
  { rejectValue: string }
>("login/fetchGetMe", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/auth/me`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: UserTypeState = {
  userRegister: {
    username: "",
    password: "",
  },
  loading: "idle",
  err: null,
  isAuth: false,
  username: '',
  logout: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    changeRegUser: (state, action: PayloadAction<userRegister>) => {
      state.userRegister = {
        ...state.userRegister,
        username: action.payload.username,
        password: action.payload.password,
      };
    },
    changeLogout: (state) => {
      state.logout = !state.logout;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload.message) {
        state.isAuth = true
        state.username = action.payload.message
      }
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.loading = "failed";
      state.err = action.payload;
    });
    builder.addCase(fetchRegister.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchRegister.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchGetMe.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchGetMe.fulfilled, (state, action) => {
      state.loading = "succeeded";
      if (action.payload) {
        state.isAuth = action.payload.authenticated;
        state.username = action.payload.username
      }
    });
    builder.addCase(fetchGetMe.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchLogout.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchLogout.fulfilled, (state) => {
      state.loading = "succeeded";
      state.isAuth = false;
    });
    builder.addCase(fetchLogout.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
  },
});

export const { changeRegUser, changeLogout } = authSlice.actions;

export default authSlice.reducer;
