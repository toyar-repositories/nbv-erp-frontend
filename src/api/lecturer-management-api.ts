import store from "@/state-store/store";
import { apiServer1 } from "./api-server-1";
export const lecturerManagementApi = apiServer1
  .enhanceEndpoints({})
  .injectEndpoints({
    endpoints: (build) => ({
      getLecturerTimeScheduleListData: build.query({
        query: (payload) => ({
          url: "api/lecturer-management/lecturer-time-schedule/get-lecturer-time-schedule-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getLecturerSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/lecturer-management/lecturer/get-lecturer-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getLecturerTimeScheduleSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/lecturer-management/lecturer-time-schedule/get-lecturer-time-schedule-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      createLecturerTimeSchedule: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/lecturer-management/lecturer-time-schedule/create-lecturer-time-schedule",
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

export const { } = lecturerManagementApi;
