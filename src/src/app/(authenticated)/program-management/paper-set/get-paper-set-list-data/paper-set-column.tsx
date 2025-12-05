"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/lib/state-store-hooks";
import { format } from "date-fns";
import TButton from "@/components/form-components/tbutton";
import { cn } from "@/lib/utils";
import { programManagementApi } from "@/api/program-management-api";
import {
  setIsGeneratePaperMarkDialogOpenStateStore,
  setPaperSetData,
} from "@/state-store/slices/program-management/paper-set.slice";
export default function PaperSetColumn(props: { row: any }) {
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
                    {/* {row.original.lecturer_time_schedule.lecturer.name} */}
                  </div>
                </div>
                <div className="flex flex-row w-full items-start">
                  <div className="text-[12px] text-[#4e4e4e] font-[600]">
                    {/* {row.original.serial_number} */}
                  </div>
                </div>
                <div className="flex flex-row w-full gap-[24px] items-start mt-[8px]">
                  <div className="flex flex-col w-[25%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Paper Set Name
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.name}
                    </div>
                  </div>
                  <div className="flex flex-col w-[40%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Subject
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.subject.name}
                    </div>
                  </div>
                  <div className="flex flex-col w-[30%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Branch
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.branch.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                {/* Generate Student Report */}
                <div
                  className={cn(
                    "flex flex-row w-full gap-[8px]",
                    row.original.is_generate_student_report ? "hidden" : ""
                  )}
                >
                  <div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="border-solid border-[1px] border-[#ddd] text-[11px] cursor-pointer"
                      onClick={() => {
                        dispatch(
                          setPaperSetData({
                            ...row.original,
                          })
                        );
                        dispatch(
                          setIsGeneratePaperMarkDialogOpenStateStore(true)
                        );
                      }}
                    >
                      Generate Student Report
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
