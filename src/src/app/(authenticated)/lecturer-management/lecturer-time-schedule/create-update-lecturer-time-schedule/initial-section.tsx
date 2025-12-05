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

export default function InitialSection(props: {
  setIsDialogOpen: any;
  setReloadData: any;
  sectionMode: any;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [subjectList, setSubjectList] = useState<any[]>([]);
  const [lecturerList, setLecturerList] = useState<any[]>([]);
  const [branchlList, setBranchList] = useState<any[]>([]);

  // 🔹 API setup
  const [createLecturerTimeScheduleTrigger] =
    lecturerManagementApi.endpoints.createLecturerTimeSchedule.useMutation();
  const [getSubjectSelectListDataTrigger] =
    programManagementApi.endpoints.getSubjectSelectListDataStste.useLazyQuery();
  const [getBranchListDataTrigger] =
    generalEntityManagementApi.endpoints.getBranchSelectListDataStste.useLazyQuery();
  const [getLecturerSelectListDataTrigger] =
    lecturerManagementApi.endpoints.getLecturerSelectListDataStste.useLazyQuery();

  // 🔹 Form schema
  const initialSectionFormSchema = z.object({
    lecturer: z.int().min(1, { message: "Required" }),
    subject: z.int().min(1, { message: "Required" }),
    branch: z.int().min(1, { message: "Required" }),
    day: z.string().min(1, { message: "Required" }),
    class_start_time: z.string().min(1, { message: "Required" }),
    class_end_time: z.string().min(1, { message: "Required" }),
    writing_1_start_time: z.string().min(0, { message: "Required" }),
    writing_1_end_time: z.string().min(0, { message: "Required" }),
    discussion_start_time: z.string().min(0, { message: "Required" }),
    discussion_end_time: z.string().min(0, { message: "Required" }),
  });

  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // 🔹 useForm
  const initialSectionForm = useForm<InitialSectionFormType>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      lecturer: 0,
      branch: 0,
      subject: 0,
      day: "",
      class_start_time: "",
      class_end_time: "",
      writing_1_start_time: "",
      writing_1_end_time: "",
      discussion_start_time: "",
      discussion_end_time: "",
    },
  });

  // 🔹 Submit
  const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
    try {
      setIsLoading(true);
      await createLecturerTimeScheduleTrigger({
        lecturer_id: data.lecturer,
        subject_id: data.subject,
        branch_id: data.branch,
        day: data.day,
        class_start_time: data.class_start_time,
        class_end_time: data.class_end_time,
        writing_1_start_time: data.writing_1_start_time,
        writing_1_end_time: data.writing_1_end_time,
        discussion_start_time: data.discussion_start_time,
        discussion_end_time: data.discussion_end_time,
      }).unwrap();

      toast.success("Lecturer Time Schedule created successfully!");
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

  // 🔹 Fetch dropdown data
  // useEffect(() => {
  //   getPersonTitleListDataTrigger({ page_size: 10, page: 1 })
  //     .unwrap()
  //     .then((res: any) => setPersonTitleList(res.data || []))
  //     .catch(
  //       () => ""
  //       // TToast({ label: "Error", description: "Failed to load titles" })
  //     );

  //   getGradeLevelListDataTrigger({ page_size: 10, page: 1 })
  //     .unwrap()
  //     .then((res: any) => setGradeLevelList(res.data.data || []))
  //     .catch(
  //       () => ""
  //       // TToast({ label: "Error", description: "Failed to load grade levels" })
  //     );
  // }, []);

  return (
    <>
      <div className="w-full mt-[8px]">
        <div className="flex flex-row justify-start items-start gap-[32px] w-full min-h-[calc(100%-32px)] max-h-[calc(100%-32px)] overflow-hidden overflow-y-auto">
          <div className="w-full pb-[24px] bg-[#fafafa] pr-[8px]">
            <form
              id="lecturer-time-schedule-initial-section-form"
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
                          <div className={cn("flex w-full gap-[8px]")}>
                            <div id="lecturer_wrapper" className="w-full ">
                              <Controller
                                control={initialSectionForm.control}
                                name="lecturer"
                                render={({ field }) => (
                                  <TSelect
                                    className="w-full"
                                    label="Lecturer"
                                    id="lecturer"
                                    dalalist={lecturerList}
                                    placeholder="Select Lecturer"
                                    // defaultValue={field.value}
                                    onChange={(val) => field.onChange(val.id)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .lecturer?.message
                                    }
                                    onOpen={() => {
                                      getLecturerSelectListDataTrigger({
                                        search_filter_list: {
                                          // curriculum_id:
                                          //   initialSectionForm.watch(
                                          //     "curriculum"
                                          //   ),
                                          is_active: true,
                                        },
                                      })
                                        .unwrap()
                                        .then((res: any) =>
                                          setLecturerList(res.data.data || [])
                                        )
                                        .catch(() => "");
                                    }}
                                  />
                                )}
                              />
                            </div>
                          </div>
                          <div className={cn("flex w-full gap-[8px] mt-[8px]")}>
                            <div id="subject_wrapper" className="w-full ">
                              <Controller
                                control={initialSectionForm.control}
                                name="subject"
                                render={({ field }) => (
                                  <TSelect
                                    className="w-full"
                                    label="Subject"
                                    id="subject"
                                    dalalist={subjectList}
                                    placeholder="Select Subject"
                                    // defaultValue={field.value}
                                    onChange={(val) => field.onChange(val.id)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .subject?.message
                                    }
                                    onOpen={() => {
                                      getSubjectSelectListDataTrigger({
                                        search_filter_list: {
                                          // curriculum_id:
                                          //   initialSectionForm.watch(
                                          //     "curriculum"
                                          //   ),
                                          is_active: true,
                                        },
                                      })
                                        .unwrap()
                                        .then((res: any) =>
                                          setSubjectList(res.data.data || [])
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
                            <div id="day_wrapper" className="w-[50%] ">
                              <Controller
                                control={initialSectionForm.control}
                                name="day"
                                render={({ field }) => (
                                  <TSelect
                                    className="w-full"
                                    label="Day"
                                    id="day"
                                    dalalist={[
                                      { id: "Monday", name: "Monday" },
                                      { id: "Tuesday", name: "Tuesday" },
                                      { id: "Wednesday", name: "Wednesday" },
                                      { id: "Thursday", name: "Thursday" },
                                      { id: "Friday", name: "Friday" },
                                      { id: "Saturday", name: "Saturday" },
                                      { id: "Sunday", name: "Sunday" },
                                    ]}
                                    placeholder="Select Gender"
                                    defaultValue={field.value}
                                    onChange={(val) => field.onChange(val.id)}
                                    error={
                                      initialSectionForm.formState.errors.day
                                        ?.message
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div id="branch_wrapper" className="w-[50%] ">
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
                          </div>
                          <div
                            className={cn("flex w-full gap-[8px] mt-[12px]")}
                          >
                            <div
                              id="class_start_time_wrapper"
                              className="w-[50%] "
                            >
                              <Controller
                                control={initialSectionForm.control}
                                name="class_start_time"
                                render={({ field }) => (
                                  <TTime
                                    id="class_start_time"
                                    label="Class Start Time"
                                    defaultValue=""
                                    onChange={(val) => field.onChange(val)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .class_start_time?.message
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div
                              id="class_end_time_wrapper"
                              className="w-[50%] "
                            >
                              <Controller
                                control={initialSectionForm.control}
                                name="class_end_time"
                                render={({ field }) => (
                                  <TTime
                                    id="class_end_time"
                                    label="Class End Time"
                                    defaultValue=""
                                    onChange={(val) => field.onChange(val)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .class_end_time?.message
                                    }
                                  />
                                )}
                              />
                            </div>
                          </div>
                          <div
                            className={cn("flex w-full gap-[8px] mt-[16px]")}
                          >
                            <div
                              id="writing_1_start_time_wrapper"
                              className="w-[50%] "
                            >
                              <Controller
                                control={initialSectionForm.control}
                                name="writing_1_start_time"
                                render={({ field }) => (
                                  <TTime
                                    id="writing_1_start_time"
                                    label="Writing Start Time"
                                    defaultValue=""
                                    onChange={(val) => field.onChange(val)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .writing_1_start_time?.message
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div
                              id="writing_1_end_time_wrapper"
                              className="w-[50%] "
                            >
                              <Controller
                                control={initialSectionForm.control}
                                name="writing_1_end_time"
                                render={({ field }) => (
                                  <TTime
                                    id="writing_1_end_time"
                                    label="Writing End Time"
                                    defaultValue=""
                                    onChange={(val) => field.onChange(val)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .writing_1_end_time?.message
                                    }
                                  />
                                )}
                              />
                            </div>
                          </div>
                          <div
                            className={cn("flex w-full gap-[8px] mt-[16px]")}
                          >
                            <div
                              id="discussion_start_time_wrapper"
                              className="w-[50%] "
                            >
                              <Controller
                                control={initialSectionForm.control}
                                name="discussion_start_time"
                                render={({ field }) => (
                                  <TTime
                                    id="discussion_start_time"
                                    label="Discussion Start Time"
                                    defaultValue=""
                                    onChange={(val) => field.onChange(val)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .discussion_start_time?.message
                                    }
                                  />
                                )}
                              />
                            </div>
                            <div
                              id="discussion_end_time_wrapper"
                              className="w-[50%] "
                            >
                              <Controller
                                control={initialSectionForm.control}
                                name="discussion_end_time"
                                render={({ field }) => (
                                  <TTime
                                    id="discussion_end_time"
                                    label="Discussion End Time"
                                    defaultValue=""
                                    onChange={(val) => field.onChange(val)}
                                    error={
                                      initialSectionForm.formState.errors
                                        .discussion_end_time?.message
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
