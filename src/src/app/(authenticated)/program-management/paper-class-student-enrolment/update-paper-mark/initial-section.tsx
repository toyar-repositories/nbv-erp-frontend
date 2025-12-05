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
  initialData: any;
  setIsDialogOpen: any;
  setReloadData: any;
  sectionMode: any;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [branchlList, setBranchList] = useState<any[]>([]);
  const [classRoomlList, setClassRoomList] = useState<any[]>([]);
  const [lecturerTimeScheduleList, setLecturerTimeScheduleList] = useState<
    any[]
  >([]);
  const [paperSetList, setPaperSetList] = useState<any[]>([]);
  const [paperList, setPaperList] = useState<any[]>([]);
  const [subjectId, setSubjectId] = useState(0);

  // 🔹 API setup
  const [updatePaperMark] =
    programManagementApi.endpoints.updatePaperMark.useMutation();
  // 🔹 Form schema
  const initialSectionFormSchema = z.object({
    id: z.int().min(1, { message: "Required" }),
    total_mark: z.string().min(1, { message: "Required" }),
    mark_paper: z.array(z.any()).min(1, { message: "Required" }),
  });

  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // 🔹 useForm
  const initialSectionForm = useForm<InitialSectionFormType>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      id: props.initialData?.id,
      total_mark:
        !!props.initialData && !!props.initialData.total_mark
          ? props.initialData.total_mark
          : "",
      mark_paper: [],
    },
  });

  // 🔹 Submit
  const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("id", data.id.toString());
      formData.append("total_mark", data.total_mark.toString());

      if (data.mark_paper && data.mark_paper.length > 0) {
        data.mark_paper.forEach(function (
          savedFileItem: any,
          savedFileKey: any
        ) {
          formData.append("mark_paper[]", savedFileItem);
        });
      }

      await updatePaperMark(formData).unwrap();

      toast.success("Paper Mark uploaded successfully!");
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
        <div className="flex flex-row justify-start items-start gap-[32px] w-full min-h-[calc(100vh-600px)] max-h-[calc(100vh-350px)] overflow-hidden overflow-y-auto overflow-x-auto">
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
                            <div
                              id="total_mark_wrapper"
                              className={cn("w-[50%] ")}
                            >
                              <TInput
                                type="number"
                                id="total_mark"
                                label="Paper Mark"
                                placeholder="Paper Mark"
                                error={
                                  initialSectionForm.formState.errors.total_mark
                                    ?.message
                                } // 👈 show error
                                {...initialSectionForm.register("total_mark")}
                              />
                            </div>
                            <div
                              id="total_mark_wrapper"
                              className={cn("w-[50%] ")}
                            >
                              <TInput
                                type="number"
                                id="total_mark"
                                label="Paper Mark"
                                placeholder="Paper Mark"
                                error={
                                  initialSectionForm.formState.errors.total_mark
                                    ?.message
                                } // 👈 show error
                                {...initialSectionForm.register("total_mark")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full gap-[8px] mt-[16px]">
                      <div id="mark_paper_wrapper" className="w-full mt-[16px]">
                        <Controller
                          control={initialSectionForm.control}
                          name="mark_paper"
                          render={({ field }) => (
                            <TFileUpload
                              className="w-full"
                              id="mark_paper"
                              label="Mark Paper (PDF)"
                              isMultiple
                              // onChange={(files) => field.onChange(files)}
                              onChange={(files) => {
                                field.onChange(files);
                                console.log("files", files);
                                console.log(
                                  initialSectionForm.getValues("mark_paper")
                                );
                              }}
                              error={
                                initialSectionForm.formState.errors.mark_paper
                                  ?.message
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
