import { createSlice } from "@reduxjs/toolkit";

type paperClassStudentEnrolmentSliceType = {
  isPaperClassStudentEnrolmentCreateDialogOpenStateStore: boolean;
  isPaperMarkAddDialogOpenStateStore: boolean;
  paperMarkAdd: any
};

const paperClassStudentEnrolmentSlice = createSlice({
  name: "paper-class-student-enrolment",
  initialState: <paperClassStudentEnrolmentSliceType>{
    isPaperClassStudentEnrolmentCreateDialogOpenStateStore: false,
    isPaperMarkAddDialogOpenStateStore: false,
    paperMarkAdd: null
  },
  reducers: {
    setIsPaperClassStudentEnrolmentCreateDialogOpenStateStore: (state, action) => {
      state.isPaperClassStudentEnrolmentCreateDialogOpenStateStore = action.payload;
    },
    setIsPaperMarkAddDialogOpenStateStore: (state, action) => {
      state.isPaperMarkAddDialogOpenStateStore = action.payload;
    },
    setPaperMarkAdd: (state, action) => {
      state.paperMarkAdd = action.payload;
    },

  },
});

export const { setIsPaperClassStudentEnrolmentCreateDialogOpenStateStore, setIsPaperMarkAddDialogOpenStateStore, setPaperMarkAdd } =
  paperClassStudentEnrolmentSlice.actions;

export default paperClassStudentEnrolmentSlice.reducer;
