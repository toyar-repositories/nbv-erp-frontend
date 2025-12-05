import { createSlice } from "@reduxjs/toolkit";

type exampleSliceType = {
  myData1: any;
  isMyData2: boolean;
  myData3: any;
};

const exampleSlice = createSlice({
  name: "example",
  initialState: <exampleSliceType>{
    myData1: null,
    isMyData2: false,
    myData3: null,
  },
  reducers: {
    setMyData1: (state, action) => {
      state.myData1 = action.payload;
    },
    setIsMyData2: (state, action) => {
      state.isMyData2 = action.payload;
    },
    setMyData3: (state, action) => {
      state.myData3 = action.payload;
    },
  },
});

export const { setMyData1, setIsMyData2, setMyData3 } = exampleSlice.actions;

export default exampleSlice.reducer;
