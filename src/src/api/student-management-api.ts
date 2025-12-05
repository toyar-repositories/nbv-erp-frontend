import store from "@/state-store/store";
import { apiServer1 } from "./api-server-1";
export const studentManagementApi = apiServer1
  .enhanceEndpoints({})
  .injectEndpoints({
    endpoints: (build) => ({
      //get
      getStudentListData: build.query({
        query: (payload) => ({
          url: "api/student-management/student/get-student-list-data",
          method: "POST",
          data: payload,
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getStudentSubjectEnrolmentListData: build.query({
        query: (payload) => ({
          url: "api/student-management/student-subject-enrolment/get-student-subject-enrolment-list-data",
          method: "POST",
          data: payload,
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getStudentSelectListData: build.query({
        query: (payload) => ({
          url: "api/student-management/student/get-student-select-list-data",
          method: "POST",
          data: payload,
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      //insert
      createStudent: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/student-management/student/create-student",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),

      createStudentSubjectEnrolment: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/student-management/student-subject-enrolment/create-student-subject-enrolment",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),

      //update
      updateStudent: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/student-management/student/update-student",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          };
        },
      }),
    }),
  });

export const { } = studentManagementApi;
