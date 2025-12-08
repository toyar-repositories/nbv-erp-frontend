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

import { lecturerManagementApi } from "@/api/lecturer-management-api";

export default function InitialSection(props: {
  setIsDialogOpen: any;
  setReloadData: any;
  sectionMode: any;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [branchlList, setBranchList] = useState<any[]>([]);
  const [classRoomlList, setClassRoomList] = useState<any[]>([]);
  const [examTypeList, setExamTypeList] = useState<any[]>([]);
  const [lecturerTimeScheduleList, setLecturerTimeScheduleList] = useState<
    any[]
  >([]);

  // 🔹 API setup
  const [createBulkPaperClassScheduleTrigger] =
    programManagementApi.endpoints.createBulkPaperClassSchedule.useMutation();
  const [getBranchListDataTrigger] =
    generalEntityManagementApi.endpoints.getBranchSelectListDataStste.useLazyQuery();
  const [getClassRoomListDataTrigger] =
    generalEntityManagementApi.endpoints.getClassRoomSelectListDataStste.useLazyQuery();
  const [getExamTypeListDataTrigger] =
    generalEntityManagementApi.endpoints.getExamTypeSelectListDataStste.useLazyQuery();
  const [getLecturerTimeScheduleListDataTrigger] =
    lecturerManagementApi.endpoints.getLecturerTimeScheduleSelectListDataStste.useLazyQuery();

  // 🔹 Form schema
  const initialSectionFormSchema = z.object({
    branch: z.int().min(1, { message: "Required" }),
    class_room: z.int().min(1, { message: "Required" }),
    exam_type: z.int().min(1, { message: "Required" }),
    lecturer_time_schedule: z.int().min(1, { message: "Required" }),
    class_start_date: z.date().min(1, { message: "Required" }),
    class_end_date: z.date().min(1, { message: "Required" }),
  });

  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // 🔹 useForm
  const initialSectionForm = useForm<InitialSectionFormType>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      branch: 0,
      class_room: 0,
      exam_type: 0,
      lecturer_time_schedule: 0,
      class_start_date: new Date(),
      class_end_date: new Date(),
    },
  });

  // 🔹 Submit
  const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("branch_id", data.branch.toString());
      formData.append("class_room_id", data.class_room.toString());
      formData.append("exam_type_id", data.exam_type.toString());
      formData.append(
        "lecturer_time_schedule_id",
        data.lecturer_time_schedule.toString()
      );
      formData.append("class_start_date", data.class_start_date.toISOString());
      formData.append("class_end_date", data.class_end_date.toISOString());

      await createBulkPaperClassScheduleTrigger(formData).unwrap();

      toast.success("Paper Class Schedule created successfully!");
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
        <div className="flex flex-row justify-start items-start gap-[32px] w-full min-h-[calc(100vh-300px)] max-h-[calc(100vh-300px)] overflow-hidden overflow-y-auto overflow-x-auto">
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
                            className={cn("flex w-full gap-[8px] mt-[12px]")}
                          >
                            <div id="exam_type_wrapper" className="w-[50%] ">
                              <Controller
                                control={initialSectionForm.control}
                                name="exam_type"
                                render={({ field }) => (
                                  <TSelect
                                    className="w-full"
                                    label="Exam Type"
                                    id="exam_type"
                                    dalalist={examTypeList}
                                    placeholder="Select Exam Type"
                                    // defaultValue={field.value}
                                    onChange={(val) => field.onChange(val.id)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .exam_type?.message
                                    }
                                    onOpen={() => {
                                      getExamTypeListDataTrigger({
                                        search_filter_list: {
                                          is_active: true,
                                        },
                                      })
                                        .unwrap()
                                        .then((res: any) =>
                                          setExamTypeList(res.data.data || [])
                                        )
                                        .catch(() => "");
                                    }}
                                  />
                                )}
                              />
                            </div>
                            <div id={cn("branch_wrapper")} className="w-[50%] ">
                              <Controller
                                control={initialSectionForm.control}
                                name="branch"
                                render={({ field }) => (
                                  <TSelect
                                    className="w-full"
                                    label="Branch"
                                    id="branch"
                                    dalalist={branchlList}
                                    placeholder="Select Branch"
                                    // defaultValue={field.value}
                                    onChange={(val) => field.onChange(val.id)}
                                    error={
                                      initialSectionForm.formState.errors.branch
                                        ?.message
                                    }
                                    onOpen={() => {
                                      getBranchListDataTrigger({
                                        search_filter_list: {
                                          is_active: true,
                                        },
                                        // search_filter_list: { id: "5" },
                                      })
                                        .unwrap()
                                        .then((res: any) =>
                                          setBranchList(res.data.data || [])
                                        )
                                        .catch(() => "");
                                    }}
                                  />
                                )}
                              />
                            </div>
                            <div id="class_room_wrapper" className="w-[50%] ">
                              <Controller
                                control={initialSectionForm.control}
                                name="class_room"
                                render={({ field }) => (
                                  <TSelect
                                    className="w-full"
                                    label="Classroom"
                                    id="class_room"
                                    dalalist={classRoomlList}
                                    placeholder="Select ClassRoom"
                                    // defaultValue={field.value}
                                    onChange={(val) => field.onChange(val.id)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .class_room?.message
                                    }
                                    onOpen={() => {
                                      getClassRoomListDataTrigger({
                                        search_filter_list: {
                                          branch_id:
                                            initialSectionForm.watch("branch"),
                                          is_active: true,
                                        },
                                      })
                                        .unwrap()
                                        .then((res: any) =>
                                          setClassRoomList(res.data.data || [])
                                        )
                                        .catch(() => "");
                                    }}
                                  />
                                )}
                              />
                            </div>
                          </div>
                          <div
                            className={cn("flex w-full gap-[8px] mt-[12px]")}
                          >
                            <div
                              id="lecturer_time_schedule_wrapper"
                              className="w-full "
                            >
                              <Controller
                                control={initialSectionForm.control}
                                name="lecturer_time_schedule"
                                render={({ field }) => (
                                  <TSelect
                                    className="w-full"
                                    label="Lecturer Time Schedule"
                                    id="lecturer_time_schedule"
                                    dalalist={lecturerTimeScheduleList}
                                    placeholder="Select LecturerTimeSchedule"
                                    // defaultValue={field.value}
                                    onChange={(val) => {
                                      field.onChange(val.id);
                                    }}
                                    error={
                                      initialSectionForm.formState.errors
                                        .lecturer_time_schedule?.message
                                    }
                                    onOpen={() => {
                                      getLecturerTimeScheduleListDataTrigger({
                                        search_filter_list: {
                                          is_active: true,
                                        },
                                      })
                                        .unwrap()
                                        .then((res: any) =>
                                          setLecturerTimeScheduleList(
                                            res.data.data || []
                                          )
                                        )
                                        .catch(() => "");
                                    }}
                                  />
                                )}
                              />
                            </div>
                          </div>
                          <div
                            className={cn("flex w-full gap-[8px] mt-[12px]")}
                          >
                            <div
                              id="class_start_date_wrapper"
                              className="w-[50%] "
                            >
                              <Controller
                                control={initialSectionForm.control}
                                name="class_start_date"
                                render={({ field }) => (
                                  <TCalendar
                                    label="Class Start Date"
                                    id="class_start_date"
                                    placeholder="Select Start Date"
                                    minDate={
                                      new Date(
                                        new Date().setMonth(
                                          new Date().getMonth() - 2
                                        )
                                      )
                                    }
                                    maxDate={
                                      new Date(
                                        new Date().getFullYear() + 1,
                                        new Date().getMonth() + 2,
                                        new Date().getDate()
                                      )
                                    }
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={
                                      initialSectionForm.formState.errors
                                        .class_start_date?.message
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div
                              id="class_end_date_wrapper"
                              className="w-[50%] "
                            >
                              <Controller
                                control={initialSectionForm.control}
                                name="class_end_date"
                                render={({ field }) => (
                                  <TCalendar
                                    label="Class End Date"
                                    id="class_end_date"
                                    placeholder="Select End Date"
                                    minDate={
                                      new Date(
                                        new Date().setMonth(
                                          new Date().getMonth() - 2
                                        )
                                      )
                                    }
                                    maxDate={
                                      new Date(
                                        new Date().setMonth(
                                          new Date().getMonth() + 14
                                        )
                                      )
                                    }
                                    value={field.value}
                                    onChange={field.onChange}
                                    error={
                                      initialSectionForm.formState.errors
                                        .class_end_date?.message
                                    }
                                  />
                                )}
                              />
                            </div>
                          </div>
                        </div>
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
