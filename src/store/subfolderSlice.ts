import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../instanceAxios";
import { RenameSubfolderType, SubfolderState } from "../types/subfolderTypes";
import { File } from "../types/folderTypes";

export const fetchRenameSubfolder = createAsyncThunk<
  string,
  RenameSubfolderType,
  { rejectValue: string }
>("subfolder/fetchRenameSubfolder", async (rename, { rejectWithValue }) => {
  try {
    const { data } = await axios.patch(`/subfolders`, rename);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const FetchsubfoldersPackage = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("subfolder/FetchsubfoldersPackage", async (subfoldersURL, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`/files?path=${subfoldersURL}`);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchsubfolderDel = createAsyncThunk<
  string,
  {folderPath: string},
  { rejectValue: string }
>("subfolder/FetchsubfolderDel", async (folderName, { rejectWithValue }) => {
  try {
    const { data } = await axios.delete(`/subfolders`, {data: folderName}); 
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: SubfolderState = {
  subfolderModal: false,
  renameSubfolder: {
    oldName: "",
    newName: "",
  },
  loading: "idle",
  err: null,
  subfoldersForPackage: [],
  subfilesForPackage: [],
  subfoldersURL: '',
  colorForSubfolder: '',
};

const handlePending = (state: SubfolderState) => {
  state.loading = "pending";
};

const handleFulfilled = (
  state: SubfolderState,
  action: PayloadAction<any>
) => {
  state.loading = "succeeded";
  return action.payload;
};

const handleRejected = (
  state: SubfolderState,
  action: PayloadAction<string | undefined>
) => {
  state.err = action.payload ?? "Something went wrong";
  state.loading = "failed";
};

//функции для сортировки
const getSizeInBytes = (size: string): number => {
  const units: { [key: string]: number } = { 'KB': 1024, 'MB': 1024 * 1024, 'GB': 1024 * 1024 * 1024 };
  const [value, unit] = size.split(/(?<=\d),(?=\d)|(?<=\d)\s+/);
  const numericValue = parseFloat(value.replace(',', '.'));
  return numericValue * (units[unit.toUpperCase()] || 1);
};
const compareFiles = (a: File, b: File, ind: number, rotate: boolean): number => {
  let comparison = 0;

  if (ind === 0) { // сортировка по имени файла
    comparison = a.filename.localeCompare(b.filename);
  } else if (ind === 1) { // сортировка по названию папки
    comparison = a.filePath.localeCompare(b.filePath);
  } else if (ind === 2) { // сортировка по размеру файла
    const sizeA = getSizeInBytes(a.size);
    const sizeB = getSizeInBytes(b.size);
    comparison = sizeA - sizeB;
  } else if (ind === 3) { // сортировка по дате
    const dateA = new Date(a.lastModified.day);
    const dateB = new Date(b.lastModified.day);
    comparison = dateA.getTime() - dateB.getTime();
  }

  // Если rotate истинно, сортируем в обычном порядке, иначе - в обратном
  return rotate ? comparison : -comparison;
};
  

export const subfolderSlice = createSlice({
  name: "subfolderSlice",
  initialState,
  reducers: {
    sortSubfileInFolder: (state, action: PayloadAction<{
      ind: number;
      rotate: boolean;
    }>) => {
      const { ind, rotate } = action.payload;
      // Сортируем массив deletedFiles
      state.subfilesForPackage.sort((a: any, b: any) => compareFiles(a, b, ind, rotate));
    },
    changeModal: (state) => {
      state.subfolderModal = !state.subfolderModal;
    },
    renameSubfolderNew: (state, action: PayloadAction<string>) => {
      state.renameSubfolder = {
        ...state.renameSubfolder,
        newName: action.payload,
      };
    },
    renameSubfolderOld: (state, action: PayloadAction<string>) => {
      state.renameSubfolder = {
        ...state.renameSubfolder,
        oldName: action.payload,
      };
    },
    setFoldersURL: (state, action) => {
      const path = action.payload;
      const parts = path.split("/"); // Разбиваем строку на массив по "/"
      const index = parts.indexOf("userfolder"); // Находим индекс "userfolder"

      if (index !== -1) {
        const result = parts.slice(index + 1).join("/"); // Забираем все элементы после "userfolder" и соединяем их обратно в строку
        const encodedPath = result.replace(/\//g, "%2F");
        state.subfoldersURL = encodedPath;
      }
    },
  },
  extraReducers(builder) {
    const addAsyncThunkCases = (
      thunk: any,
      onFulfilled: (state: SubfolderState, action: PayloadAction<any>) => void
    ) => {
      builder
        .addCase(thunk.pending, handlePending)
        .addCase(thunk.fulfilled, (state, action) => {
          handleFulfilled(state, action);
          onFulfilled(state, action);
        })
        .addCase(thunk.rejected, handleRejected);
    };
    addAsyncThunkCases(fetchRenameSubfolder, () => {});

    addAsyncThunkCases(fetchsubfolderDel, () => {});

    addAsyncThunkCases(FetchsubfoldersPackage, (state, action) => {
      state.subfoldersForPackage = [...action.payload.folders];
      state.subfilesForPackage = [...action.payload.files];
      state.colorForSubfolder = action.payload.color;
    });
  },
});

export const { changeModal, renameSubfolderNew, renameSubfolderOld, setFoldersURL, sortSubfileInFolder } = subfolderSlice.actions;

export default subfolderSlice.reducer;
