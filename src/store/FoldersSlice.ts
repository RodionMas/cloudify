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
  foldersShowMore: FoldersShowMoreType[];
  folderName: string;
  recoverItem: RecoverItemType[];
  renameModal: boolean;
  renameObj: RenameObjType;
  colorForFolder: string;
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

export interface FoldersShowMoreType {
  name: string;
  color: string;
  size: string;
  filesNumber: string;
}

interface RecoverType {
  filename: string;
  filePath: string;
}
interface RecoverItemType {
  filename: string;
  filePath: string;
}
interface RenameObjType {
  oldFileName?: string;
  filepath?: string;
  newFileName: string;
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
  void,
  { rejectValue: string }
>("folder/fetchGetAllFiles", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/files/all`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchGetDeletedFiles = createAsyncThunk<
  FetchDeletedFiles[],
  void,
  { rejectValue: string }
>("folder/fetchGetDeletedFiles", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/files/deleted`);
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

export const fetchMove = createAsyncThunk<string, any, { rejectValue: string }>(
  "folder/fetchMove",
  async (movedObjForFetch, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/files/move`, movedObjForFetch);
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

export const fetchGetMoverShowMore = createAsyncThunk<
  FolderType[],
  void,
  { rejectValue: string }
>("folder/fetchGetMoverShowMore", async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/folders/moved`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchRecover = createAsyncThunk<
  string,
  RecoverType[],
  { rejectValue: string }
>("folder/fetchRecover", async (recover, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/files/recover`, recover);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchRenameFile = createAsyncThunk<
  string,
  RenameObjType,
  { rejectValue: string }
>("folder/fetchRenameFile", async (renameInp, { rejectWithValue }) => {
  try {
    const objForFetch = {
      filepath: renameInp.filepath,
      newFileName: renameInp.newFileName
    }
    const { data } = await axios.patch(`/file/${renameInp.oldFileName}`, objForFetch);
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
  foldersShowMore: [],
  folderName: "",
  recoverItem: [],
  renameModal: false,
  renameObj: {
    oldFileName: "",
    filepath: "",
    newFileName: ""
  },
  colorForFolder: '',
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
    recoverItemReducer: (state, action) => {
      state.recoverItem = [...state.recoverItem, action.payload];
    },
    changeRenameModal: (state) => {
      state.renameModal = !state.renameModal;
    },
    renameFile: (state, action) => {
      if (action.payload.oldFileName) {
        state.renameObj = {
          ...state.renameObj,
          ...action.payload,
        };
      }
      if (action.payload.filepath) {
        state.renameObj = {
          ...state.renameObj,
          ...action.payload,
        };
      }
    },
    checkColor: (state, action) => {
      state.colorForFolder = action.payload;
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
    builder.addCase(fetchMove.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchMove.fulfilled, (state) => {
      state.loading = "succeeded";
    });
    builder.addCase(fetchMove.rejected, (state, action) => {
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
      state.folders = [...action.payload];
    });
    builder.addCase(fetchGetFolder.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchGetMoverShowMore.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchGetMoverShowMore.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.foldersShowMore = [...action.payload];
    });
    builder.addCase(fetchGetMoverShowMore.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchRecover.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchRecover.fulfilled, (state, action) => {
      state.loading = "succeeded";
    });
    builder.addCase(fetchRecover.rejected, (state, action) => {
      state.err = action.payload;
      state.loading = "failed";
    });
    builder.addCase(fetchRenameFile.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchRenameFile.fulfilled, (state, action) => {
      state.loading = "succeeded";
      console.log(action.payload)
    });
    builder.addCase(fetchRenameFile.rejected, (state, action) => {
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
  recoverItemReducer,
  changeRenameModal,
  renameFile,
  checkColor,
} = FoldersSlice.actions;

export default FoldersSlice.reducer;
