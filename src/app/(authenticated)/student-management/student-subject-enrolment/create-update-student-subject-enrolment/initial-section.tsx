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
import TCheckboxChild from "@/components/form-components/TCheckboxChild";

export default function InitialSection(props: {
  initialData: any;
  setIsDialogOpen: any;
  setReloadData: any;
  sectionMode: any;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [subjectList, setSubjectList] = useState<any[]>([]);
  const [studentList, setStudentList] = useState<any[]>([]);
  const [gradeLevelId, setGradeLevelId] = useState<any[]>([]);

  // 🔹 API setup
  const [createStudentSubjectEnrolmentTrigger] =
    studentManagementApi.endpoints.createStudentSubjectEnrolment.useMutation();
  const [getStudentSelectListDataTrigger] =
    studentManagementApi.endpoints.getStudentSelectListData.useLazyQuery();
  const [getSubjectSelectListDataTrigger] =
    programManagementApi.endpoints.getSubjectSelectListDataStste.useLazyQuery();

  // 🔹 Form schema
  const initialSectionFormSchema = z.object({
    student: z.int().min(1, { message: "required" }),
    subjects: z
      .array(z.number())
      .min(1, { message: "Select at least one subject" }),
  });

  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // 🔹 useForm
  const initialSectionForm = useForm<InitialSectionFormType>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      student: 0,
      subjects: [],
    },
  });

  // 🔹 Submit
  const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
    try {
      setIsLoading(true);
      await createStudentSubjectEnrolmentTrigger({
        student_id: data.student,
        student_subject_list: data.subjects,
      }).unwrap();

      toast.success("Student Subject Enrolment created successfully!");
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
    getSubjectSelectListDataTrigger({
      page_size: 10,
      page: 1,
      search_filter_list: { is_active: true },
    })
      .unwrap()
      .then((res: any) => setSubjectList(res.data.data || []))
      .catch(
        () => ""
        // TToast({ label: "Error", description: "Failed to load titles" })
      );
  }, []);

  return (
    <>
      <div className="w-full mt-[8px]">
        <div className="flex flex-row justify-start items-start gap-[32px] w-full min-h-[calc(100vh-270px)] max-h-[calc(100vh-270px)] overflow-hidden overflow-y-auto overflow-x-auto">
          <div className="w-full pb-[24px] bg-[#fafafa] pr-[8px]">
            <form
              id="student-subject-enrolment-initial-section-form"
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
                    <div className="flex flex-row w-full gap-[8px]">
                      <div className={cn("flex w-full gap-[8px] mt-[12px]")}>
                        <div id="student_wrapper" className="w-full ">
                          <Controller
                            control={initialSectionForm.control}
                            name="student"
                            render={({ field }) => (
                              <TSelect
                                className="w-full"
                                label="Student"
                                id="student"
                                dalalist={studentList}
                                placeholder="Select Student"
                                // defaultValue={field.value}
                                onChange={(val) => {
                                  field.onChange(val.id);
                                  setGradeLevelId(val.grade_level_id);
                                }}
                                error={
                                  initialSectionForm.formState.errors.student
                                    ?.message
                                }
                                onOpen={() => {
                                  getStudentSelectListDataTrigger({
                                    search_filter_list: {
                                      is_active: true,
                                    },
                                  })
                                    .unwrap()
                                    .then((res: any) =>
                                      setStudentList(res.data.data || [])
                                    )
                                    .catch(() => "");

                                  // getSubjectSelectListDataTrigger({
                                  //   page_size: 10,
                                  //   page: 1,
                                  //   search_filter_list: {
                                  //     is_active: true,
                                  //     grade_level_id: gradeLevelId,
                                  //   },
                                  // })
                                  //   .unwrap()
                                  //   .then((res: any) =>
                                  //     setSubjectList(res.data.data || [])
                                  //   )
                                  //   .catch(
                                  //     () => ""
                                  //     // TToast({ label: "Error", description: "Failed to load titles" })
                                  //   );
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-[8px]">
                      <div className="flex flex-col w-full gap-[8px] mt-[16px]">
                        <label className="text-sm font-medium text-gray-800">
                          Subjects
                        </label>

                        <Controller
                          control={initialSectionForm.control}
                          name="subjects"
                          render={({ field }) => (
                            <div className="bg-[#ededef] rounded-md border border-gray-300 p-3">
                              {subjectList.map((subject) => (
                                <div key={subject.id} className="py-2px]">
                                  <TCheckboxChild
                                    id={`subject_${subject.id}`}
                                    label={subject.name}
                                    valueObject={subject.id}
                                    checked={field.value?.includes(subject.id)}
                                    onChange={(checked: boolean) => {
                                      let updated = [...(field.value || [])];
                                      if (checked) updated.push(subject.id);
                                      else
                                        updated = updated.filter(
                                          (id) => id !== subject.id
                                        );
                                      field.onChange(updated);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        />

                        {initialSectionForm.formState.errors.subjects
                          ?.message && (
                          <p className="text-red-400 text-xs ml-1">
                            {
                              initialSectionForm.formState.errors.subjects
                                .message
                            }
                          </p>
                        )}
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
