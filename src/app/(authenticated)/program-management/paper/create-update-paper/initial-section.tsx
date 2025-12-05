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
import { SetIsPaperReloadData } from "@/state-store/slices/program-management/paper.slice";
import { setUploadOriginalPaper } from "@/state-store/slices/program-management/paper-class.slice";
import { setIsPaperNameCreateDialogOpenStateStore } from "@/state-store/slices/program-management/paper-name.slice";

export default function InitialSection(props: {
  initialData: any;
  setIsDialogOpen: any;
  setReloadData: any;
  sectionMode: any;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [paperSetList, setPaperSetList] = useState([]);
  const [paperNameList, setPaperNameList] = useState([]);
  const [paperTypeList, setPaperTypeList] = useState([]);

  // 🔹 API setup
  const [createPaperTrigger] =
    programManagementApi.endpoints.createPaper.useMutation();

  const [getPaperNameSilectListDataTrigger] =
    programManagementApi.endpoints.getPaperNameSelectListDataStste.useLazyQuery();
  const [getPaperTypeSilectListDataTrigger] =
    programManagementApi.endpoints.getPaperTypeSelectListDataStste.useLazyQuery();
  const [getPaperSetSilectListDataTrigger] =
    programManagementApi.endpoints.getPaperSetSelectListDataStste.useLazyQuery();

  // 🔹 Form schema
  const initialSectionFormSchema = z.object({
    paper_set: z.int().min(1, { message: "Required" }),
    paper_name: z.int().min(1, { message: "Required" }),
    paper_type: z.int().min(1, { message: "Required" }),
    total_marks: z.string().min(1, { message: "Required" }),
  });

  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // 🔹 useForm
  const initialSectionForm = useForm<InitialSectionFormType>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      paper_set:
        !!props.initialData && !!props.initialData.paper_set_id
          ? props.initialData.paper_set_id
          : 0,
      paper_name:
        !!props.initialData && !!props.initialData.paper_name_id
          ? props.initialData.paper_name_id
          : 0,
      paper_type:
        !!props.initialData && !!props.initialData.paper_type_id
          ? props.initialData.paper_type_id
          : 0,
      total_marks: !!props.initialData ? props.initialData.name : "",
    },
  });

  // 🔹 Submit
  const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
    try {
      setIsLoading(true);
      await createPaperTrigger({
        paper_set_id: data.paper_set,
        paper_name_id: data.paper_name,
        paper_type_id: data.paper_type,
        total_marks: data.total_marks,
      }).unwrap();

      toast.success("Paper Set created successfully!");
      dispatch(props.setIsDialogOpen(false));
      dispatch(SetIsPaperReloadData(true));
      // props.setReloadData(true);
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
        <div className="flex flex-row justify-start items-start gap-[32px] w-full min-h-[370px] max-h-[370px] overflow-hidden overflow-y-auto overflow-x-auto">
          <div className="w-full pb-[24px] bg-[#fafafa] pr-[8px]">
            <form
              id="paper-initial-section-form"
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
                      <div id="paper_set_wrapper" className="w-full ">
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
                                initialSectionForm.formState.errors.paper_set
                                  ?.message
                              }
                              onOpen={() => {
                                getPaperSetSilectListDataTrigger({
                                  search_filter_list: {
                                    is_active: true,
                                    subject_id:
                                      props.initialData?.lecturer_time_schedule
                                        ?.subject_id || 0,
                                    branch_id:
                                      props.initialData?.branch_id || 0,
                                  },
                                })
                                  .unwrap()
                                  .then((res: any) =>
                                    setPaperSetList(res.data.data || [])
                                  )
                                  .catch(() => "");
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className={cn("flex w-full gap-[8px] mt-[8px]")}>
                      <div id="paper_name_wrapper" className="w-full ">
                        <Controller
                          control={initialSectionForm.control}
                          name="paper_name"
                          render={({ field }) => (
                            <TSelect
                              className="w-full"
                              label="Paper Name"
                              id="paper_name"
                              dalalist={paperNameList}
                              placeholder="Select Paper Name"
                              // defaultValue={field.value}
                              onChange={(val) => field.onChange(val.id)}
                              error={
                                initialSectionForm.formState.errors.paper_name
                                  ?.message
                              }
                              onOpen={() => {
                                getPaperNameSilectListDataTrigger({
                                  search_filter_list: {
                                    // is_active: true,
                                    // paper_set_id:
                                    //   initialSectionForm.watch("paper_set"),
                                  },
                                })
                                  .unwrap()
                                  .then((res: any) =>
                                    setPaperNameList(res.data.data || [])
                                  )
                                  .catch(() => "");
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div className={cn("flex w-full gap-[8px] mt-[8px]")}>
                      <div id="paper_type_wrapper" className="w-full ">
                        <Controller
                          control={initialSectionForm.control}
                          name="paper_type"
                          render={({ field }) => (
                            <TSelect
                              className="w-full"
                              label="Paper Type"
                              id="paper_type"
                              dalalist={paperTypeList}
                              placeholder="Select Paper Type"
                              // defaultValue={field.value}
                              onChange={(val) => field.onChange(val.id)}
                              error={
                                initialSectionForm.formState.errors.paper_type
                                  ?.message
                              }
                              onOpen={() => {
                                getPaperTypeSilectListDataTrigger({
                                  search_filter_list: {
                                    is_active: true,
                                  },
                                })
                                  .unwrap()
                                  .then((res: any) =>
                                    setPaperTypeList(res.data.data || [])
                                  )
                                  .catch(() => "");
                              }}
                            />
                          )}
                        />
                      </div>
                    </div>
                    <div id="total_marks_wrapper" className="w-full  mt-[8px]">
                      <TInput
                        type="number"
                        id="total_marks"
                        label="Paper Total Mark"
                        placeholder="Paper Total Mark"
                        error={
                          initialSectionForm.formState.errors.total_marks
                            ?.message
                        } // 👈 show error
                        {...initialSectionForm.register("total_marks")}
                      />
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
