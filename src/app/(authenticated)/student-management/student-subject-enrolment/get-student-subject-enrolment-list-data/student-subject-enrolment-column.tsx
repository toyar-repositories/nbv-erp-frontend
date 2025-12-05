"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/lib/state-store-hooks";
import { format } from "date-fns";
export default function StudentSubjectEnrolmentColumn(props: { row: any }) {
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
                    {row.original.full_name_with_title}
                  </div>
                </div>
                <div className="flex flex-row w-full gap-[24px] items-start mt-[8px]">
                  <div className="flex flex-col w-[130px] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Admission Number
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.admission_number}
                    </div>
                  </div>
                  <div className="flex flex-col w-[100px] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Grade
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.grade_level.name}
                    </div>
                  </div>
                  <div className="flex flex-col w-[100px] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Date of birth
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {format(row.original.date_of_birth, "dd MMM yyyy")}
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
                          setUpdatableStudentSubjectEnrolmentSupply({
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
                          setSelectedStudentSubjectEnrolmentSupply({
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
