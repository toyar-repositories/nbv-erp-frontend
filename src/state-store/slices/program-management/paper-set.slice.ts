import { createSlice } from "@reduxjs/toolkit";

type paperSetSliceType = {
  isPaperSetCreateDialogOpenStateStore: boolean;
  isPaperSetReloadData: boolean;
  isGeneratePaperMarkDialogOpenStateStore: boolean;
  paperSetData: any;
};

const paperSetSlice = createSlice({
  name: "paper-class",
  initialState: <paperSetSliceType>{
    isPaperSetCreateDialogOpenStateStore: false,
    isPaperSetReloadData: false,
    isGeneratePaperMarkDialogOpenStateStore: false,
    paperSetData: null,
  },
  reducers: {
    setIsPaperSetCreateDialogOpenStateStore: (state, action) => {
      state.isPaperSetCreateDialogOpenStateStore = action.payload;
    },
    SetIsPaperSetReloadData: (state, action) => {
      state.isPaperSetReloadData = action.payload;
    },
    setIsGeneratePaperMarkDialogOpenStateStore: (state, action) => {
      state.isGeneratePaperMarkDialogOpenStateStore = action.payload;
    },
    setPaperSetData: (state, action) => {
      state.paperSetData = action.payload;
    },
  },
});

export const { setIsPaperSetCreateDialogOpenStateStore,
  SetIsPaperSetReloadData, setIsGeneratePaperMarkDialogOpenStateStore, setPaperSetData
} =
  paperSetSlice.actions;

export default paperSetSlice.reducer;
