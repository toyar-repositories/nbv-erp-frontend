"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

import { useAppDispatch } from "@/lib/state-store-hooks";
import { format } from "date-fns";
import {
  setIsCompletedPaperClassDialogOpenStateStore,
  setIsPaperClassViewModeActive,
  setIsUpdateStudentPaperMarkDialogOpenStateStore,
  setIsUploadLectureRecordingDialogOpenStateStore,
  setIsUploadMarkingSchemeDialogOpenStateStore,
  setIsUploadOriginalPaperDialogOpenStateStore,
  setIsViewOriginalPaperDialogOpenStateStore,
  setUploadLectureRecording,
  setUploadMarkingScheme,
  setUploadOriginalPaper,
} from "@/state-store/slices/program-management/paper-class.slice";
import TButton from "@/components/form-components/tbutton";
import { cn } from "@/lib/utils";
import { programManagementApi } from "@/api/program-management-api";
import { CheckCircle, Clock } from "lucide-react";
export default function PaperClassColumn(props: { row: any }) {
  ///////STATE STORE ///////////////////////////////////////////////
  const dispatch = useAppDispatch();
  const row = props.row;

  const [getPaperClassStudentEnrolmentListDataTrigger] =
    programManagementApi.endpoints.getPaperClassStudentEnrolmentListData.useLazyQuery();

  return (
    <>
      {!!row && !!row.original && (
        <div className="flex flex-row items-start w-full py-[8px] pl-[8px]">
          <div className="w-full">
            <div className="flex flex-row w-full h-full justify-between items-center pr-[32px]">
              <div className="flex flex-col w-full">
                <div
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium w-fit",
                    row.original.is_completed
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  )}
                >
                  {row.original.is_completed ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Clock className="w-4 h-4 text-yellow-600" />
                      Pending
                    </>
                  )}
                </div>

                <div className="flex flex-row w-full gap-[8px] items-center">
                  <div className="text-[14px] text-[#484848] font-[600]">
                    {row.original.lecturer_time_schedule.lecturer.name}
                    {", "}
                    {row.original.lecturer_time_schedule.subject.name}
                  </div>
                </div>
                <div className="flex flex-row w-full items-start">
                  <div className="text-[12px] text-[#4e4e4e] font-[600]">
                    {row.original.serial_number}
                  </div>
                </div>
                <div className="flex flex-row w-full gap-[24px] items-start mt-[8px]">
                  <div className="flex flex-col w-[35%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Branch
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {row.original.branch.name}
                    </div>
                  </div>
                  <div className="flex flex-col w-[15%] items-start">
                    <div className="text-[#9d9d9d] font-[600] text-[11px] mb-[-3px]">
                      Date
                    </div>
                    <div className="text-[#484848] text-[13px]">
                      {format(row.original.class_date, "dd MMM yyyy")}
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
                <div
                  className={cn(
                    "flex flex-row w-full gap-[8px]",
                    row.original.gd_folder_id ? "hidden" : ""
                  )}
                >
                  <div>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="border-solid border-[1px] border-[#ddd] text-[11px] cursor-pointer p-[4px]"
                      onClick={() => {
                        dispatch(
                          setUploadOriginalPaper({
                            ...row.original,
                          })
                        );
                        dispatch(
                          setIsUploadOriginalPaperDialogOpenStateStore(true)
                        );
                      }}
                    >
                      Upload Original Paper
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-[8px]">
                {/* View Original Paper / Recording */}
                <div
                  className={cn(
                    "flex flex-row justify-end w-full gap-[8px]",
                    row.original.gd_folder_id ? "" : "hidden"
                  )}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    className="border border-[#ddd] text-[11px] cursor-pointer"
                    onClick={() => {
                      dispatch(setUploadOriginalPaper({ ...row.original }));
                      dispatch(
                        setIsViewOriginalPaperDialogOpenStateStore(true)
                      );
                    }}
                  >
                    View Original Paper / Recording
                  </Button>
                </div>

                {/* Update Student Mark */}
                <div
                  className={cn(
                    "flex flex-row justify-end w-full gap-[8px]",
                    row.original.gd_folder_id &&
                      row.original.is_completed === false
                      ? ""
                      : "hidden"
                  )}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    className="border border-[#ddd] text-[11px] cursor-pointer"
                    onClick={() => {
                      dispatch(setUploadOriginalPaper({ ...row.original }));
                      dispatch(
                        setIsUpdateStudentPaperMarkDialogOpenStateStore(true)
                      );
                      dispatch(setIsPaperClassViewModeActive(false));
                    }}
                  >
                    Update Student Mark
                  </Button>
                </div>
                {/* Update Student Mark */}
                <div
                  className={cn(
                    "flex flex-row justify-end w-full gap-[8px]",
                    row.original.is_completed ? "" : "hidden"
                  )}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    className="border border-[#ddd] text-[11px] cursor-pointer"
                    onClick={() => {
                      dispatch(setUploadOriginalPaper({ ...row.original }));
                      dispatch(
                        setIsUpdateStudentPaperMarkDialogOpenStateStore(true)
                      );
                      dispatch(setIsPaperClassViewModeActive(true));
                    }}
                  >
                    View Student Mark
                  </Button>
                </div>

                {/* Upload Recording */}
                <div
                  className={cn(
                    "flex flex-row justify-end w-full gap-[8px]",
                    row.original.gd_folder_id &&
                      row.original.is_uploaded_lecture_recording === false
                      ? ""
                      : "hidden"
                  )}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    className="border border-[#ddd] text-[11px] cursor-pointer"
                    onClick={() => {
                      dispatch(setUploadLectureRecording({ ...row.original }));
                      dispatch(
                        setIsUploadLectureRecordingDialogOpenStateStore(true)
                      );
                    }}
                  >
                    Upload Recording
                  </Button>
                </div>
                {/* Upload Marking Scheme */}
                <div
                  className={cn(
                    "flex flex-row justify-end w-full ",
                    row.original.gd_folder_id &&
                      row.original.is_uploaded_marking_scheme === false
                      ? ""
                      : "hidden"
                  )}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    className="border border-[#ddd] text-[11px] cursor-pointer"
                    onClick={() => {
                      dispatch(setUploadMarkingScheme({ ...row.original }));
                      dispatch(
                        setIsUploadMarkingSchemeDialogOpenStateStore(true)
                      );
                    }}
                  >
                    Upload Marking Scheme
                  </Button>
                </div>
                {/* Complete Paper Class */}
                <div
                  className={cn(
                    "flex flex-row justify-end w-full ",
                    row.original.gd_folder_id &&
                      row.original.is_completed === false
                      ? ""
                      : "hidden"
                  )}
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    className="border border-[#ddd] text-[11px] cursor-pointer"
                    onClick={() => {
                      dispatch(setUploadMarkingScheme({ ...row.original }));
                      dispatch(
                        setIsCompletedPaperClassDialogOpenStateStore(true)
                      );
                    }}
                  >
                    Complete Paper Class
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
