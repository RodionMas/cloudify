import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../instanceAxios";

interface UserTypeState {
  userRegister: userRegister;
  loading: string;
  err: string | unknown | null;
  isAuth: boolean;
}

interface Username {
  username: string | undefined;
}
interface userRegister extends Username {
  password: string | undefined;
}
interface UserRespone extends Username {}

interface GetMeType {
  authenticated: boolean;
  username: string;
}

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
    const { data } = await axios.post(`/auth/register`, user);
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
    const { data } = await axios.get(`/auth/status`);
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
  },
  extraReducers(builder) {
    builder.addCase(fetchLogin.pending, (state) => {
      state.loading = "pending";
      state.err = null;
    });
    builder.addCase(fetchLogin.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(fetchLogin.rejected, (state) => {
      state.loading = "failed";
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
      console.log(action.payload)
      // if (action.payload) {
      //   state.isAuth = true;
      // }
    });
    builder.addCase(fetchGetMe.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
  },
});

export const { changeRegUser } = authSlice.actions;

export default authSlice.reducer;
