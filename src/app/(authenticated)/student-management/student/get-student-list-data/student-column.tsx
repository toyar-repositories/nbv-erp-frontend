"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/lib/state-store-hooks";
import { format } from "date-fns";
import {
  setIsUpdateDialogOpenStateStore,
  setUpdatableStudent,
} from "@/state-store/slices/student-management/student.slice";
import { cn } from "@nextui-org/react";
export default function StudentColumn(props: { row: any }) {
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
                <div className="flex flex-row w-full gap-[8px] items-center gap-[24px]">
                  <div className="text-[14px] text-[#484848] font-[600]">
                    {row.original.full_name_with_title}
                  </div>
                  {(row.original?.exam_type?.name ||
                    row.original?.exam_type?.code) && (
                    <div className="border rounded-[8px] p-[4px] border-solid border-[#ddd] text-[11px] bg-[#f7f7f7]">
                      {row.original?.exam_type?.name}
                      {row.original?.exam_type?.code &&
                        ` - ${row.original.exam_type.code}`}
                    </div>
                  )}
                </div>
                <div className="flex flex-row w-full gap-[24px] items-start mt-[8px]">
                  <div className="flex flex-col w-[100px] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Admission Number
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.admission_number}
                    </div>
                  </div>
                  <div className="flex flex-col w-[70px] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Password
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original?.user?.password_new}
                    </div>
                  </div>
                  <div className="flex flex-col w-[80px] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Branch
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original?.branch.name}
                    </div>
                  </div>

                  <div className="flex flex-col w-[50px] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Grade
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original?.grade_level.name}
                    </div>
                  </div>
                  <div className="flex flex-col w-[100px] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Enrolled Subjects
                    </div>
                    <div>
                      {row.original.subject_list.length > 0 &&
                        row.original.subject_list.map(
                          (item: any, index: number) => (
                            <span key={index + item.name}>
                              {item.name}
                              {index < row.original.subject_list.length - 1
                                ? ", "
                                : ""}
                            </span>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col ml-[8px]">
                <div className={cn("flex flex-row w-full gap-[8px]")}>
                  <div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="border-solid border-[1px] border-[#ddd] text-[11px] cursor-pointer"
                      onClick={() => {
                        dispatch(
                          setUpdatableStudent({
                            ...row.original,
                          })
                        );
                        dispatch(setIsUpdateDialogOpenStateStore(true));
                      }}
                    >
                      Edit
                    </Button>
                  </div>
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
                          setSelectedStudentSupply({
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
