"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { RotateCwIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { StudentSubjectEnrolmentDataTable } from "./student-subject-enrolment-data-table";
import { StudentSubjectEnrolmentColumns } from "./student-subject-enrolment-columns";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { studentManagementApi } from "@/api/student-management-api";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { setIsStudentSubjectEnrolmentCreateDialogOpenStateStore } from "@/state-store/slices/student-management/student-subject-enrolment.slice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/lib/state-store-hooks";
import { RootState } from "@/state-store/store";
import CreateUpdateStudentSubjectEnrolment from "../create-update-student-subject-enrolment/page";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import TPagination from "@/components/form-components/tpagination";
import TButton from "@/components/form-components/tbutton";

////////// USE STATE /////////////////////////////////////////////////
// const [student-subject-enrolmentList, setStudentSubjectEnrolmentList] = useState([] as any);

export default function DigitalTransformationPage() {
  const [
    getStudentSubjectEnrolmentListDataTrigger,
    getStudentSubjectEnrolmentListDataState,
  ] =
    studentManagementApi.endpoints.getStudentSubjectEnrolmentListData.useLazyQuery();

  const [studentSubjectEnrolmentList, setStudentSubjectEnrolmentList] =
    useState([] as any);
  const [isSaving, setIsSaving] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloadDataCausedByData, setReloadDataCausedByData] = useState(
    [] as any
  );

  const PAGE_SIZE = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // keys
  const [
    createUpdateStudentSubjectEnrolmentKey,
    setCreateUpdateStudentSubjectEnrolmentKey,
  ] = useState(+new Date());
  const router = useRouter();
  const dispatch = useDispatch();

  ////////// STATE STORE ///////////////////////////////////////////////
  const isStudentSubjectEnrolmentCreateDialogOpenStateStore = useAppSelector(
    (state: RootState) =>
      state.studentSubjectEnrolment
        .isStudentSubjectEnrolmentCreateDialogOpenStateStore
  );

  useEffect(() => {
    setLoading(false);
    setStudentSubjectEnrolmentList([]);
    setCurrentPage(1);
    setIsStudentSubjectEnrolmentCreateDialogOpenStateStore(false);
    //
    getStudentSubjectEnrolmentListDataTrigger({ page_size: PAGE_SIZE, page: 1 })
      .unwrap()
      .then((fulfilled) => {
        if (fulfilled?.data?.data) {
          setStudentSubjectEnrolmentList(fulfilled.data.data);
          setTotalPages(Math.ceil(fulfilled?.data?.total / PAGE_SIZE));
          setLoading(true);
        } else {
          // console.warn("No data found in response");
          setStudentSubjectEnrolmentList([]);
        }
      })
      .catch((rejected) => console.error("API Error:", rejected));
    setReloadData(false);
  }, []);

  useEffect(() => {
    if (reloadData) {
      setLoading(false);
      setStudentSubjectEnrolmentList([]);
      setCurrentPage(1);

      //
      getStudentSubjectEnrolmentListDataTrigger({
        page_size: PAGE_SIZE,
        page: 1,
      })
        .unwrap()
        .then((fulfilled) => {
          if (fulfilled?.data?.data) {
            setStudentSubjectEnrolmentList(fulfilled.data.data);
            setTotalPages(Math.ceil(fulfilled?.data?.total / PAGE_SIZE));
            setLoading(true);
          } else {
            // console.warn("No data found in response");
            setStudentSubjectEnrolmentList([]);
          }
        })
        .catch((rejected) => console.error("API Error:", rejected));
      setReloadData(false);
    }
  }, [reloadData]);
  return (
    <div className="w-full">
      <div className="flex w-full justify-start items-center">
        <div className="font-[600] ml-[4px]">Student Subject Enrolment</div>

        <div className="ml-[16px]">
          <TButton
            variant="outline"
            type="button"
            id="add-new-paper-class"
            className="ml-[16px] flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              dispatch(
                setIsStudentSubjectEnrolmentCreateDialogOpenStateStore(true)
              );
            }}
          >
            Student Subject Enrolment
          </TButton>
        </div>
      </div>
      <Toaster />
      <div className="flex flex-row w-full gap-[16px]">
        {/* Table start */}
        <div className="w-full max-w-[800px] mt-[8px]">
          <div className="w-full flex items-center justify-between bg-[#fff] py-[16px] px-[16px] border-solid border-[1px] border-[#ddd] relative z-[1] rounded-t-[4px] text-[14px] text-[#818181]">
            <span>Student Subject Enrolment</span>
            <div
              className="text-[#b8b8b8] cursor-pointer ml-[8px] flex items-center px-[8px] border-solid border-[1px] border-[#ddd] rounded-md text-[12px]"
              onClick={() => {
                setReloadData(true);
              }}
            >
              <RotateCwIcon className="w-[14px]" />
              <div className="ml-[4px]">Reload</div>
            </div>
          </div>
          <div className="bg-[#fff] w-full min-h-[calc(100vh-330px)] max-h-[calc(100vh-330px)] overflow-hidden mt-[-4px] border-solid border-[1px] border-[#e0e0e0]">
            <ScrollArea
              type="always"
              className="w-full min-h-[calc(100vh-290px)] max-h-[calc(100vh-290px)] overflow-hidden overflow-y-scroll"
            >
              <div
                className={cn(
                  "relative top-[16px] left-[16px] opacity-[0.5]",
                  loading ? "hidden" : "flex"
                )}
              >
                <svg
                  className="animate-spin h-5 w-5 text-current"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className={cn("w-full h-full")}>
                <StudentSubjectEnrolmentDataTable
                  columns={StudentSubjectEnrolmentColumns}
                  data={studentSubjectEnrolmentList}
                  columnVisibility={{
                    data: true,
                  }}
                />
              </div>
            </ScrollArea>
          </div>
          <div className="mt-[16px]">
            {loading && (
              <TPagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  getStudentSubjectEnrolmentListDataTrigger({
                    page_size: PAGE_SIZE,
                    page,
                  })
                    .unwrap()
                    .then((fulfilled) =>
                      setStudentSubjectEnrolmentList(fulfilled.data.data)
                    )
                    .catch((err) => console.error(err));
                }}
                className="mt-4"
              />
            )}
          </div>
        </div>
        {/* Table end */}
      </div>
      <div className="min-w-[540px] mt-[32px]"></div>
      {/* Dialog Start */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog
          open={isStudentSubjectEnrolmentCreateDialogOpenStateStore}
          aria-modal="true"
        >
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none rounded-b-[5px] w-[480px] max-w-[480px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">
                  New Student Subject Enrolment
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(
                      setIsStudentSubjectEnrolmentCreateDialogOpenStateStore(
                        false
                      )
                    );
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                <CreateUpdateStudentSubjectEnrolment
                  key={createUpdateStudentSubjectEnrolmentKey}
                  initialData={null}
                  setIsDialogOpen={
                    setIsStudentSubjectEnrolmentCreateDialogOpenStateStore
                  }
                  setIsSaving={setIsSaving}
                  setReloadData={setReloadData}
                  setReloadDataCausedByData={setReloadDataCausedByData}
                />
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
      {/* Dialog End */}
    </div>
  );
}
