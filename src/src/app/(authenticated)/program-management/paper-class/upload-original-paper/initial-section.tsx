"use client";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogClose } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import TInput from "@/components/form-components/tinput";
import TButton from "@/components/form-components/tbutton";
import { useEffect, useState } from "react";
import z from "zod";
import { programManagementApi } from "@/api/program-management-api";
import { toast } from "sonner";
import TToast from "@/components/form-components/ttoast";
import TSelect from "@/components/form-components/tselect";
import { generalEntityManagementApi } from "@/api/general-entity-management-api";
import TCalendar from "@/components/form-components/tcalendar";
import TFileUpload from "@/components/form-components/tfileUpload";
import TTime from "@/components/form-components/ttime";
import { is } from "date-fns/locale";
import { lecturerManagementApi } from "@/api/lecturer-management-api";
import { Plus } from "lucide-react";
import {
  setIsPaperSetCreateDialogOpenStateStore,
  SetIsPaperSetReloadData,
} from "@/state-store/slices/program-management/paper-set.slice";
import { setUploadOriginalPaper } from "@/state-store/slices/program-management/paper-class.slice";
import { useAppSelector } from "@/lib/state-store-hooks";
import { RootState } from "@/state-store/store";
import {
  setIsPaperCreateDialogOpenStateStore,
  SetIsPaperReloadData,
} from "@/state-store/slices/program-management/paper.slice";

export default function InitialSection(props: {
  initialData: any;
  setIsDialogOpen: any;
  setReloadData: any;
  sectionMode: any;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [lecturerTimeScheduleList, setLecturerTimeScheduleList] = useState<
    any[]
  >([]);
  const [paperSetList, setPaperSetList] = useState<any[]>([]);
  const [paperList, setPaperList] = useState<any[]>([]);

  // 🔹 API setup
  const [uploadOriginalPaperTrigger] =
    programManagementApi.endpoints.uploadOriginalPaper.useMutation();

  const [getLecturerTimeScheduleListDataTrigger] =
    lecturerManagementApi.endpoints.getLecturerTimeScheduleSelectListDataStste.useLazyQuery();
  const [getPaperSetSilectListDataTrigger] =
    programManagementApi.endpoints.getPaperSetSelectListDataStste.useLazyQuery();
  const [getPaperSilectListDataTrigger] =
    programManagementApi.endpoints.getPaperSelectListDataStste.useLazyQuery();

  const isPaperSetReloadData = useAppSelector(
    (state: RootState) => state.paperSet.isPaperSetReloadData
  );
  const isPaperReloadData = useAppSelector(
    (state: RootState) => state.paper.isPaperReloadData
  );

  // 🔹 Form schema
  const initialSectionFormSchema = z.object({
    id: z.int().min(1, { message: "Required" }),
    // lecturer_time_schedule: z.int().min(1, { message: "Required" }),
    class_date: z.date().min(1, { message: "Required" }),
    paper_set: z.int().min(1, { message: "Required" }),
    paper: z.int().min(1, { message: "Required" }),
    original_paper: z.array(z.any()).min(1, { message: "Required" }),
  });

  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // 🔹 useForm
  const initialSectionForm = useForm<InitialSectionFormType>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      id: props.initialData ? props.initialData.id : 0,
      // lecturer_time_schedule:
      //   !!props.initialData && !!props.initialData.lecturer_time_schedule
      //     ? props.initialData.lecturer_time_schedule
      //     : 0,
      class_date:
        !!props.initialData && !!props.initialData.class_date
          ? new Date(props.initialData.class_date)
          : new Date(),
      paper_set: 0,
      paper: 0,
      original_paper: [],
    },
  });

  useEffect(() => {
    if (isPaperSetReloadData) {
      getPaperSetSilectListDataTrigger({
        search_filter_list: {
          is_active: true,
          subject_id:
            props.initialData?.lecturer_time_schedule?.subject_id || 0,
          branch_id: props.initialData?.branch_id || 0,
        },
      })
        .unwrap()
        .then((res: any) => {
          setPaperSetList(res.data.data || []);
          dispatch(SetIsPaperSetReloadData(false));
        })
        .catch(() => "");
    }
  }, [isPaperSetReloadData]);

  useEffect(() => {
    if (isPaperReloadData) {
      getPaperSilectListDataTrigger({
        search_filter_list: {
          is_active: true,
          paper_set_id: initialSectionForm.watch("paper_set"),
        },
      })
        .unwrap()
        .then((res: any) => {
          setPaperList(res.data.data || []);
          dispatch(SetIsPaperReloadData(false));
        })
        .catch(() => "");
    }
  }, [isPaperReloadData]);

  // 🔹 Submit
  const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("id", data.id.toString());
      formData.append("class_date", data.class_date.toISOString());
      formData.append("paper_set_id", data.paper_set.toString());
      formData.append("paper_id", data.paper.toString());

      if (data.original_paper && data.original_paper.length > 0) {
        data.original_paper.forEach(function (
          savedFileItem: any,
          savedFileKey: any
        ) {
          formData.append("original_paper[]", savedFileItem);
        });
      }

      await uploadOriginalPaperTrigger(formData).unwrap();

      toast.success("Original Paper uploaded successfully!");
      dispatch(props.setIsDialogOpen(false));
      props.setReloadData(true);
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
    <>
      <div className="w-full mt-[8px]">
        <div className="flex flex-row justify-start items-start gap-[32px] w-full min-h-[400px] max-h-[calc(100vh-270px)] overflow-hidden overflow-y-auto overflow-x-auto">
          <div className="w-full pb-[24px] bg-[#fafafa] pr-[8px]">
            <form
              id="paper-class-initial-section-form"
              className="w-full px-[8px]"
              onSubmit={initialSectionForm.handleSubmit(
                initialSectionFormOnSubmit
              )}
              onKeyDown={(e) => {
                if (e.key === "Enter")
                  initialSectionForm.handleSubmit(initialSectionFormOnSubmit);
              }}
            >
              {/* row 1 start */}
              <div className="flex flex-row w-full justify-start items-start gap-[24px]">
                {/* col 1-1 start */}
                <div className="flex flex-col w-[100%] justify-start items-start">
                  <button className="w-[0] h-[0]"></button>
                  <div className="flex flex-col w-full h-full px-[24px] rounded-[5px]">
                    <div className={cn("flex w-full gap-[8px]")}>
                      <div id="branch_wrapper" className="w-full ">
                        <div className="flex flex-col w-full h-full  rounded-[5px]">
                          <div
                            className={cn(
                              "flex w-full gap-[8px] mt-[12px] pointer-events-none"
                            )}
                          >
                            <div id="class_date_wrapper" className="w-[100%] ">
                              <Controller
                                control={initialSectionForm.control}
                                name="class_date"
                                render={({ field }) => (
                                  <TCalendar
                                    label="Class Date"
                                    id="class_date"
                                    placeholder="Select date"
                                    defaultValue={
                                      !!props.initialData &&
                                      !!props.initialData.class_date
                                        ? props.initialData.class_date
                                        : new Date()
                                    }
                                    minDate={new Date()}
                                    maxDate={
                                      new Date(
                                        new Date().getFullYear(),
                                        new Date().getMonth() + 2,
                                        new Date().getDate()
                                      )
                                    }
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={
                                      initialSectionForm.formState.errors
                                        .class_date?.message
                                    }
                                  />
                                )}
                              />
                            </div>
                          </div>
                          <div className="flex flex-row items-end w-full gap-[8px] mt-[12px]">
                            {/* Paper Set Select */}
                            <div className="flex-1">
                              <Controller
                                control={initialSectionForm.control}
                                name="paper_set"
                                render={({ field }) => (
                                  <TSelect
                                    className="w-full"
                                    label="Paper Set"
                                    id="paper_set"
                                    dalalist={paperSetList}
                                    placeholder="Select Paper Set"
                                    onChange={(val) => field.onChange(val.id)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .paper_set?.message
                                    }
                                    onOpen={() => {
                                      dispatch(SetIsPaperSetReloadData(true));
                                    }}
                                    onAddClick={() => {
                                      dispatch(
                                        setIsPaperSetCreateDialogOpenStateStore(
                                          true
                                        )
                                      );
                                      dispatch(
                                        setUploadOriginalPaper(
                                          props.initialData
                                        )
                                      );
                                    }}
                                  />
                                )}
                              />
                            </div>
                          </div>

                          <div
                            className={cn("flex w-full gap-[8px] mt-[12px]")}
                          >
                            <div id="paper_wrapper" className="w-full ">
                              <Controller
                                control={initialSectionForm.control}
                                name="paper"
                                render={({ field }) => (
                                  <TSelect
                                    className="w-full"
                                    label="Paper"
                                    id="paper"
                                    dalalist={paperList}
                                    placeholder="Select Paper"
                                    // defaultValue={field.value}
                                    onChange={(val) => field.onChange(val.id)}
                                    error={
                                      initialSectionForm.formState.errors.paper
                                        ?.message
                                    }
                                    onOpen={() => {
                                      dispatch(SetIsPaperReloadData(true));
                                    }}
                                    onAddClick={() => {
                                      dispatch(
                                        setIsPaperCreateDialogOpenStateStore(
                                          true
                                        )
                                      );
                                      dispatch(
                                        setUploadOriginalPaper(
                                          props.initialData
                                        )
                                      );
                                    }}
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-[8px] mt-[16px]">
                      <div
                        id="original_paper_wrapper"
                        className="w-full mt-[16px]"
                      >
                        <Controller
                          control={initialSectionForm.control}
                          name="original_paper"
                          render={({ field }) => (
                            <TFileUpload
                              className="w-full"
                              id="original_paper"
                              label="Upload Original Paper (PDF)"
                              isMultiple
                              // onChange={(files) => field.onChange(files)}
                              onChange={(files) => {
                                field.onChange(files);
                                // console.log("files", files);
                                // console.log(
                                //   initialSectionForm.getValues("original_paper")
                                // );
                              }}
                              error={
                                initialSectionForm.formState.errors
                                  .original_paper?.message
                              }
                              accept={{
                                "application/pdf": [],
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {/* col 1-1 end */}
              </div>
              {/* row 1 end */}
            </form>
          </div>
        </div>
        <div className="w-full h-[64px] px-[16px] justify-end flex items-center rounded-bl-md rounded-br-md">
          <DialogClose asChild>
            <TButton
              variant="outline"
              type="close"
              id="submit-button"
              className="ml-[16px] flex items-center justify-center gap-2 cursor-pointer"
              disabled={isLoading}
              backgroundColor={"#ededef"}
              color={"#1f1f1f"}
              onClick={() => {
                dispatch(props.setIsDialogOpen(false));
              }}
            >
              Close
            </TButton>
          </DialogClose>

          <TButton
            type="submit"
            id="submit-button"
            className="ml-[16px] flex items-center justify-center gap-2 cursor-pointer"
            disabled={isLoading}
            onClick={initialSectionForm.handleSubmit(
              initialSectionFormOnSubmit
            )}
          >
            {isLoading && <Spinner className="w-4 h-4 animate-spin" />}
            {isLoading ? "Loading..." : "Submit"}
          </TButton>
        </div>
      </div>
    </>
  );
}
