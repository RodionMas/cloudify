import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../instanceAxios";
import { RenameSubfolderType, SubfolderState } from "../types/subfolderTypes";
import { DeleteFiles } from "../types/folderTypes";
import { MoveState } from "../types/moveTypes";

// DeleteFiles
export const fetchDelCheckbox = createAsyncThunk<
  string,
  DeleteFiles[],
  { rejectValue: string }
>("move/fetchDelCheckbox", async (moveFiles, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/files/move/deleted`, moveFiles);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchAllMove = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("move/fetchAllMove", async (moveFiles, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`/files/all/move`, moveFiles);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const initialState: MoveState = {
  moveFiles: [],
  loading: "idle",
  err: null,
};

const handlePending = (state: MoveState) => {
  state.loading = "pending";
};

const handleFulfilled = (state: MoveState, action: PayloadAction<any>) => {
  state.loading = "succeeded";
  return action.payload;
};

const handleRejected = (
  state: MoveState,
  action: PayloadAction<string | undefined>
) => {
  state.err = action.payload ?? "Something went wrong";
  state.loading = "failed";
};

export const moveState = createSlice({
  name: "subfolderSlice",
  initialState,
  reducers: {
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
    moveSelectedFiles: (state, action: PayloadAction<string>) => {
      state.moveFiles = state.moveFiles.map((file: any) => ({
        ...file, // Сохраняем все поля объекта как есть
        newFilePath: action.payload // Обновляем только newFilePath
      }));
      console.log("Updated moveFiles in reducer:", state.moveFiles); // Проверка состояния
    },
  },
  extraReducers(builder) {
    const addAsyncThunkCases = (
      thunk: any,
      onFulfilled: (state: MoveState, action: PayloadAction<any>) => void
    ) => {
      builder
        .addCase(thunk.pending, handlePending)
        .addCase(thunk.fulfilled, (state, action) => {
          handleFulfilled(state, action);
          onFulfilled(state, action);
        })
        .addCase(thunk.rejected, handleRejected);
    };
    addAsyncThunkCases(fetchAllMove, () => {});

    addAsyncThunkCases(fetchDelCheckbox, () => {});
  },
});

export const { setSourceAndTarget, addFile, removeFile, moveSelectedFiles } =
moveState.actions;

export default moveState.reducer;
