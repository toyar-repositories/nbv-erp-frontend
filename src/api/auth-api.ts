import { setSessionUserInfo, setToken } from "@/state-store/slices/app.slice";
import { apiServer1 } from "./api-server-1";
import store from "@/state-store/store";

export const authApi = apiServer1
  .enhanceEndpoints({ addTagTypes: ["SomeTag"] })
  .injectEndpoints({
    endpoints: (build) => ({
      loginUser: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/user-management/user/sign-in",
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
        async onQueryStarted(arg, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            console.log(data);
            dispatch(setToken(data.data.token)); // Store the token in Redux slice
            dispatch(setSessionUserInfo(data.data)); // Store the user info in Redux slice
          } catch (error) {
            console.error("Login error:", error);
          }
        },
      }),
      logoutUser: build.mutation<any, any>({
        query(data: any) {
          return {
            url: "api/user-management/user/sign-out",
            method: "POST",
            body: data,
            credentials: "include",
            headers: {
              "X-Requested-With": "XMLHttpRequest",
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${store.getState().app.token}`,
            },
          };
        },
      }),
    }),
  });

export const { useLoginUserMutation, useLogoutUserMutation } = authApi;
