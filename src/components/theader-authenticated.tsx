import { authApi } from "@/api/auth-api";
import { userManagementApi } from "@/api/user-management-api";
import { useAppSelector } from "@/lib/state-store-hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  setIsAuthenticated,
  setSessionUserInfo,
  setToken,
} from "@/state-store/slices/app.slice";

const THeaderAuthenticated: React.FC<any> = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);

  const dispatch = useDispatch();
  const [logoutUserTrigger, logoutUserState] =
    authApi.endpoints.logoutUser.useMutation();
  const [getUserListDataTrigger, getUserListDataState] =
    userManagementApi.endpoints.getUserListData.useLazyQuery();

  return (
    <div className="sticky top-0 z-50 shadow h-[50px] flex flex-row w-full gap-[8px] justify-between items-center px-[64px] py-[32px] bg-linear-to-t from-sky-500 to-indigo-500 text-[black]">
      <div
        onClick={() => {
          router.push("/");
        }}
        className="cursor-pointer flex flex-row justify-start items-center gap-[16px]"
      >
        <div className="font-[900] text-[20px] text-white">
          Institute Management System
        </div>
        <div className="flex items-center justify-center bg-[rgba(255,255,255,0.5)] py-[8px] px-[16px] rounded-[7px]">
          <div className="flex flex-row items-center gap-3 px-[8px] rounded-[7px]">
            <Image
              className="h-auto dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/logo.png"
              alt="Company Logo"
              width={38}
              height={38}
              priority
            />
            <div className="font-[900] text-[20px] text-white">
              {useAppSelector(
                (state) => state.app.sessionUserInfo?.company_info.name
              )}
            </div>
          </div>
        </div>
        {/* <div className="text-[white]">by</div> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex flex-row justify-start items-center gap-[8px] px-[8px] cursor-pointer text-[white]">
            <Image
              className="relative w-[50px] dark:drop-shadow-[0_0_0.3rem_#ffffff70] light:bg-[#ddd] light:invert"
              src="/user.png"
              alt=""
              width={64}
              height={64}
              priority
            />
            <div className="flex flex-col items-start justify-center">
              <div>
                {useAppSelector(
                  (state) => state.app.sessionUserInfo?.full_name
                )}
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
          {/* <DropdownMenuSeparator /> */}
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              console.log("sign out");
              logoutUserTrigger({ test: 123 })
                .unwrap()
                .then((fulfilled) => {
                  dispatch(setToken(null));
                  dispatch(setSessionUserInfo(null));
                  dispatch(setIsAuthenticated(false));
                  // router.push("/");
                })
                .catch((rejected) => {
                  console.error(rejected);
                });
            }}
          >
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default THeaderAuthenticated;
