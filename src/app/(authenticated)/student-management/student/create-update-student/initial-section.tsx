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
import { studentManagementApi } from "@/api/student-management-api";
import { toast } from "sonner";
import TToast from "@/components/form-components/ttoast";
import TSelect from "@/components/form-components/tselect";
import { generalEntityManagementApi } from "@/api/general-entity-management-api";
import TCalendar from "@/components/form-components/tcalendar";
import { programManagementApi } from "@/api/program-management-api";
import { Input } from "@/components/ui/input";
import TSelectSimple from "@/components/form-components/tselect-simple";
import { id } from "date-fns/locale";

export default function InitialSection(props: {
  initialData: any;
  setIsDialogOpen: any;
  setReloadData: any;
  sectionMode: any;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [personTitleList, setPersonTitleList] = useState<any[]>([]);
  const [gradeLevelList, setGradeLevelList] = useState<any[]>([]);
  const [branchList, setBranchList] = useState<any[]>([]);
  const [examTypeList, setExamTypeList] = useState<any[]>([]);

  // 🔹 API setup
  const [createStudentTrigger] =
    studentManagementApi.endpoints.createStudent.useMutation();
  const [updateStudentTrigger] =
    studentManagementApi.endpoints.updateStudent.useMutation();

  const [getPersonTitleListDataTrigger] =
    generalEntityManagementApi.endpoints.getPersonTitleListData.useLazyQuery();

  const [getGradeLevelListDataTrigger] =
    programManagementApi.endpoints.getGradeLevelSelectListDataState.useLazyQuery();

  const [getBranchSelectListDataTrigger] =
    generalEntityManagementApi.endpoints.getBranchSelectListDataStste.useLazyQuery();

  const [getExamTypeSelectListDataTrigger] =
    generalEntityManagementApi.endpoints.getExamTypeSelectListDataStste.useLazyQuery();

  // 🔹 Form schema
  const initialSectionFormSchema = z.object({
    id: z.int().min(0, { message: "Required" }),
    first_name: z.string().min(1, { message: "Required" }),
    last_name: z.string().min(0, { message: "Required" }),
    gender: z.string().min(1, { message: "Required" }),
    grade_level: z.int().min(1, { message: "Required" }),
    branch: z.int().min(1, { message: "Required" }),
    exam_type: z.int().min(1, { message: "Required" }),
  });
  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // 🔹 useForm
  const initialSectionForm = useForm<InitialSectionFormType>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      id: props.initialData && props.initialData?.id ? props.initialData.id : 0,
      first_name:
        props.initialData && props.initialData?.first_name
          ? props.initialData.first_name
          : "",
      last_name:
        props.initialData && props.initialData?.last_name
          ? props.initialData.last_name
          : "",
      gender:
        props.initialData && props.initialData?.gender
          ? props.initialData.gender
          : "",
      grade_level:
        props.initialData && props.initialData?.grade_level_id
          ? props.initialData.grade_level_id
          : 0,
      branch:
        props.initialData && props.initialData?.branch_id
          ? props.initialData.branch_id
          : 0,
      //date_of_birth: undefined,
      exam_type:
        props.initialData && props.initialData?.exam_type
          ? props.initialData.exam_type
          : 0,
    },
  });

  // 🔹 Submit
  const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
    try {
      setIsLoading(true);
      if (props.sectionMode === "create") {
        await createStudentTrigger({
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          gender: data.gender,
          grade_level_id: data.grade_level,
          branch_id: data.branch,
          exam_type_id: data.exam_type,
        }).unwrap();

        toast.success("Student created successfully!");
      } else if (props.sectionMode === "update") {
        await updateStudentTrigger({
          id: data.id,
          first_name: data.first_name,
          last_name: data.last_name,
          gender: data.gender,
          grade_level_id: data.grade_level,
          branch_id: data.branch,
          //date_of_birth: data.date_of_birth.toISOString(),
          exam_type_id: data.exam_type,
        }).unwrap();

        toast.success("Student updated successfully!");
      }

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
  useEffect(() => {
    getPersonTitleListDataTrigger({ page_size: 10, page: 1 })
      .unwrap()
      .then((res: any) => setPersonTitleList(res.data || []))
      .catch(
        () => ""
        // TToast({ label: "Error", description: "Failed to load titles" })
      );

    getGradeLevelListDataTrigger({ page_size: 10, page: 1 })
      .unwrap()
      .then((res: any) => setGradeLevelList(res.data.data || []))
      .catch(
        () => ""
        // TToast({ label: "Error", description: "Failed to load grade levels" })
      );
    getBranchSelectListDataTrigger({ page_size: 10, page: 1 })
      .unwrap()
      .then((res: any) => setBranchList(res.data.data || []))
      .catch(
        () => ""
        // TToast({ label: "Error", description: "Failed to load grade levels" })
      );
    getExamTypeSelectListDataTrigger({ page_size: 10, page: 1 })
      .unwrap()
      .then((res: any) => setExamTypeList(res.data.data || []))
      .catch(
        () => ""
        // TToast({ label: "Error", description: "Failed to load grade levels" })
      );
  }, []);

  return (
    <>
      <div className="w-full mt-[8px]">
        <div className="flex flex-row justify-start items-start gap-[32px] w-full min-h-[calc(100%-32px)] max-h-[calc(100%-32px)] overflow-hidden overflow-y-auto">
          <div className="w-full pb-[24px] bg-[#fafafa] pr-[8px]">
            <form
              id="student-initial-section-form"
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
                      <div className="flex flex-col gap-[8px] w-[50%]">
                        <div id="first_name_wrapper" className={cn("w-full ")}>
                          <TInput
                            type="text"
                            id="first_name"
                            label="First Name"
                            placeholder="First Name"
                            error={
                              initialSectionForm.formState.errors.first_name
                                ?.message
                            } // 👈 show error
                            {...initialSectionForm.register("first_name")}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col w-[50%]">
                        <div id="last_name_wrapper" className={cn("w-full ")}>
                          <TInput
                            type="text"
                            id="last_name"
                            label="Last Name"
                            placeholder="Last Name"
                            error={
                              initialSectionForm.formState.errors.last_name
                                ?.message
                            } // 👈 show error
                            {...initialSectionForm.register("last_name")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-[8px]">
                      <div id="gender_wrapper" className="w-[50%] mt-[16px]">
                        <Controller
                          control={initialSectionForm.control}
                          name="gender"
                          render={({ field }) => (
                            <TSelectSimple
                              className="w-full"
                              label="Gender"
                              id="gender"
                              dalalist={[
                                { id: "Male", name: "Male" },
                                { id: "Female", name: "Female" },
                              ]}
                              placeholder="Select Gender"
                              defaultValue={field.value}
                              onChange={(val) => field.onChange(val.id)}
                              error={
                                initialSectionForm.formState.errors.gender
                                  ?.message
                              }
                            />
                          )}
                        />
                      </div>
                      <div
                        id="grade_level_wrapper"
                        className="w-[50%] mt-[16px]"
                      >
                        <Controller
                          control={initialSectionForm.control}
                          name="grade_level"
                          render={({ field }) => (
                            <TSelect
                              className="w-full"
                              label="Grade Level"
                              id="grade_level"
                              dalalist={gradeLevelList}
                              placeholder="Select Grade Level"
                              defaultValue={gradeLevelList.find(
                                (item) =>
                                  item.id === props.initialData?.grade_level_id
                              )}
                              onChange={(val) => field.onChange(val.id)}
                              error={
                                initialSectionForm.formState.errors.grade_level
                                  ?.message
                              }
                            />
                          )}
                        />
                      </div>
                    </div>

                    <div className="flex flex-row w-full gap-[8px]">
                      {/* BRANCH */}
                      <div id="branch_wrapper" className="w-[50%] mt-[16px]">
                        <Controller
                          control={initialSectionForm.control}
                          name="branch"
                          render={({ field }) => (
                            <TSelect
                              className="w-full"
                              label="Branch"
                              id="branch"
                              dalalist={branchList}
                              placeholder="Select Branch"
                              defaultValue={branchList.find(
                                (item) =>
                                  item.id === props.initialData?.branch_id
                              )}
                              onChange={(val) => field.onChange(val.id)}
                              error={
                                initialSectionForm.formState.errors.branch
                                  ?.message
                              }
                            />
                          )}
                        />
                      </div>

                      {/* BRANCH */}
                      <div id="branch_wrapper" className="w-[50%] mt-[16px]">
                        <Controller
                          control={initialSectionForm.control}
                          name="branch"
                          render={({ field }) => (
                            <TSelect
                              className="w-full"
                              label="Branch"
                              id="branch"
                              dalalist={branchList}
                              placeholder="Select Branch"
                              defaultValue={branchList.find(
                                (item) =>
                                  item.id === props.initialData?.branch_id
                              )}
                              onChange={(val) => field.onChange(val.id)}
                              error={
                                initialSectionForm.formState.errors.branch
                                  ?.message
                              }
                            />
                          )}
                        />
                      </div>
                      {/* <div
                        id="date_of_birth_wrapper"
                        className="w-[50%] mt-[16px]"
                      >
                        <Controller
                          control={initialSectionForm.control}
                          name="date_of_birth"
                          render={({ field }) => (
                            <TCalendar
                              label="Date of Birth"
                              id="date_of_birth"
                              placeholder="Select date"
                              minDate={new Date("2000-01-01")}
                              maxDate={new Date()}
                              value={field.value}
                              onChange={field.onChange}
                              error={
                                initialSectionForm.formState.errors
                                  .date_of_birth?.message
                              }
                            />
                          )}
                        />
                      </div> */}
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
