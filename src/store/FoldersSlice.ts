import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  deletedFiles: FetchDeletedFiles[];
  createFolderModal: boolean;
  createFolder: CreateFolder;
  folders: FolderType[];
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
interface FetchDeletedFiles extends FetchFilesUserRes {}
interface DateType {
  day: string;
  time: string;
}

interface FetchDelFiles {
  username: string;
  deletedFiles?: DeleteFiles[];
  delFile?: DeleteFiles[];
}

interface DeleteFiles {
  filename: string;
  filePath: string;
}
interface CreateFolder {
  name: string;
  color: string;
}

export interface FolderType {
  name: string;
  color: string;
  size: string;
  filesNumber: string;
}

export const fetchGetAmountData = createAsyncThunk<
  AmountDataType,
  void,
  { rejectValue: string }
>("folder/fetchGetAmountData", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/files/memory`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchGetAllFiles = createAsyncThunk<
  FetchFilesUserRes[],
  string,
  { rejectValue: string }
>("folder/fetchGetAllFiles", async (username, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/files/all?username=${username}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchGetDeletedFiles = createAsyncThunk<
  FetchDeletedFiles[],
  string,
  { rejectValue: string }
>("folder/fetchGetDeletedFiles", async (username, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/files/deleted?username=${username}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchDrop = createAsyncThunk<string, any, { rejectValue: string }>(
  "folder/fetchDrop",
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

export const fetchDeleteFiles = createAsyncThunk<
  string,
  FetchDelFiles,
  { rejectValue: string }
>(
  "folder/fetchDeleteFiles",
  async ({ username, deletedFiles }, { rejectWithValue }) => {
    try {
      const response = await axios.delete<string>(
        `files?username=${username}`,
        {
          data: deletedFiles,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDeleteFile = createAsyncThunk<
  string,
  FetchDelFiles,
  { rejectValue: string }
>(
  "folder/fetchDeleteFile",
  async ({ username, delFile }, { rejectWithValue }) => {
    try {
      const response = await axios.delete<string>(
        `files?username=${username}`,
        {
          data: delFile,
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchMoveToDeleted = createAsyncThunk<
  string,
  any,
  { rejectValue: string }
>(
  "folder/fetchMoveToDeleted",
  async (deletedObjForFetch, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/files/move?username=${deletedObjForFetch.username}`,
        deletedObjForFetch.forFetch
      );
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchCreateFolder = createAsyncThunk<
  string,
  any,
  { rejectValue: string }
>("folder/fetchCreateFolder", async (create, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/folders/create`, create);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchGetFolder = createAsyncThunk<
FolderType[],
  void,
  { rejectValue: string }
>("folder/fetchGetFolder", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/folders`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


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
  deletedFiles: [],
  createFolderModal: false,
  createFolder: {
    name: "",
    color: "",
  },
  folders: [],
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
    changeFolderModal: (state) => {
      state.createFolderModal = !state.createFolderModal;
    },
    createModalName: (state, action: PayloadAction<string>) => {
      state.createFolder.name = action.payload;
    },
    createModalColor: (state, action: PayloadAction<string>) => {
      state.createFolder.color = action.payload;
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
    builder.addCase(fetchGetDeletedFiles.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchGetDeletedFiles.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.deletedFiles = [...action.payload];
    });
    builder.addCase(fetchGetDeletedFiles.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchDeleteFiles.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchDeleteFiles.fulfilled, (state) => {
      state.loading = "succeeded";
      state.deletedFiles = [];
    });
    builder.addCase(fetchDeleteFiles.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchMoveToDeleted.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchMoveToDeleted.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(fetchMoveToDeleted.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchCreateFolder.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchCreateFolder.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });
    builder.addCase(fetchCreateFolder.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchGetFolder.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchGetFolder.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.folders = [...action.payload]
      console.log(state.folders)
    });
    builder.addCase(fetchGetFolder.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
  },
});

export const {
  changeLogout,
  changeDragDrop,
  changeFolderModal,
  createModalName,
  createModalColor,
} = FoldersSlice.actions;

export default FoldersSlice.reducer;
