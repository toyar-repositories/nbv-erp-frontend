"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { RotateCwIcon, Upload, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userManagementApi } from "@/api/user-management-api";
import { Button } from "@/components/ui/button";
import {
  setIsPaperClassCreateDialogOpenStateStore,
  setIsBulkPaperClassScheduleDialogOpenStateStore,
  setIsUploadOriginalPaperDialogOpenStateStore,
  setIsViewOriginalPaperDialogOpenStateStore,
  setIsUpdateStudentPaperMarkDialogOpenStateStore,
  setIsUploadMarkPaperDialogOpenStateStore,
  setIsViewMarkPaperDialogOpenStateStore,
  setViewMarkPaper,
  setIsUploadLectureRecordingDialogOpenStateStore,
  setIsUploadMarkingSchemeDialogOpenStateStore,
  setIsCompletedPaperClassDialogOpenStateStore,
} from "@/state-store/slices/program-management/paper-class.slice";
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
import CreateUpdatePaperClass from "../create-update-paper-class/page";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import TPagination from "@/components/form-components/tpagination";
import { programManagementApi } from "@/api/program-management-api";
import { PaperClassDataTable } from "@/app/(authenticated)/program-management/paper-class/get-paper-class-list-data/paper-class-data-table";
import { PaperClassColumns } from "@/app/(authenticated)/program-management/paper-class/get-paper-class-list-data/paper-class-columns";
import CreateUpdateBulkPaperClassSchedule from "@/app/(authenticated)/program-management/paper-class/create-update-bulk-paper-class-schedule/page";
import UploadOriginalPaper from "@/app/(authenticated)/program-management/paper-class/upload-original-paper/page";
import TButton from "@/components/form-components/tbutton";
import UpdateStudentPaperMark from "@/app/(authenticated)/program-management/paper-class/update-student-paper-mark/page";
import UploadMarkPaper from "@/app/(authenticated)/program-management/paper-class/upload-mark-paper/page";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chip, Spinner } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import UploadLectureRecording from "@/app/(authenticated)/program-management/paper-class/upload-lecture-recording/page";
import { setIsPaperSetCreateDialogOpenStateStore } from "@/state-store/slices/program-management/paper-set.slice";
import CreateUpdatePaperSet from "@/app/(authenticated)/program-management/paper-set/create-update-paper-set/page";
import { setIsPaperCreateDialogOpenStateStore } from "@/state-store/slices/program-management/paper.slice";
import CreateUpdatePaper from "@/app/(authenticated)/program-management/paper/create-update-paper/page";
import UploadMarkingScheme from "@/app/(authenticated)/program-management/paper-class/upload-marking-scheme/page";
import TToast from "@/components/form-components/ttoast";

////////// USE STATE /////////////////////////////////////////////////

export default function DigitalTransformationPage() {
  const [getPaperClassListDataTrigger, getPaperClassListDataState] =
    programManagementApi.endpoints.getPaperClassListData.useLazyQuery();

  const [completedPaperClassTrigger] =
    programManagementApi.endpoints.completedPaperClass.useMutation();

  const [groupFilterList, setGroupFilterList] = useState([] as any);
  const [groupFilterList2, setGroupFilterList2] = useState([] as any);
  const [groupFilter, setGroupFilter] = useState("This Week");
  const [lecturerList, setLecturerList] = useState([] as any);
  const [paperClassList, setPaperClassList] = useState([] as any);
  const [isSaving, setIsSaving] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [reloadDataCausedByData, setReloadDataCausedByData] = useState(
    [] as any
  );
  const [loading, setLoading] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const PAGE_SIZE = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // keys
  const [createUpdatePaperClassKey, setCreateUpdatePaperClassKey] = useState(
    +new Date()
  );
  const [
    createUpdateBulkPaperClassScheduleKey,
    setCreateUpdateBulkPaperClassScheduleKey,
  ] = useState(+new Date());
  const [createUploadOriginalPaperKey, setCreateUploadOriginalPaperKey] =
    useState(+new Date());

  const router = useRouter();
  const dispatch = useDispatch();
  const SEARCH_FILTER_LIST = {
    is_active: true,
  };

  ////////// STATE STORE ///////////////////////////////////////////////
  const isPaperClassCreateDialogOpenStateStore = useAppSelector(
    (state: RootState) =>
      state.paperClass.isPaperClassCreateDialogOpenStateStore
  );
  const isBulkPaperClassScheduleDialogOpenStateStore = useAppSelector(
    (state: RootState) =>
      state.paperClass.isBulkPaperClassScheduleDialogOpenStateStore
  );
  const isUploadOriginalPaperDialogOpenStateStore = useAppSelector(
    (state: RootState) =>
      state.paperClass.isUploadOriginalPaperDialogOpenStateStore
  );
  const isViewOriginalPaperDialogOpenStateStore = useAppSelector(
    (state: RootState) =>
      state.paperClass.isViewOriginalPaperDialogOpenStateStore
  );
  const uploadOriginalPaper = useAppSelector(
    (state: RootState) => state.paperClass.uploadOriginalPaper
  );
  const uploadMarkPaper = useAppSelector(
    (state: RootState) => state.paperClass.uploadMarkPaper
  );
  const isUpdateStudentPaperMarkDialogOpenStateStore = useAppSelector(
    (state: RootState) =>
      state.paperClass.isUpdateStudentPaperMarkDialogOpenStateStore
  );
  const isUploadMarkPaperDialogOpenStateStore = useAppSelector(
    (state: RootState) => state.paperClass.isUploadMarkPaperDialogOpenStateStore
  );
  const isViewMarkPaperDialogOpenStateStore = useAppSelector(
    (state: RootState) => state.paperClass.isViewMarkPaperDialogOpenStateStore
  );
  const viewMarkPaper = useAppSelector(
    (state: RootState) => state.paperClass.viewMarkPaper
  );
  const uploadLectureRecording = useAppSelector(
    (state: RootState) => state.paperClass.uploadLectureRecording
  );
  const isUploadLectureRecordingDialogOpenStateStore = useAppSelector(
    (state: RootState) =>
      state.paperClass.isUploadLectureRecordingDialogOpenStateStore
  );
  const isPaperSetCreateDialogOpenStateStore = useAppSelector(
    (state: RootState) => state.paperSet.isPaperSetCreateDialogOpenStateStore
  );
  const isPaperCreateDialogOpenStateStore = useAppSelector(
    (state: RootState) => state.paper.isPaperCreateDialogOpenStateStore
  );
  const uploadMarkingScheme = useAppSelector(
    (state: RootState) => state.paperClass.uploadMarkingScheme
  );
  const isUploadMarkingSchemeDialogOpenStateStore = useAppSelector(
    (state: RootState) =>
      state.paperClass.isUploadMarkingSchemeDialogOpenStateStore
  );
  const isCompletedPaperClassDialogOpenStateStore = useAppSelector(
    (state: RootState) =>
      state.paperClass.isCompletedPaperClassDialogOpenStateStore
  );

  /////////////////////USE EFFECT ////////////////////////////////////
  useEffect(() => {
    setLoading(false);
    setPaperClassList([]);
    setCurrentPage(1);
    setLecturerList([]);
    setGroupFilterList2([]);

    dispatch(setIsPaperClassCreateDialogOpenStateStore(false));
    dispatch(setIsViewOriginalPaperDialogOpenStateStore(false));
    dispatch(setIsUploadOriginalPaperDialogOpenStateStore(false));
    dispatch(setIsBulkPaperClassScheduleDialogOpenStateStore(false));
    dispatch(setIsUpdateStudentPaperMarkDialogOpenStateStore(false));
    dispatch(setIsUploadMarkPaperDialogOpenStateStore(false));
    dispatch(setIsViewMarkPaperDialogOpenStateStore(false));
    //
    getPaperClassListDataTrigger({
      page_size: PAGE_SIZE,
      page: 1,
      search_filter_list: SEARCH_FILTER_LIST,
      search_phrase: searchPhrase,
      group_filter: groupFilter,
    })
      .unwrap()
      .then((fulfilled) => {
        if (fulfilled?.data?.data) {
          setPaperClassList(fulfilled.data.data);
          setTotalPages(Math.ceil(fulfilled?.data?.total / PAGE_SIZE));
          setLoading(true);
          setLecturerList(fulfilled.data.lecturer_list_count);
          setGroupFilterList2(fulfilled.data.paper_class_period_count);
          setGroupFilterList(fulfilled.data.paper_class_count);
        } else {
          // console.warn("No data found in response");
          setPaperClassList([]);
        }
      })
      .catch((rejected) => console.error("API Error:", rejected));
    setReloadData(false);
  }, []);

  useEffect(() => {
    if (reloadData) {
      setLoading(false);
      setPaperClassList([]);
      setCurrentPage(1);
      setLecturerList([]);
      setGroupFilter("This Week");

      dispatch(setIsPaperClassCreateDialogOpenStateStore(false));
      dispatch(setIsViewOriginalPaperDialogOpenStateStore(false));
      dispatch(setIsUploadOriginalPaperDialogOpenStateStore(false));
      dispatch(setIsBulkPaperClassScheduleDialogOpenStateStore(false));
      // dispatch(setIsUpdateStudentPaperMarkDialogOpenStateStore(false));
      //
      getPaperClassListDataTrigger({
        page_size: PAGE_SIZE,
        page: 1,
        search_filter_list: SEARCH_FILTER_LIST,
        search_phrase: searchPhrase,
        group_filter: groupFilter,
      })
        .unwrap()
        .then((fulfilled) => {
          if (fulfilled?.data?.data) {
            setPaperClassList(fulfilled.data.data);
            setTotalPages(Math.ceil(fulfilled?.data?.total / PAGE_SIZE));
            setLoading(true);
            setLecturerList(fulfilled.data.lecturer_list_count);
            setGroupFilterList2(fulfilled.data.paper_class_period_count);
            setGroupFilterList(fulfilled.data.paper_class_count);
          } else {
            // console.warn("No data found in response");
            setPaperClassList([]);
          }
        })
        .catch((rejected) => console.error("API Error:", rejected));
      setReloadData(false);
    }
  }, [reloadData]);

  useEffect(() => {
    setLoading(false);
    setPaperClassList([]);
    setCurrentPage(1);
    setLecturerList([]);

    //
    getPaperClassListDataTrigger({
      page_size: PAGE_SIZE,
      page: 1,
      search_filter_list: SEARCH_FILTER_LIST,
      search_phrase: searchPhrase,
      group_filter: groupFilter,
    })
      .unwrap()
      .then((fulfilled) => {
        if (fulfilled?.data?.data) {
          setPaperClassList(fulfilled.data.data);
          setTotalPages(Math.ceil(fulfilled?.data?.total / PAGE_SIZE));
          setLoading(true);
          // setLecturerList(fulfilled.data.lecturer_list_count);
          setGroupFilterList2(fulfilled.data.paper_class_period_count);
          setGroupFilterList(fulfilled.data.paper_class_count);
        } else {
          setPaperClassList([]);
        }
      })
      .catch((rejected) => console.error("API Error:", rejected));
  }, [groupFilter]);

  const completedPaperClassSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await completedPaperClassTrigger({ paper_class_id: data.id }).unwrap();
      toast.success("Completed Paper CLass Successfully!");
      dispatch(setIsCompletedPaperClassDialogOpenStateStore(false));
      setReloadData(true);
    } catch (err: any) {
      TToast({
        label: "Error",
        description: err?.data?.message || "Something went wrong.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full">
      <div className="flex w-full justify-start items-center mt-[8px]">
        <div className="font-[600] ml-[4px]">Paper Class</div>

        {/* <div className="ml-[16px]">
          <TButton
            variant="outline"
            type="button"
            id="add-new-paper-class"
            className="ml-[16px] flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              dispatch(setIsPaperClassCreateDialogOpenStateStore(true));
            }}
          >
            Add New Paper Class
          </TButton>
        </div> */}
        <div className="ml-[16px]">
          <TButton
            variant="outline"
            type="button"
            id="add-new-paper-class"
            className="ml-[16px] flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              dispatch(setIsBulkPaperClassScheduleDialogOpenStateStore(true));
            }}
          >
            Paper Class Schedule
          </TButton>
        </div>
      </div>
      <Toaster />
      {/* <div className="flex flex-row w-full gap-[16px]"> */}
      <div className="flex flex-row w-full gap-[16px] mt-[23px]">
        {/* {!!lecturerList && lecturerList.length > 0 && ( */}
        <div className="flex flex-row bg-[#d8ecff] rounded-[5px] min-w-[230px] min-h-[calc(100vh-800px)] mt-[8px] py-[8px] overflow-hidden overflow-y-auto">
          <Tabs
            defaultValue="All"
            className="w-full py-[0] border-none bg-[#d8ecff]"
            value={groupFilter}
            onValueChange={(value: any) => {
              setGroupFilter(value);
            }}
          >
            <TabsList className="flex flex-col gap-[8px] bg-[#d8ecff] mt-[125px] py-[8px] px-[18px] border-none">
              <TabsTrigger
                key="All"
                value="All"
                className="w-full flex flex-row justify-between px-[8px] py-[1px] cursor-pointer text-[#686868] mt-[4px]"
              >
                <div>All</div>
                {groupFilterList === null || groupFilterList === 0 ? (
                  <Chip
                    variant="light"
                    radius="lg"
                    size="sm"
                    className={cn("ml-[56px] text-[12px]")}
                  >
                    0
                  </Chip>
                ) : (
                  <Chip
                    variant="light"
                    radius="lg"
                    size="sm"
                    className={cn("ml-[56px] text-[12px]")}
                  >
                    {groupFilterList}
                  </Chip>
                )}
              </TabsTrigger>
              <div className="w-full">
                <div className="flex w-full">
                  <div className="text-[#686868] text-[14px] ml-[8px] mb-[0] p-[0] pt-[8px]">
                    Period
                  </div>
                </div>
                <Separator className="mb-[8px] bg-[#d1d1d1]" />
              </div>
              {groupFilterList2.length > 0 &&
                groupFilterList2.map((item: any) => {
                  return (
                    <TabsTrigger
                      key={item.name}
                      value={item.name}
                      className="w-full flex flex-row justify-between px-[8px] py-[1px] cursor-pointer text-[#686868] mt-[4px]"
                    >
                      <div>{item.name}</div>
                      {item.period_count === null || item.period_count === 0 ? (
                        <Chip
                          variant="light"
                          radius="lg"
                          size="sm"
                          className={cn("ml-[56px] text-[12px]")}
                        >
                          0
                        </Chip>
                      ) : (
                        <Chip
                          variant="light"
                          radius="lg"
                          size="sm"
                          className={cn("ml-[56px] text-[12px]")}
                        >
                          {item.period_count}
                        </Chip>
                      )}
                    </TabsTrigger>
                  );
                })}
            </TabsList>
          </Tabs>
        </div>
        {/* )} */}
        {/* Table start */}
        <div className="w-full max-w-[800px] mt-[8px]">
          <div className="w-full flex items-center justify-between bg-[#fff] py-[16px] px-[16px] border-solid border-[1px] border-[#ddd] relative z-[1] rounded-t-[4px] text-[14px] text-[#818181]">
            <div className="flex flex-row justify-start gap-[32px]">
              <span>Paper Class</span>
              <div className="flex flex-row justify-start gap-[8px]">
                <input
                  className="border-solid border-[1px] border-[#ddd] rounded-[5px] px-[8px]"
                  type="text"
                  placeholder="Search..."
                  value={searchPhrase}
                  onChange={(e) => setSearchPhrase(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      setReloadData(true);
                    }
                  }}
                />
                <div
                  className="px-[8px] py-[2px] rounded-[5px] cursor-pointer text-[12px] bg-[#fbfbfb] border-solid border-[1px] border-[#ddd]"
                  onClick={() => {
                    setSearchPhrase("");
                    setReloadData(true);
                  }}
                >
                  Clear Search
                </div>
              </div>
            </div>
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
          <div className="bg-[#fff] w-full min-h-[calc(100vh-340px)] max-h-[calc(100vh-340px)] overflow-hidden mt-[-4px] border-solid border-[1px] border-[#e0e0e0]">
            <ScrollArea
              type="always"
              className="w-full min-h-[calc(100vh-340px)] max-h-[calc(100vh-340px)] overflow-hidden overflow-y-scroll"
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
                <PaperClassDataTable
                  columns={PaperClassColumns}
                  data={paperClassList}
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
                  getPaperClassListDataTrigger({
                    page_size: PAGE_SIZE,
                    page,
                    search_phrase: searchPhrase,
                  })
                    .unwrap()
                    .then((fulfilled) => setPaperClassList(fulfilled.data.data))
                    .catch((err) => console.error(err));
                }}
                className="mt-4"
              />
            )}
          </div>
        </div>
        {/* Table end */}
      </div>
      {/* Dialog Start create */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog open={isPaperClassCreateDialogOpenStateStore} aria-modal="true">
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[800px] max-w-[800px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">New Paper Class</div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(setIsPaperClassCreateDialogOpenStateStore(false));
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                <CreateUpdatePaperClass
                  key={createUpdatePaperClassKey}
                  initialData={null}
                  setIsDialogOpen={setIsPaperClassCreateDialogOpenStateStore}
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
      {/* Dialog Start Bulk Create */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog
          open={isBulkPaperClassScheduleDialogOpenStateStore}
          aria-modal="true"
        >
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[700px] max-w-[700px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">Paper Class Schedule</div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(
                      setIsBulkPaperClassScheduleDialogOpenStateStore(false)
                    );
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                <CreateUpdateBulkPaperClassSchedule
                  key={createUpdateBulkPaperClassScheduleKey}
                  initialData={null}
                  setIsDialogOpen={
                    setIsBulkPaperClassScheduleDialogOpenStateStore
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
      {/* Dialog Upload Original Paper */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog
          open={isUploadOriginalPaperDialogOpenStateStore}
          aria-modal="true"
        >
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[800px] max-w-[800px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">
                  Upload Original Paper {uploadOriginalPaper?.serial_number}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(
                      setIsUploadOriginalPaperDialogOpenStateStore(false)
                    );
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                <UploadOriginalPaper
                  key={createUploadOriginalPaperKey}
                  initialData={uploadOriginalPaper}
                  setIsDialogOpen={setIsUploadOriginalPaperDialogOpenStateStore}
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
      {/* Dialog Create Paper Set */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog open={isPaperSetCreateDialogOpenStateStore} aria-modal="true">
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[512px] max-w-[512px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">Create Paper Set</div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(setIsPaperSetCreateDialogOpenStateStore(false));
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                <CreateUpdatePaperSet
                  key={createUploadOriginalPaperKey}
                  initialData={uploadOriginalPaper}
                  setIsDialogOpen={setIsPaperSetCreateDialogOpenStateStore}
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
      {/* Dialog Create Paper Set */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog open={isPaperCreateDialogOpenStateStore} aria-modal="true">
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[512px] max-w-[512px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">Create Paper</div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(setIsPaperCreateDialogOpenStateStore(false));
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                <CreateUpdatePaper
                  key={createUploadOriginalPaperKey}
                  initialData={uploadOriginalPaper}
                  setIsDialogOpen={setIsPaperCreateDialogOpenStateStore}
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
      {/* Dialog Upload lecture Recording */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog
          open={isUploadLectureRecordingDialogOpenStateStore}
          aria-modal="true"
        >
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[800px] max-w-[800px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">
                  Upload Lecture Recording{" "}
                  {uploadLectureRecording?.serial_number}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(
                      setIsUploadLectureRecordingDialogOpenStateStore(false)
                    );
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                <UploadLectureRecording
                  key={createUploadOriginalPaperKey}
                  initialData={uploadLectureRecording}
                  setIsDialogOpen={
                    setIsUploadLectureRecordingDialogOpenStateStore
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
      {/* Dialog Upload Mark Paper */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog open={isUploadMarkPaperDialogOpenStateStore} aria-modal="true">
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[700px] max-w-[700px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">
                  Upload Mark Paper {uploadMarkPaper?.id}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(setIsUploadMarkPaperDialogOpenStateStore(false));
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                <UploadMarkPaper
                  key={createUploadOriginalPaperKey}
                  initialData={uploadMarkPaper}
                  setIsDialogOpen={setIsUploadMarkPaperDialogOpenStateStore}
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
      {/* Dialog Update Student Paper Mark */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog
          open={isUpdateStudentPaperMarkDialogOpenStateStore}
          aria-modal="true"
        >
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[1024px] max-w-[1024px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">
                  Update Student Paper Mark {uploadOriginalPaper?.serial_number}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(
                      setIsUpdateStudentPaperMarkDialogOpenStateStore(false)
                    );
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                <UpdateStudentPaperMark
                  key={createUploadOriginalPaperKey}
                  initialData={uploadOriginalPaper}
                  setIsDialogOpen={
                    setIsUpdateStudentPaperMarkDialogOpenStateStore
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
      {/* Dialog Upload Marking Scheme */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog
          open={isUploadMarkingSchemeDialogOpenStateStore}
          aria-modal="true"
        >
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[1024px] max-w-[1024px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">
                  Upload Marking Scheme {uploadMarkingScheme?.serial_number}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(
                      setIsUploadMarkingSchemeDialogOpenStateStore(false)
                    );
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                <UploadMarkingScheme
                  key={createUploadOriginalPaperKey}
                  initialData={uploadMarkingScheme}
                  setIsDialogOpen={setIsUploadMarkingSchemeDialogOpenStateStore}
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
      {/* Dialog View Original Paper */}
      <div
        className={cn(isSaving ? "pointer-events-none" : "pointer-events-none")}
      >
        <Dialog
          open={isViewOriginalPaperDialogOpenStateStore}
          aria-modal="true"
        >
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[1400px] max-w-[1400px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">
                  View Original Paper/ Lecture Recording{" "}
                  {uploadOriginalPaper?.serial_number}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(setIsViewOriginalPaperDialogOpenStateStore(false));
                  }}
                >
                  <XIcon />
                </div>
              </div>
              <div className="w-full mt-[8px]">
                <div className="flex flex-row justify-start items-start gap-[32px] w-full min-h-[400px] max-h-[calc(100vh-250px)] overflow-hidden overflow-y-auto overflow-x-auto">
                  <div className="w-full pb-[24px] bg-[#fafafa] pr-[8px]">
                    <div className={cn("flex w-full gap-[8px]")}>
                      {uploadOriginalPaper?.paper_class_lecture_recording &&
                        uploadOriginalPaper?.paper_class_lecture_recording.map(
                          (
                            paper_class_lecture_recording: any,
                            index: number
                          ) => (
                            <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                              <iframe
                                key={index}
                                src={`https://drive.google.com/file/d/${paper_class_lecture_recording.gd_file_id}/preview`}
                                className="overflow-hidden h-[600px] w-full rounded-[8px] my-4"
                                allow="autoplay"
                              ></iframe>
                            </div>
                          )
                        )}
                    </div>
                    <div className={cn("flex w-full gap-[8px]")}>
                      {uploadOriginalPaper?.paper_class_original_paper_attachment &&
                        uploadOriginalPaper.paper_class_original_paper_attachment.map(
                          (
                            paper_class_original_paper_attachment: any,
                            index: number
                          ) => (
                            <div className="bg-[#fafafa] w-full h-full px-[8px] rounded-b-[8px]">
                              <iframe
                                key={index}
                                src={`https://drive.google.com/file/d/${paper_class_original_paper_attachment.gd_file_id}/preview`}
                                className="overflow-hidden h-[600px] w-full rounded-[8px] my-4"
                                allow="autoplay"
                              ></iframe>
                            </div>
                          )
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
      {/* Dialog End */}
      {/* Dialog View Mark Paper */}
      <div
        className={cn(
          viewMarkPaper ? "pointer-events-none" : "pointer-events-none"
        )}
      >
        <Dialog open={isViewMarkPaperDialogOpenStateStore} aria-modal="true">
          <DialogPortal>
            <DialogOverlay className={cn("bg-black/20")} />
            <DialogContent className="outline-none border-none min-w-[800px] max-w-[800px] px-[0] pb-[0] pointer-events-none">
              <DialogTitle className="hidden"></DialogTitle>
              <DialogDescription className="hidden"></DialogDescription>
              {/*  */}
              <div className="flex flex-row w-full justify-between items-center px-[32px]">
                <div className="font-[600] ml-[4px]">
                  View Mark Paper
                  {/* {viewMarkPaper?.student.full_name_with_title} */}
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    dispatch(setIsViewMarkPaperDialogOpenStateStore(false));
                  }}
                >
                  <XIcon />
                </div>
              </div>

              <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                {viewMarkPaper?.file_id && (
                  <iframe
                    src={`https://drive.google.com/file/d/${viewMarkPaper?.file_id}/preview`}
                    className="overflow-hidden h-[600px] w-full rounded-[8px] my-4"
                    allow="autoplay"
                  ></iframe>
                )}
              </div>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
      {/* Dialog End */}
      {/* Dialog Start */}
      {!!isCompletedPaperClassDialogOpenStateStore && (
        <div
          className={cn(
            isSaving ? "pointer-events-none" : "pointer-events-none"
          )}
        >
          <Dialog
            open={!!isCompletedPaperClassDialogOpenStateStore}
            aria-modal="true"
          >
            <DialogPortal>
              <DialogOverlay className={cn("bg-black/20")} />
              <DialogContent className="outline-none border-none rounded-b-[5px] w-[360px] max-w-[360px] px-[0] pb-[0] pointer-events-none">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                {/*  */}
                <div className="flex flex-row w-full justify-between items-center px-[32px]">
                  <div className="font-[600]">Confirmation</div>
                  <div
                    className="cursor-pointer"
                    onClick={() => {
                      dispatch(
                        setIsCompletedPaperClassDialogOpenStateStore(false)
                      );
                    }}
                  >
                    <XIcon />
                  </div>
                </div>
                <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                  <div className="mt-[16px]">
                    Are you sure to complete the paper class?
                  </div>
                  <div className="mt-[16px] w-full h-[64px] px-[16px] justify-end flex items-center rounded-bl-md rounded-br-md">
                    <TButton
                      variant="outline"
                      type="close"
                      id="submit-button"
                      className="ml-[16px] flex items-center justify-center gap-2 cursor-pointer"
                      disabled={isLoading}
                      backgroundColor={"#ededef"}
                      color={"#1f1f1f"}
                      onClick={() => {
                        dispatch(
                          setIsCompletedPaperClassDialogOpenStateStore(false)
                        );
                      }}
                    >
                      Close
                    </TButton>
                    <TButton
                      type="button"
                      id="submit-button"
                      className="ml-[16px] flex items-center justify-center gap-2 cursor-pointer"
                      disabled={isLoading}
                      onClick={() => {
                        completedPaperClassSubmit(uploadMarkingScheme);
                      }}
                    >
                      {isLoading && (
                        <Spinner className="w-4 h-4 animate-spin" />
                      )}
                      {isLoading ? "Loading..." : "Yes"}
                    </TButton>
                  </div>
                </div>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </div>
      )}
      {/* Dialog End */}
    </div>
  );
}
