"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/lib/state-store-hooks";
export default function LecturerTimeScheduleColumn(props: { row: any }) {
  ///////STATE STORE ///////////////////////////////////////////////
  const dispatch = useAppDispatch();
  const row = props.row;
  console.log(row.original);
  return (
    <>
      {!!row && !!row.original && (
        <div className="flex flex-row items-start w-full py-[8px] pl-[8px]">
          <div className="w-full">
            <div className="flex flex-row w-full h-full justify-between items-center pr-[32px]">
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-full gap-[8px] items-center">
                  <div className="text-[14px] text-[#484848] font-[600]">
                    {row.original.lecturer.name}
                  </div>
                </div>
                <div className="flex flex-row w-full gap-[24px] items-start mt-[8px]">
                  <div className="flex flex-col w-[35%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Subject
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.subject.name}
                    </div>
                  </div>
                  <div className="flex flex-col w-[15%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Day
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.day}
                    </div>
                  </div>
                  <div className="flex flex-col w-[30%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Duration
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.class_start_time} {" - "}
                      {row.original.class_end_time}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row w-full gap-[8px]">
                  {/* <div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="border-solid border-[1px] border-[#ddd]"
                      onClick={() => {
                        dispatch(
                          setUpdatableLecturerTimeScheduleSupply({
                            ...row.getValue("data"),
                          })
                        );
                        dispatch(setIsUpdateDialogOpenStateStore(true));
                      }}
                    >
                      Edit
                    </Button>
                  </div> */}
                </div>
              </div>
              {/* <div className="flex flex-col">
                <div className="flex flex-row w-full gap-[8px]">
                  <div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="border-solid border-[1px] border-[#ddd]"
                      onClick={() => {
                        dispatch(
                          setSelectedLecturerTimeScheduleSupply({
                            ...row.getValue("data"),
                          })
                        );
                        dispatch(setIsViewDialogOpenStateStore(true));
                      }}
                    >
                      View
                    </Button>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
