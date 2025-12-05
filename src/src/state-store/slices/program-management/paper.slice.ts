import { createSlice } from "@reduxjs/toolkit";

type paperSliceType = {
  isPaperCreateDialogOpenStateStore: boolean;
  isPaperReloadData: boolean;
};

const paperSlice = createSlice({
  name: "paper-class",
  initialState: <paperSliceType>{
    isPaperCreateDialogOpenStateStore: false,
    isPaperReloadData: false,
  },
  reducers: {
    setIsPaperCreateDialogOpenStateStore: (state, action) => {
      state.isPaperCreateDialogOpenStateStore = action.payload;
    },
    SetIsPaperReloadData: (state, action) => {
      state.isPaperReloadData = action.payload;
    },

  },
});

export const { setIsPaperCreateDialogOpenStateStore,
  SetIsPaperReloadData
} =
  paperSlice.actions;

export default paperSlice.reducer;
