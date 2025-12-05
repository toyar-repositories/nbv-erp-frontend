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
import { setIsAuthenticated, setToken } from "@/state-store/slices/app.slice";

const THeaderUnauthenticated: React.FC<any> = () => {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);

  const dispatch = useDispatch();
  const [logoutUserTrigger, logoutUserState] =
    authApi.endpoints.logoutUser.useMutation();
  const [getUserListDataTrigger, getUserListDataState] =
    userManagementApi.endpoints.getUserListData.useLazyQuery();
  return (
    <div className="sticky top-0 z-50 shadow h-[50px] flex flex-row w-full gap-[8px] justify-between items-center px-[64px] py-[32px] bg-[#9b0737] text-[black]">
      <div className="flex flex-row justify-start items-center gap-[16px]">
        <div
          className="flex flex-col items-center justify-center bg-[#9b0737] px-[16px] py-[4px] rounded-[8px]"
          // onClick={() => {
          //   console.log("get user list");
          //   getUserListDataTrigger({
          //     page_size: 10,
          //     page: 1,
          //   })
          //     .unwrap()
          //     .then((fulfilled) => console.log(fulfilled))
          //     .catch((rejected) => console.error(rejected));
          // }}
        >
          <div className="font-[900] text-[16px] text-[white]">
            Institute Management System by TOYAR
          </div>
          {/* <div className="text-[16px] text-[white]">TOYAR</div> */}
        </div>
        {/* <div className="text-[white]">by</div> */}
        {/* <div className="flex flex-col items-center bg-[rgba(255,255,255,0.5)] py-[8px] px-[16px] rounded-[7px]">
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/nexis-college-international-logo.webp"
            alt=""
            width={200}
            height={44}
            priority
          />
        </div> */}
      </div>
    </div>
  );
};

export default THeaderUnauthenticated;
