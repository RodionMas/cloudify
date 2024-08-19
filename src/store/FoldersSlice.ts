import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "../instanceAxios";
import {
  AmountDataType,
  ColorFolderType,
  CreateSubfolderType,
  DeleteFiles,
  FetchDeletedFiles,
  FetchDelFiles,
  FetchFilesUserRes,
  FoldersTypeState,
  FolderType,
  RecoverType,
  RenameFolder,
  RenameObjType,
} from "../types/folderTypes";

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
>("folder/fetchDeleteFiles", async ({ deletedFiles }, { rejectWithValue }) => {
  try {
    const response = await axios.delete<string>(`files`, {
      data: deletedFiles,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchDeleteFile = createAsyncThunk<
  string,
  FetchDelFiles,
  { rejectValue: string }
>("folder/fetchDeleteFile", async ({ delFile }, { rejectWithValue }) => {
  try {
    const response = await axios.delete<string>(`files`, {
      data: delFile,
    });
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchMove = createAsyncThunk<string, any, { rejectValue: string }>(
  "folder/fetchMove",
  async (moveFiles, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/files/move`, moveFiles);
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
      newFileName: renameInp.newFileName,
    };
    const { data } = await axios.patch(
      `/file/${renameInp.oldFileName}`,
      objForFetch
    );
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchCreateSubfolder = createAsyncThunk<
  string,
  CreateSubfolderType,
  { rejectValue: string }
>(
  "folder/fetchCreateSubfolder",
  async (createSubfolder, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`/subfolders`, createSubfolder);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchGetFoldersFiles = createAsyncThunk<
  string,
  string | undefined,
  { rejectValue: string }
>("folder/fetchGetFoldersFiles", async (foldername, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/files?path=${foldername}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// DeleteFiles
export const fetchDelCheckbox = createAsyncThunk<
  string,
  DeleteFiles[],
  { rejectValue: string }
>("folder/fetchDelCheckbox", async (moveFiles, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/files/move/deleted`, moveFiles);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchRenameFodler = createAsyncThunk<
  string,
  RenameFolder,
  { rejectValue: string }
>("folder/fetchRenameFodler", async (renameFolder, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch(
      `/folders/${renameFolder.oldName}`,
      renameFolder.newName
    );
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchColorFolder = createAsyncThunk<
  string,
  ColorFolderType,
  { rejectValue: string }
>("folder/fetchColorFolder", async (colorFolder, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch(
      `/folders/color/${colorFolder.name}`,
      colorFolder.newColor
    );
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchDeleteFolder = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("folder/fetchDeleteFolder", async (folderName, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/folders/${folderName}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchAllMove = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("folder/fetchAllMove", async (moveFiles, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/files/all/move`, moveFiles);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});


const handlePending = (state: FoldersTypeState) => {
  state.loading = "pending";
};

const handleFulfilled = (
  state: FoldersTypeState,
  action: PayloadAction<any>
) => {
  state.loading = "succeeded";
  return action.payload;
};

const handleRejected = (
  state: FoldersTypeState,
  action: PayloadAction<string | undefined>
) => {
  state.err = action.payload ?? "Something went wrong";
  state.loading = "failed";
};

const initialState: FoldersTypeState = {
  loading: "idle",
  err: null,
  totalSize: 0.0,
  userMemory: 500,
  
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
  renameFolderModal: false,
  renameFolder: {
    newName: "",
    oldName: "",
  },
  renameObj: {
    oldFileName: "",
    filepath: "",
    newFileName: "",
  },
  colorForFolder: "",
  createSubfolderModal: false,
  createSubfolder: {
    folderPath: "",
    name: "",
  },
  foldersForPagckage: [],
  filesForPackage: [],
  moveFiles: [],
  colorFolder: {
    name: "",
    newColor: "",
  },
  moveSelectedModal: false,
};

export const FoldersSlice = createSlice({
  name: "FoldersSlice",
  initialState,
  reducers: {
    changeMoveSelectedModal: (state) => {
      state.moveSelectedModal = !state.moveSelectedModal;
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
    changeRenameFolderModal: (state) => {
      state.renameFolderModal = !state.renameFolderModal;
    },
    renameNewNameFolder: (state, action) => {
      state.renameFolder.newName = action.payload;
    },
    renameLastNameFolder: (state, action) => {
      state.renameFolder.oldName = action.payload;
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
    changeColorFolderName: (state, action) => {
      state.colorFolder.name = action.payload;
    },
    changeColorFolder: (state, action) => {
      state.colorFolder = {
        ...state.colorFolder,
        newColor: action.payload,
      };
      console.log(state.colorFolder.newColor);
    },
    SubfolderModal: (state) => {
      state.createSubfolderModal = !state.createSubfolderModal;
    },
    createSubfolderReducer: (state, action) => {
      state.createSubfolder = {
        ...state.createSubfolder,
        ...action.payload,
      };
    },
    // Обновление source и target
    setSourceAndTarget(
      state,
      action: PayloadAction<{ source: string; target: string }>
    ) {
      state.moveFiles.source = action.payload.source;
      state.moveFiles.target = action.payload.target;
    },
    // Добавление файла в массив files
    addFile(state, action: PayloadAction<any>) {
      state.moveFiles = [...action.payload];
      const updatedArray = state.moveFiles.map(
        (file: { newFilePath: string }) => {
          return { ...file, file, newFilePath: "deleted" };
        }
      );
      state.moveFiles = [...updatedArray];
    },
    // Удаление файла из массива files
    removeFile(state, action: PayloadAction<string>) {
      state.moveFiles.files = state.moveFiles.files.filter(
        (file: string) => file !== action.payload
      );
    },
    moveSelectedFiles: (state, action) => {
      const updatedArray = state.moveFiles.map(
        (file: { newFilePath: string }) => {
          return { ...file, file, newFilePath: action.payload };
        }
      );
      state.moveFiles = [...updatedArray];
    }
  },
  extraReducers: (builder) => {
    const addAsyncThunkCases = (
      thunk: any,
      onFulfilled: (state: FoldersTypeState, action: PayloadAction<any>) => void
    ) => {
      builder
        .addCase(thunk.pending, handlePending)
        .addCase(thunk.fulfilled, (state, action) => {
          handleFulfilled(state, action);
          onFulfilled(state, action);
        })
        .addCase(thunk.rejected, handleRejected);
    };

    addAsyncThunkCases(fetchGetAmountData, (state, action) => {
      state.totalSize = action.payload.totalSize;
      state.userMemory = action.payload.userMemory;
    });

    addAsyncThunkCases(fetchDrop, () => {});

    addAsyncThunkCases(fetchGetAllFiles, (state, action) => {
      state.allFiles = [...action.payload];
    });

    addAsyncThunkCases(fetchGetDeletedFiles, (state, action) => {
      state.deletedFiles = [...action.payload];
    });

    addAsyncThunkCases(fetchAllMove, () => {});

    addAsyncThunkCases(fetchDeleteFiles, (state) => {
      state.deletedFiles = [];
    });

    addAsyncThunkCases(fetchMove, () => {});

    addAsyncThunkCases(fetchCreateFolder, () => {});

    addAsyncThunkCases(fetchGetFolder, (state, action) => {
      state.folders = [...action.payload];
    });

    addAsyncThunkCases(fetchGetMoverShowMore, (state, action) => {
      state.foldersShowMore = [...action.payload];
    });

    addAsyncThunkCases(fetchRecover, () => {});

    addAsyncThunkCases(fetchRenameFile, () => {});

    addAsyncThunkCases(fetchCreateSubfolder, () => {});

    addAsyncThunkCases(fetchGetFoldersFiles, (state, action) => {
      state.foldersForPagckage = [...action.payload.folders];
      state.filesForPackage = [...action.payload.files];
    });
    
    addAsyncThunkCases(fetchDelCheckbox, () => {});

    addAsyncThunkCases(fetchRenameFodler, () => {});

    addAsyncThunkCases(fetchColorFolder, () => {});

    addAsyncThunkCases(fetchDeleteFolder, () => {});
  },
});
// fetchDeleteFolder
export const {
  changeDragDrop,
  changeFolderModal,
  createModalName,
  createModalColor,
  recoverItemReducer,
  changeRenameModal,
  renameFile,
  checkColor,
  SubfolderModal,
  createSubfolderReducer,
  setSourceAndTarget,
  addFile,
  removeFile,
  changeRenameFolderModal,
  renameNewNameFolder,
  renameLastNameFolder,
  changeColorFolderName,
  changeColorFolder,
  changeMoveSelectedModal,
  moveSelectedFiles,
} = FoldersSlice.actions;

export default FoldersSlice.reducer;
