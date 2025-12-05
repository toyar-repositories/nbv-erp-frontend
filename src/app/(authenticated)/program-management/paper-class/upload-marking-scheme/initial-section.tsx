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
  const [paperSetList, setPaperSetList] = useState<any[]>([]);
  const [paperList, setPaperList] = useState<any[]>([]);

  // 🔹 API setup
  const [uploadMarkingSchemeTrigger] =
    programManagementApi.endpoints.uploadMarkingScheme.useMutation();
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
    marking_scheme: z.array(z.any()).min(1, { message: "Required" }),
  });

  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // 🔹 useForm
  const initialSectionForm = useForm<InitialSectionFormType>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      id: props.initialData ? props.initialData.id : 0,
      marking_scheme: [],
    },
  });

  // 🔹 Submit
  const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
    try {
      setIsLoading(true);

      const formData = new FormData();

      formData.append("id", data.id.toString());

      if (data.marking_scheme && data.marking_scheme.length > 0) {
        data.marking_scheme.forEach(function (
          savedFileItem: any,
          savedFileKey: any
        ) {
          formData.append("marking_scheme[]", savedFileItem);
        });
      }

      await uploadMarkingSchemeTrigger(formData).unwrap();

      toast.success("Marking Scheme uploaded successfully!");
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
                      <div
                        id="marking_scheme_wrapper"
                        className="w-full mt-[16px]"
                      >
                        <Controller
                          control={initialSectionForm.control}
                          name="marking_scheme"
                          render={({ field }) => (
                            <TFileUpload
                              className="w-full"
                              id="marking_scheme"
                              label="Upload Marking Scheme (PDF)"
                              isMultiple
                              // onChange={(files) => field.onChange(files)}
                              onChange={(files) => {
                                field.onChange(files);
                                // console.log("files", files);
                                // console.log(
                                //   initialSectionForm.getValues("marking_scheme")
                                // );
                              }}
                              error={
                                initialSectionForm.formState.errors
                                  .marking_scheme?.message
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
