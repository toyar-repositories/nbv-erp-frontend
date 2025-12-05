import { userManagementApi } from "@/api/user-management-api";
import { useAppSelector } from "@/lib/state-store-hooks";
import React from "react";
// import styles from './MyComponent.module.css';
// interface MyComponentProps {
//   message: string;
// }

import { useDispatch } from "react-redux";
const TFooter: React.FC<any> = () => {
  const dispatch = useDispatch();

  const [getUserListDataTrigger, getUserListDataState] =
    userManagementApi.endpoints.getUserListData.useLazyQuery();
  return (
    <div className="h-[24px] bg-[#e2e2e7] z-[10] flex w-full items-center px-[16px]">
      <div className="w-[50%]">
        <div className="text-[16px]"></div>
      </div>
      <div className="flex justify-end w-full">
        <div
          className="text-[11px] text-[#5e5e60]"
          onClick={() => {
            getUserListDataTrigger({
              page_size: 10,
              page: 1,
            })
              .unwrap()
              .then((fulfilled) => {
                console.log(fulfilled);
                // dispatch(setMyData1(fulfilled.data.hello));
              })
              .catch((rejected) => console.error(rejected));
          }}
        >
          Powered by TOYAR © {new Date().getFullYear()}{" "}
        </div>
      </div>
    </div>
    // // <div className="bg-[#ddd] z-50 h-[30px] text-[14px] flex w-full justify-end  px-[50px] text-[#5e5e5e] text-right">
    //   {/* <span className="ml-2 text-gray-600">
    //     © {new Date().getFullYear()} Powered by <strong>TOYAR</strong>
    //   </span> */}
    //   {/* <div>
    //     © {new Date().getFullYear()} Noble Vision Institute. All rights
    //     <span className="ml-2 text-gray-500">
    //       | v
    //       {useAppSelector(
    //         (state) => state.app.sessionUserInfo.company_info?.version
    //       )}
    //     </span> */}
    //   {/* </div> */}
    //   {/* <div
    //     onClick={() => {
    //       getUserListDataTrigger({
    //         page_size: 10,
    //         page: 1,
    //       })
    //         .unwrap()
    //         .then((fulfilled) => {
    //           console.log(fulfilled);
    //           dispatch(setMyData1(fulfilled.data.hello));
    //         })
    //         .catch((rejected) => console.error(rejected));
    //     }}
    //   >
    //     © {new Date().getFullYear()} Nexis College International. All rights
    //   </div> */}
    // // </div>
  );
};

export default TFooter;
