import store from "@/state-store/store";
import { apiServer1 } from "./api-server-1";
export const programManagementApi = apiServer1
  .enhanceEndpoints({})
  .injectEndpoints({
    endpoints: (build) => ({
      //get
      getGradeLevelSelectListDataState: build.query({
        query: (payload) => ({
          url: "api/program-management/grade-level/get-grade-level-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getCurriculumSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/program-management/curriculum/get-curriculum-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getSubjectSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/program-management/subject/get-subject-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getPaperNameSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/program-management/paper-name/get-paper-name-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getPaperTypeSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/program-management/paper-type/get-paper-type-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getPaperSetSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/program-management/paper-set/get-paper-set-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getPaperSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/program-management/paper/get-paper-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getPaperClassListData: build.query({
        query: (payload) => ({
          url: "api/program-management/paper-class/get-paper-class-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getPaperClassStudentEnrolmentListData: build.query({
        query: (payload) => ({
          url: "api/program-management/paper-class-student-enrolment/get-paper-class-student-enrolment-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getPaperSetListData: build.query({
        query: (payload) => ({
          url: "api/program-management/paper-set/get-paper-set-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getPaperSetTableListData: build.query({
        query: (payload) => ({
          url: "api/program-management/paper-set/get-paper-set-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),

      //insert
      createPaperClass: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-class/create-paper-class",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),
      createBulkPaperClassSchedule: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-class/create-bulk-paper-class-schedule",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),

      createStudentReport: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/student-report/create-student-report",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),

      updatePaperMark: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-class-student-enrolment/update-paper-mark",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),
      updateStudentPaperMark: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-class-student-enrolment/update-bulk-student-paper-mark",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),
      uploadMarkPaper: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-class-student-enrolment/update-student-mark-paper-mark",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),
      createPaperSet: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-set/create-paper-set",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),
      createPaper: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper/create-paper",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),
      uploadOriginalPaper: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-class/upload-original-paper",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),
      uploadMarkingScheme: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-class/upload-marking-scheme",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),
      uploadLectureRecording: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-class/upload-lecture-recording",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),

      uploadLectureRecordingChunk: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-class/upload-lecture-recording-chunk",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              // ❌ REMOVE THIS:
              // "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),

      completedPaperClass: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/program-management/paper-class/completed-paper-class",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              Accept: "application/json",
            },
          };
        },
      }),

    }),
  });

export const { } = programManagementApi;
