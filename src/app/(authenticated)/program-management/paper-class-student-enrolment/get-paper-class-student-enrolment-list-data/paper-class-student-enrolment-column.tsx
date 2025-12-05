"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/lib/state-store-hooks";
import { format } from "date-fns";
import {
  setIsPaperMarkAddDialogOpenStateStore,
  setPaperMarkAdd,
} from "@/state-store/slices/program-management/paper-class-student-enrolment.slice";
import TButton from "@/components/form-components/tbutton";
import { cn } from "@/lib/utils";
export default function PaperClassStudentEnrolmentColumn(props: { row: any }) {
  ///////STATE STORE ///////////////////////////////////////////////
  const dispatch = useAppDispatch();
  const row = props.row;
  return (
    <>
      {!!row && !!row.original && (
        <div className="flex flex-row items-start w-full py-[8px] pl-[8px]">
          <div className="w-full">
            <div className="flex flex-row w-full h-full justify-between items-center pr-[32px]">
              <div className="flex flex-col w-full">
                <div className="flex flex-row w-full gap-[8px] items-center">
                  <div className="text-[14px] text-[#484848] font-[600]">
                    {row.original?.student.full_name_with_title}
                  </div>
                </div>
                <div className="flex flex-row w-full gap-[24px] items-start mt-[8px]">
                  <div className="flex flex-col w-[35%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Class
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {
                        row.original.paper_class.lecturer_time_schedule.lecturer
                          .name
                      }
                      {", "}
                      {
                        row.original.paper_class.lecturer_time_schedule.subject
                          .name
                      }
                    </div>
                  </div>
                  <div className="flex flex-col w-[15%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Date
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {format(
                        row.original.paper_class.class_date,
                        "dd MMM yyyy"
                      )}
                    </div>
                  </div>
                  {/* <div className="flex flex-col w-[30%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Duration
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.class_start_time} {" - "}
                      {row.original.class_end_time}
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="flex flex-col">
                {/* <div
                  className={cn(
                    "flex flex-row w-full gap-[8px]",
                    row.original.gd_folder_id ? "hidden" : ""
                  )}
                >
                  <div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="border-solid border-[1px] border-[#ddd] text-[12px] cursor-pointer"
                      onClick={() => {
                        dispatch(
                          setPaperMarkAdd({
                            ...row.original,
                          })
                        );
                        dispatch(setIsPaperMarkAddDialogOpenStateStore(true));
                      }}
                    >
                      Mark Add
                    </Button>
                  </div>
                </div> */}
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
                          setSelectedPaperClassStudentEnrolmentSupply({
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
