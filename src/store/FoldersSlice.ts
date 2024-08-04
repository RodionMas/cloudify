import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../instanceAxios";
import download from "../assets/img/dots/Download.png";
import createLink from "../assets/img/dots/CloudLink.png";
import Favourite from "../assets/img/dots/Bookmark.png";
import Label from "../assets/img/dots/PriceTag.png";
import Rename from "../assets/img/dots/EditFile.png";
import Delete from "../assets/img/dots/TrashCan.png";

interface FoldersTypeState {
  dots: Dots[];
  loading: string;
  err: string | unknown | null;
  totalSize: number;
  userMemory: number;
  logout: boolean;
  dragAndDrop: boolean;
  allFiles: FetchFilesUserRes[];
}
interface Dots {
  name: string;
  image: any;
  color?: string[];
}
interface AmountDataType {
  totalSize: number;
  userMemory: number;
}
interface FetchFilesUserRes {
  filename: string;
  filePath: string;
  size: string;
  lastModified: DateType;
}
interface DateType {
  day: string;
  time: string;
}
export const fetchGetAmountData = createAsyncThunk<
  AmountDataType,
  string,
  { rejectValue: string }
>("login/fetchGetAmountData", async (username, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/files/memory/${username}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchGetAllFiles = createAsyncThunk<
  FetchFilesUserRes[],
  string,
  { rejectValue: string }
>("login/fetchGetAllFiles", async (username, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/files?username=${username}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchDrop = createAsyncThunk<string, any, { rejectValue: string }>(
  "login/fetchDrop",
  async (files, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/files/upload`, files, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: FoldersTypeState = {
  dots: [
    {
      name: "Download",
      image: download,
    },
    {
      name: "Create Link",
      image: createLink,
    },
    {
      name: "Favourite",
      image: Favourite,
    },
    {
      name: "Label",
      image: Label,
      color: ["#FFB800", "#0094FF", "#D23434", "#39AA26"],
    },
    {
      name: "Rename",
      image: Rename,
    },
    {
      name: "Delete",
      image: Delete,
    },
  ],
  loading: "idle",
  err: null,
  totalSize: 0.0,
  userMemory: 500,
  logout: false,
  dragAndDrop: false,
  allFiles: [],
};

export const FoldersSlice = createSlice({
  name: "FoldersSlice",
  initialState,
  reducers: {
    changeLogout: (state) => {
      state.logout = !state.logout;
    },
    changeDragDrop: (state) => {
      state.dragAndDrop = !state.dragAndDrop;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchGetAmountData.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchGetAmountData.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.totalSize = action.payload.totalSize;
      state.userMemory = action.payload.userMemory;
    });
    builder.addCase(fetchGetAmountData.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchDrop.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchDrop.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(fetchDrop.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchGetAllFiles.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchGetAllFiles.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.allFiles = [...action.payload];
    });
    builder.addCase(fetchGetAllFiles.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
  },
});

export const { changeLogout, changeDragDrop } = FoldersSlice.actions;

export default FoldersSlice.reducer;
