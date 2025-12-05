import { createSlice } from "@reduxjs/toolkit";

type studentSliceType = {
  isStudentSubjectEnrolmentCreateDialogOpenStateStore: boolean;
};

const studentSlice = createSlice({
  name: "student",
  initialState: <studentSliceType>{
    isStudentSubjectEnrolmentCreateDialogOpenStateStore: false,
  },
  reducers: {
    setIsStudentSubjectEnrolmentCreateDialogOpenStateStore: (state, action) => {
      state.isStudentSubjectEnrolmentCreateDialogOpenStateStore = action.payload;
    },
  },
});

export const { setIsStudentSubjectEnrolmentCreateDialogOpenStateStore } = studentSlice.actions;

export default studentSlice.reducer;
