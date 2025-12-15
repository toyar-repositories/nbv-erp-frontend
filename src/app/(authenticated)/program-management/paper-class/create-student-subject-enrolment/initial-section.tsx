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
import { studentManagementApi } from "@/api/student-management-api";

export default function InitialSection(props: {
  initialData: any;
  setIsDialogOpen: any;
  setReloadData: any;
  sectionMode: any;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [studentList, setStudentList] = useState<any[]>([]);

  // 🔹 API setup
  const [paperClassAddSingleStudentTrigger] =
    programManagementApi.endpoints.paperClassAddSingleStudent.useMutation();
  const [getStudentSelectListDataTrigger] =
    studentManagementApi.endpoints.getStudentSelectListData.useLazyQuery();
  // 🔹 Form schema
  const initialSectionFormSchema = z.object({
    id: z.int().min(1, { message: "Required" }),
    student: z.int().min(1, { message: "required" }),
  });

  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // 🔹 useForm
  const initialSectionForm = useForm<InitialSectionFormType>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      id: props.initialData ? props.initialData.id : 0,
      student: 0,
    },
  });

  // 🔹 Submit
  const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
    try {
      setIsLoading(true);
      await paperClassAddSingleStudentTrigger({
        paper_class_id: props.initialData.id,
        student_id: data.student,
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

  return (
    <>
      <div className="w-full mt-[8px]">
        <div className="flex flex-row justify-start items-start gap-[32px] w-full min-h-[300px] max-h-[calc(100vh-100px)] overflow-hidden overflow-y-auto overflow-x-auto">
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
                                  onChange={(val) => {
                                    field.onChange(val.id);
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
                                  }}
                                />
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* col 1-1 end */}
                </div>
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
