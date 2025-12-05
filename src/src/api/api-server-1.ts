import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiServer1 = createApi({
  reducerPath: "apiServer1",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API_SERVER_1,
    prepareHeaders: (headers, api: any) => {
      const token = api.getState().app.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
        headers.set("X-T", api.getState().app.sessionUserInfo.t);
      }
      headers.set("credentials", "include");

      return headers;
    },
  }),
  endpoints: () => ({}),
});
