import { createSlice } from "@reduxjs/toolkit";

type lecturerSliceType = {
  isLecturerTimeScheduleCreateDialogOpenStateStore: boolean;
};

const lecturerSlice = createSlice({
  name: "lecturer",
  initialState: <lecturerSliceType>{
    isLecturerTimeScheduleCreateDialogOpenStateStore: false,
  },
  reducers: {
    setIsLecturerTimeScheduleCreateDialogOpenStateStore: (state, action) => {
      state.isLecturerTimeScheduleCreateDialogOpenStateStore = action.payload;
    },
  },
});

export const { setIsLecturerTimeScheduleCreateDialogOpenStateStore } = lecturerSlice.actions;

export default lecturerSlice.reducer;
