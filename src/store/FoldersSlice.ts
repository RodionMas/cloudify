import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "../instanceAxios";
import download from "../assets/img/dots/Download.png";
import createLink from "../assets/img/dots/CloudLink.png";
import Favourite from "../assets/img/dots/Bookmark.png";
import Label from "../assets/img/dots/PriceTag.png";
import Rename from "../assets/img/dots/EditFile.png";
import Delete from "../assets/img/dots/TrashCan.png";

interface FoldersTypeState {
  dots: Dots[];
}
interface Dots {
  name: string;
  image: any;
  color?: any;
}

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
      color: ['#FFB800', '#0094FF', '#D23434', '#39AA26',]
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
};

export const FoldersSlice = createSlice({
  name: "FoldersSlice",
  initialState,
  reducers: {},
});

export const {} = FoldersSlice.actions;

export default FoldersSlice.reducer;
