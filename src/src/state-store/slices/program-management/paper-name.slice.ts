import { createSlice } from "@reduxjs/toolkit";

type paperNameSliceType = {
  isPaperNameCreateDialogOpenStateStore: boolean;
  isPaperNameReloadData: boolean;
};

const paperNameSlice = createSlice({
  name: "paper-class",
  initialState: <paperNameSliceType>{
    isPaperNameCreateDialogOpenStateStore: false,
    isPaperNameReloadData: false,
  },
  reducers: {
    setIsPaperNameCreateDialogOpenStateStore: (state, action) => {
      state.isPaperNameCreateDialogOpenStateStore = action.payload;
    },
    SetIsPaperNameReloadData: (state, action) => {
      state.isPaperNameReloadData = action.payload;
    },

  },
});

export const { setIsPaperNameCreateDialogOpenStateStore,
  SetIsPaperNameReloadData
} =
  paperNameSlice.actions;

export default paperNameSlice.reducer;
