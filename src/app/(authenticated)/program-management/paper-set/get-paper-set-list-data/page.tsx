"use client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { RotateCwIcon, XIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userManagementApi } from "@/api/user-management-api";
import { Button } from "@/components/ui/button";
import {
  setIsGeneratePaperMarkDialogOpenStateStore,
  setIsPaperSetCreateDialogOpenStateStore,
} from "@/state-store/slices/program-management/paper-set.slice";
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
import CreateUpdatePaperSet from "../create-update-paper-set/page";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import TPagination from "@/components/form-components/tpagination";
import { programManagementApi } from "@/api/program-management-api";
import { PaperSetDataTable } from "@/app/(authenticated)/program-management/paper-set/get-paper-set-list-data/paper-set-data-table";
import { PaperSetColumns } from "@/app/(authenticated)/program-management/paper-set/get-paper-set-list-data/paper-set-columns";
import TButton from "@/components/form-components/tbutton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Chip } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import TToast from "@/components/form-components/ttoast";

////////// USE STATE /////////////////////////////////////////////////

export default function DigitalTransformationPage() {
  const [getPaperSetListDataTrigger, getPaperSetListDataState] =
    programManagementApi.endpoints.getPaperSetTableListData.useLazyQuery();

  const [createStudentReportTrigger] =
    programManagementApi.endpoints.createStudentReport.useMutation();

  const [paperSetList, setPaperSetList] = useState([] as any);
  const [isSaving, setIsSaving] = useState(false);
  const [reloadData, setReloadData] = useState(false);
  const [reloadDataCausedByData, setReloadDataCausedByData] = useState(
    [] as any
  );
  const [loading, setLoading] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState("");

  const PAGE_SIZE = 10;
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [groupFilter, setGroupFilter] = useState("All");
  const [groupFilter2, setGroupFilter2] = useState("");
  const [groupFilterList, setGroupFilterList] = useState([] as any);
  const [groupFilterList2, setGroupFilterList2] = useState([] as any);
  const [paperSetCount, setPaperSetCount] = useState(0);
  const [completedPaperSetCount, setcompletedPaperSetCount] = useState(0);
  const [notcompletedPaperSetCount, setnotcompletedPaperSetCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  // keys
  const [createUpdatePaperSetKey, setCreateUpdatePaperSetKey] = useState(
    +new Date()
  );
  const [
    createUpdateBulkPaperSetScheduleKey,
    setCreateUpdateBulkPaperSetScheduleKey,
  ] = useState(+new Date());
  const [createUploadOriginalPaperKey, setCreateUploadOriginalPaperKey] =
    useState(+new Date());

  const router = useRouter();
  const dispatch = useDispatch();
  const SEARCH_FILTER_LIST = {
    is_active: true,
  };

  ////////// STATE STORE ///////////////////////////////////////////////
  const isPaperSetCreateDialogOpenStateStore = useAppSelector(
    (state: RootState) => state.paperSet.isPaperSetCreateDialogOpenStateStore
  );
  const isGeneratePaperMarkDialogOpenStateStore = useAppSelector(
    (state: RootState) => state.paperSet.isGeneratePaperMarkDialogOpenStateStore
  );
  const paperSetData = useAppSelector(
    (state: RootState) => state.paperSet.paperSetData
  );
  /////////////////////USE EFFECT ////////////////////////////////////
  useEffect(() => {
    setLoading(false);
    setPaperSetList([]);
    setCurrentPage(1);

    dispatch(setIsPaperSetCreateDialogOpenStateStore(false));
    //
    getPaperSetListDataTrigger({
      page_size: PAGE_SIZE,
      page: 1,
      search_filter_list: SEARCH_FILTER_LIST,
      search_phrase: searchPhrase,
    });

    setReloadData(false);
  }, []);

  useEffect(() => {
    if (reloadData) {
      setLoading(false);
      setPaperSetList([]);
      setCurrentPage(1);
      dispatch(setIsPaperSetCreateDialogOpenStateStore(false));
      setGroupFilter("All");
      setGroupFilter2("");
      //
      getPaperSetListDataTrigger({
        page_size: PAGE_SIZE,
        page: 1,
        search_filter_list: SEARCH_FILTER_LIST,
        search_phrase: searchPhrase,
      });
      setReloadData(false);
    }
  }, [reloadData]);

  useEffect(() => {
    if (groupFilter) {
      setLoading(false);
      setPaperSetList([]);
      setCurrentPage(1);
      dispatch(setIsPaperSetCreateDialogOpenStateStore(false));

      //
      getPaperSetListDataTrigger({
        page_size: PAGE_SIZE,
        page: 1,
        search_filter_list: SEARCH_FILTER_LIST,
        search_phrase: searchPhrase,
        group_filter: groupFilter,
        group_filter2: groupFilter2,
      });
      setReloadData(false);
    }
  }, [groupFilter]);

  useEffect(() => {
    if (groupFilter) {
      setLoading(false);
      setPaperSetList([]);
      setCurrentPage(1);
      dispatch(setIsPaperSetCreateDialogOpenStateStore(false));

      //
      getPaperSetListDataTrigger({
        page_size: PAGE_SIZE,
        page: 1,
        search_filter_list: SEARCH_FILTER_LIST,
        search_phrase: searchPhrase,
        group_filter: groupFilter,
        group_filter2: groupFilter2,
      });
      setReloadData(false);
    }
  }, [groupFilter2]);

  useEffect(() => {
    if (
      getPaperSetListDataState.currentData &&
      getPaperSetListDataState.currentData.data
    ) {
      setPaperSetCount(
        getPaperSetListDataState.currentData?.data?.paper_set_count
      );
      setcompletedPaperSetCount(
        getPaperSetListDataState.currentData?.data
          ?.completed_student_report_count
      );
      setnotcompletedPaperSetCount(
        getPaperSetListDataState.currentData?.data
          ?.not_completed_student_report_count
      );
      setGroupFilterList2(
        getPaperSetListDataState.currentData?.data?.subject_paper_set_count
      );
      setPaperSetList(getPaperSetListDataState.currentData.data.data);
      setTotalPages(
        Math.ceil(getPaperSetListDataState.currentData?.data?.total / PAGE_SIZE)
      );
      setLoading(true);
    }
  }, [getPaperSetListDataState]);

  const generateStudentReportSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      await createStudentReportTrigger({
        paper_set_id: data.id,
        branch_id: data.branch_id,
        subject_id: data.subject_id,
      }).unwrap();
      toast.success("Generated Student Report Successfully!");
      dispatch(setIsGeneratePaperMarkDialogOpenStateStore(false));
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
        <div className="font-[600] ml-[4px]">Paper Set</div>
      </div>
      <Toaster />
      <div className="flex flex-row w-full gap-[16px]">
        <div className="flex flex-col bg-[#d8ecff] rounded-[5px] min-w-[300px] mt-[8px] gap-[56px] overflow-hidden overflow-y-auto">
          <Tabs
            defaultValue="All"
            className="w-full py-[0] border-none bg-[#d8ecff]"
            value={groupFilter}
            onValueChange={(value: any) => {
              setGroupFilter(value);
            }}
          >
            <TabsList className="flex flex-col gap-[8px] bg-[#d8ecff] mt-[50px] py-[8px] px-[18px] border-none">
              <TabsTrigger
                key="All"
                value="All"
                className="w-full flex flex-row justify-between px-[8px] py-[1px] cursor-pointer text-[#686868] mt-[4px]"
              >
                <div>All</div>
                {paperSetCount === null || paperSetCount === 0 ? (
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
                    className={cn("ml-auto text-[12px]")}
                  >
                    {paperSetCount}
                  </Chip>
                )}
              </TabsTrigger>
              <TabsTrigger
                key="Completed"
                value="Completed"
                className="w-full flex flex-row justify-between px-[8px] py-[1px] cursor-pointer text-[#686868] mt-[4px]"
              >
                <div className="ml-[2px]">Completed</div>
                {completedPaperSetCount === null ||
                completedPaperSetCount === 0 ? (
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
                    {completedPaperSetCount}
                  </Chip>
                )}
              </TabsTrigger>
              <TabsTrigger
                key="Not Completed"
                value="Not Completed"
                className="w-full flex flex-row justify-between px-[8px] py-[1px] cursor-pointer text-[#686868] mt-[4px]"
              >
                <div className="ml-[2px]">Not Completed</div>
                {notcompletedPaperSetCount === null ||
                notcompletedPaperSetCount === 0 ? (
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
                    className={cn("ml-[105px] text-[12px]")}
                  >
                    {notcompletedPaperSetCount}
                  </Chip>
                )}
              </TabsTrigger>
              <Separator className="mb-[8px] bg-[#d1d1d1]" />
            </TabsList>
          </Tabs>
          <Tabs
            defaultValue="All"
            className="w-full py-[0] border-none bg-[#d8ecff]"
            value={groupFilter2}
            onValueChange={(value: any) => {
              setGroupFilter2(value);
            }}
          >
            <TabsList className="flex flex-col gap-[12px] bg-[#d8ecff] mt-[275px] py-[8px] px-[18px] border-none">
              {/* Paper set count for each subject */}
              {groupFilterList2.length > 0 &&
                groupFilterList2.map((item: any) => {
                  return (
                    <TabsTrigger
                      key={item.id}
                      value={item.name}
                      className="w-full flex flex-row justify-between px-[8px] py-[1px] cursor-pointer text-[#686868] mt-[4px]"
                    >
                      <div>{item.name}</div>
                      {item.subject_paper_set_count === null ||
                      item.subject_paper_set_count === 0 ? (
                        <Chip
                          variant="light"
                          radius="lg"
                          size="sm"
                          className={cn("ml-[8px] text-[12px]")}
                        >
                          0
                        </Chip>
                      ) : (
                        <Chip
                          variant="light"
                          radius="lg"
                          size="sm"
                          className={cn("ml-[8px] text-[12px]")}
                        >
                          {item.paper_set_list_count}
                        </Chip>
                      )}
                    </TabsTrigger>
                  );
                })}
            </TabsList>
          </Tabs>
        </div>
        {/* Table start */}
        <div className="w-full max-w-[800px] mt-[8px]">
          <div className="w-full flex items-center justify-between bg-[#fff] py-[16px] px-[16px] border-solid border-[1px] border-[#ddd] relative z-[1] rounded-t-[4px] text-[14px] text-[#818181]">
            <div className="flex flex-row justify-start gap-[32px]">
              <span>Paper Set</span>
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
                <PaperSetDataTable
                  columns={PaperSetColumns}
                  data={paperSetList}
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
                  getPaperSetListDataTrigger({ page_size: PAGE_SIZE, page })
                    .unwrap()
                    .then((fulfilled) => setPaperSetList(fulfilled.data.data))
                    .catch((err) => console.error(err));
                }}
                className="mt-4"
              />
            )}
          </div>
        </div>
        {/* Table end */}
        {/* </div> */}
        <div className="min-w-[540px] mt-[32px]"></div>
        {/* Dialog Start create */}
        <div
          className={cn(
            isSaving ? "pointer-events-none" : "pointer-events-none"
          )}
        >
          <Dialog open={isPaperSetCreateDialogOpenStateStore} aria-modal="true">
            <DialogPortal>
              <DialogOverlay className={cn("bg-black/20")} />
              <DialogContent className="outline-none border-none min-w-[800px] max-w-[800px] px-[0] pb-[0] pointer-events-none">
                <DialogTitle className="hidden"></DialogTitle>
                <DialogDescription className="hidden"></DialogDescription>
                {/*  */}
                <div className="flex flex-row w-full justify-between items-center px-[32px]">
                  <div className="font-[600] ml-[4px]">New Paper Set</div>
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
                    key={createUpdatePaperSetKey}
                    initialData={null}
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
      </div>
      {/* Dialog End */}
      {/* Dialog Start */}
      {!!isGeneratePaperMarkDialogOpenStateStore && (
        <div
          className={cn(
            isSaving ? "pointer-events-none" : "pointer-events-none"
          )}
        >
          <Dialog
            open={!!isGeneratePaperMarkDialogOpenStateStore}
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
                        setIsGeneratePaperMarkDialogOpenStateStore(false)
                      );
                    }}
                  >
                    <XIcon />
                  </div>
                </div>
                <div className="bg-[#fafafa] w-full h-full px-[32px] rounded-b-[8px]">
                  <div className="mt-[16px]">
                    Are you sure to generate student report?
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
                          setIsGeneratePaperMarkDialogOpenStateStore(false)
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
                        generateStudentReportSubmit(paperSetData);
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
    </div>
  );
}
