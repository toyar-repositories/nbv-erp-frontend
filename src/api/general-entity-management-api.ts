import store from "@/state-store/store";
import { apiServer1 } from "./api-server-1";
export const generalEntityManagementApi = apiServer1
  .enhanceEndpoints({})
  .injectEndpoints({
    endpoints: (build) => ({
      getPersonTitleListData: build.query({
        query: (payload) => ({
          url: "api/general-entity-management/person-title/get-person-title-select-data",
          method: "POST",
          data: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getBranchSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/general-entity-management/branch/get-branch-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getClassRoomSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/general-entity-management/class-room/get-class-room-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
      getExamTypeSelectListDataStste: build.query({
        query: (payload) => ({
          url: "api/general-entity-management/exam-type/get-exam-type-select-list-data",
          method: "POST",
          body: payload,
          prepareHeaders: async (headers: any, api: any) => {
            headers.set("Content-Type", "application/json; charset=UTF-8");
            headers.set("Accept", "application/json");
            return headers;
          },
        }),
      }),
    }),
  });

export const { } = generalEntityManagementApi;
