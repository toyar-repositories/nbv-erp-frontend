import { createSlice } from "@reduxjs/toolkit";

type studentSliceType = {
  isStudentCreateDialogOpenStateStore: boolean;
  isUpdateDialogOpenStateStore: boolean
  updatableStudent: any
};

const studentSlice = createSlice({
  name: "student",
  initialState: <studentSliceType>{
    isStudentCreateDialogOpenStateStore: false,
    isUpdateDialogOpenStateStore: false,
    updatableStudent: null
  },
  reducers: {
    setIsStudentCreateDialogOpenStateStore: (state, action) => {
      state.isStudentCreateDialogOpenStateStore = action.payload;
    },
    setIsUpdateDialogOpenStateStore: (state, action) => {
      state.isUpdateDialogOpenStateStore = action.payload;
    },
    setUpdatableStudent: (state, action) => {
      state.updatableStudent = action.payload;
    },
  },
});

export const { setIsStudentCreateDialogOpenStateStore,
  setIsUpdateDialogOpenStateStore,
  setUpdatableStudent
} = studentSlice.actions;

export default studentSlice.reducer;
