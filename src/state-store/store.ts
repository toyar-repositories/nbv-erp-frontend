import { apiServer1 } from "@/api/api-server-1";
import appSlice from "@/state-store/slices/app.slice";
import exampleSlice from "@/state-store/slices/example.slice";
import studentSlice from "@/state-store/slices/student-management/student.slice";
import studentSubjectEnrolmentSlice from "@/state-store/slices/student-management/student-subject-enrolment.slice";
import paperClassSlice from "@/state-store/slices/program-management/paper-class.slice";
import paperSetSlice from "@/state-store/slices/program-management/paper-set.slice";
import paperNameSlice from "@/state-store/slices/program-management/paper-name.slice";
import paperSlice from "@/state-store/slices/program-management/paper.slice";
import paperClassStudentEnrolmentSlice from "@/state-store/slices/program-management/paper-class-student-enrolment.slice";
import lecturerTimeScheduleSlice from "@/state-store/slices/lecturer-management/lecturer-time-schedule.slice";
import type { Middleware, MiddlewareAPI } from "@reduxjs/toolkit";
import {
  combineReducers,
  configureStore,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage, // localStorage is the default option
  blacklist: [apiServer1.reducerPath], // these reducers will not persist data (NOTE: blacklist rtk api slices so that to use tags)
  // whitelist: ['users'], //these reducers will persist data
};

/**
 * On api error this will be called
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      // console.log("isRejectedWithValue", action.error, action.payload);
      // alert(JSON.stringify(action)); // This is just an example. You can replace it with your preferred method for displaying notifications.
    }
    return next(action);
  };

// https://redux-toolkit.js.org/rtk-query/overview#configure-the-store
// Add the generated reducer as a specific top-level slice
const rootReducer = combineReducers({
  app: appSlice,
  example: exampleSlice,
  //student management
  student: studentSlice,
  studentSubjectEnrolment: studentSubjectEnrolmentSlice,

  //program management
  paperClass: paperClassSlice,
  paperSet: paperSetSlice,
  paperName: paperNameSlice,
  paper: paperSlice,
  paperClassStudentEnrolment: paperClassStudentEnrolmentSlice,
  lecturerTimeSchedule: lecturerTimeScheduleSlice,
  apiServer1: apiServer1.reducer,
});
export type RootReducer = ReturnType<typeof rootReducer>;
const persistedReducer = persistReducer<RootReducer>(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiServer1.middleware, rtkQueryErrorLogger),
});

export const makeStore = () => {
  return store;
};

setupListeners(store.dispatch);

export default store;

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
