import { createSlice } from "@reduxjs/toolkit";

type paperClassSliceType = {
  isPaperClassCreateDialogOpenStateStore: boolean;
  isBulkPaperClassScheduleDialogOpenStateStore: boolean;
  isUploadOriginalPaperDialogOpenStateStore: boolean;
  isViewOriginalPaperDialogOpenStateStore: boolean;
  isUpdateStudentPaperMarkDialogOpenStateStore: boolean;
  isUploadMarkPaperDialogOpenStateStore: boolean;
  isViewMarkPaperDialogOpenStateStore: boolean;
  isUploadLectureRecordingDialogOpenStateStore: boolean;
  isUploadMarkingSchemeDialogOpenStateStore: boolean;
  isPaperClassViewModeActive: boolean;
  uploadOriginalPaper: any;
  viewMarkPaper: any;
  uploadMarkPaper: any;
  uploadMarkingScheme: any;
  uploadLectureRecording: any;
  isCompletedPaperClassDialogOpenStateStore: boolean;
};

const paperClassSlice = createSlice({
  name: "paper-class",
  initialState: <paperClassSliceType>{
    isPaperClassCreateDialogOpenStateStore: false,
    isBulkPaperClassScheduleDialogOpenStateStore: false,
    isUploadOriginalPaperDialogOpenStateStore: false,
    isViewOriginalPaperDialogOpenStateStore: false,
    isUpdateStudentPaperMarkDialogOpenStateStore: false,
    isUploadMarkPaperDialogOpenStateStore: false,
    isViewMarkPaperDialogOpenStateStore: false,
    isUploadLectureRecordingDialogOpenStateStore: false,
    isUploadMarkingSchemeDialogOpenStateStore: false,
    isPaperClassViewModeActive: false,
    uploadOriginalPaper: null,
    viewMarkPaper: null,
    uploadMarkPaper: null,
    uploadMarkingScheme: null,
    uploadLectureRecording: null,
    isCompletedPaperClassDialogOpenStateStore: false
  },
  reducers: {
    setIsPaperClassCreateDialogOpenStateStore: (state, action) => {
      state.isPaperClassCreateDialogOpenStateStore = action.payload;
    },
    setIsBulkPaperClassScheduleDialogOpenStateStore: (state, action) => {
      state.isBulkPaperClassScheduleDialogOpenStateStore = action.payload;
    },
    setIsUploadMarkingSchemeDialogOpenStateStore: (state, action) => {
      state.isUploadMarkingSchemeDialogOpenStateStore = action.payload;
    },
    setUploadOriginalPaper: (state, action) => {
      state.uploadOriginalPaper = action.payload;
    },
    setUploadMarkPaper: (state, action) => {
      state.uploadMarkPaper = action.payload;
    },
    setUploadMarkingScheme: (state, action) => {
      state.uploadMarkingScheme = action.payload;
    },
    setViewMarkPaper: (state, action) => {
      state.viewMarkPaper = action.payload;
    },
    setUploadLectureRecording: (state, action) => {
      state.uploadLectureRecording = action.payload;
    },

    setIsUploadOriginalPaperDialogOpenStateStore: (state, action) => {
      state.isUploadOriginalPaperDialogOpenStateStore = action.payload;
    },
    setIsViewOriginalPaperDialogOpenStateStore: (state, action) => {
      state.isViewOriginalPaperDialogOpenStateStore = action.payload;
    },
    setIsUpdateStudentPaperMarkDialogOpenStateStore: (state, action) => {
      state.isUpdateStudentPaperMarkDialogOpenStateStore = action.payload;
    },
    setIsUploadMarkPaperDialogOpenStateStore: (state, action) => {
      state.isUploadMarkPaperDialogOpenStateStore = action.payload;
    },
    setIsViewMarkPaperDialogOpenStateStore: (state, action) => {
      state.isViewMarkPaperDialogOpenStateStore = action.payload;
    },
    setIsUploadLectureRecordingDialogOpenStateStore: (state, action) => {
      state.isUploadLectureRecordingDialogOpenStateStore = action.payload;
    },
    setIsPaperClassViewModeActive: (state, action) => {
      state.isPaperClassViewModeActive = action.payload;
    },
    setIsCompletedPaperClassDialogOpenStateStore: (state, action) => {
      state.isCompletedPaperClassDialogOpenStateStore = action.payload;
    },
  },
});

export const { setIsPaperClassCreateDialogOpenStateStore,
  setIsBulkPaperClassScheduleDialogOpenStateStore,
  setIsUploadMarkingSchemeDialogOpenStateStore,
  setUploadOriginalPaper,
  setUploadMarkPaper,
  setViewMarkPaper,
  setUploadMarkingScheme,
  setUploadLectureRecording,
  setIsViewOriginalPaperDialogOpenStateStore,
  setIsUploadLectureRecordingDialogOpenStateStore,
  setIsUpdateStudentPaperMarkDialogOpenStateStore,
  setIsUploadMarkPaperDialogOpenStateStore,
  setIsPaperClassViewModeActive,
  setIsViewMarkPaperDialogOpenStateStore,
  setIsCompletedPaperClassDialogOpenStateStore,
  setIsUploadOriginalPaperDialogOpenStateStore } =
  paperClassSlice.actions;

export default paperClassSlice.reducer;
