import { createSlice } from "@reduxjs/toolkit";

type appSliceType = {
  token: any;
  isAuthenticated: boolean;
  sessionUserInfo: any;
};

const appSlice = createSlice({
  name: "app",
  initialState: <appSliceType>{
    token: null,
    isAuthenticated: false,
    sessionUserInfo: null,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setSessionUserInfo: (state, action) => {
      state.sessionUserInfo = action.payload;
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { setToken, logout, setIsAuthenticated, setSessionUserInfo } =
  appSlice.actions;

export default appSlice.reducer;
