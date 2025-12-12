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
import { lecturerManagementApi } from "@/api/lecturer-management-api";
import {
  setIsBulkPaperClassScheduleDialogOpenStateStore,
  setIsUploadMarkPaperDialogOpenStateStore,
  setIsViewMarkPaperDialogOpenStateStore,
  setUploadMarkPaper,
  setViewMarkPaper,
} from "@/state-store/slices/program-management/paper-class.slice";
import { Eye, EyeIcon, Search, Upload, UploadIcon } from "lucide-react";
import { Switch } from "@nextui-org/react";
import { Label } from "@radix-ui/react-label";
import { useAppSelector } from "@/lib/state-store-hooks";
import { RootState } from "@/state-store/store";

export default function InitialSection(props: {
  initialData: any;
  setIsDialogOpen: any;
  setReloadData: any;
  sectionMode: any;
}) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [
    paperClassStudentEnrolmentListData,
    setPaperClassStudentEnrolmentListData,
  ] = useState<any[]>([]);

  // 🔹 Redux
  const isPaperClassViewModeActive = useAppSelector(
    (state: RootState) => state.paperClass.isPaperClassViewModeActive
  );

  // API setup
  const [updateStudentPaperMark] =
    programManagementApi.endpoints.updateStudentPaperMark.useMutation();

  const [getPaperClassStudentEnrolmentListDataTrigger] =
    programManagementApi.endpoints.getPaperClassStudentEnrolmentListData.useLazyQuery();

  // Form schema
  const initialSectionFormSchema = z.object({
    id: z.number().min(1, { message: "Required" }),
  });

  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // useForm
  const initialSectionForm = useForm<any>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      id: props.initialData?.id || 0,
    },
  });

  // Fetch enrolled students
  useEffect(() => {
    getPaperClassStudentEnrolmentListDataTrigger({
      page_size: 300,
      page: 1,
      search_filter_list: {
        is_active: true,
        paper_class_id: props.initialData.id,
      },
    })
      .unwrap()
      .then((fulfilled) => {
        setPaperClassStudentEnrolmentListData(fulfilled?.data?.data || []);
      })
      .catch((rejected) => console.error("API Error:", rejected));
  }, []);

  // Submit
  const initialSectionFormOnSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      setSearchQuery("");
      const marks = paperClassStudentEnrolmentListData.map(
        (studentEnrolment) => ({
          student_id: studentEnrolment.student.id,
          student_enrolment_id: studentEnrolment.id,
          mark:
            initialSectionForm.getValues(
              `student_mark_${studentEnrolment.id}`
            ) || 0,
          percentage:
            initialSectionForm.getValues(`percentage_${studentEnrolment.id}`) ||
            0,
          is_present: studentEnrolment.is_present,
        })
      );

      const formData = new FormData();
      formData.append("id", data.id.toString());
      formData.append("marks", JSON.stringify(marks));

      await updateStudentPaperMark(formData).unwrap();

      toast.success("Marks submitted successfully!");
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

  // Handle mark change
  const handleMarkChange = (studentId: number, value: string) => {
    const mark = parseFloat(value || "0");
    const percentage = (
      (mark / props.initialData?.paper.total_marks) *
      100
    ).toFixed(2); // example logic
    initialSectionForm.setValue(`student_mark_${studentId}`, value);
    initialSectionForm.setValue(`percentage_${studentId}`, percentage);
  };

  const [searchQuery, setSearchQuery] = useState("");

  // 🔹 Filtered list based on search
  const filteredStudentList = paperClassStudentEnrolmentListData.filter(
    (studentEnrolment) => {
      const fullName =
        studentEnrolment.student.full_name_with_title?.toLowerCase() || "";
      const total_mark =
        studentEnrolment.student.total_mark?.toLowerCase() || "";
      const admissionNo =
        studentEnrolment.student.admission_number?.toLowerCase() || "";
      const query = searchQuery.toLowerCase();
      return (
        fullName.includes(query) ||
        admissionNo.includes(query) ||
        total_mark.includes(query)
      );
    }
  );

  return (
    <div className={cn("w-full mt-[8px]")}>
      <div className="flex flex-row justify-start items-start gap-[32px] w-full min-h-[400px] max-h-[calc(100vh-270px)] overflow-hidden overflow-y-auto overflow-x-auto">
        <div
          className={cn(
            "w-full pb-[24px] bg-[#fafafa] pr-[8px]",
            isPaperClassViewModeActive
              ? "pointer-events-none"
              : "pointer-events-auto"
          )}
        >
          <form
            id="paper-class-initial-section-form"
            className="w-full px-[8px]"
            onSubmit={initialSectionForm.handleSubmit(
              initialSectionFormOnSubmit
            )}
          >
            {/* 🔍 Search Bar */}
            <div className="flex flex-row w-full gap-[8px] items-center border-b border-[#eee] pb-[8px]">
              <div className="relative w-[300px] my-[8px]">
                <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search student by name or admission no..."
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="text-sm text-gray-500">
                Showing {filteredStudentList.length} of{" "}
                {paperClassStudentEnrolmentListData.length}
              </div>
              <div>hi</div>
            </div>
            {/* Header */}
            {paperClassStudentEnrolmentListData.length > 0 ? (
              <div className="flex flex-row w-full gap-[8px] items-center border-b border-[#eee] pb-[8px]">
                <div className="flex flex-row w-full gap-[8px] items-center">
                  <div className="text-[14px] w-[55%] text-[#000000] text-center font-[700] tracking-[1px]">
                    Student Name
                  </div>
                  <div className="font-[600] px-[6px] w-[15%] text-center">
                    Mark
                    <div className="text-[10px]">
                      (Out of {props.initialData?.paper.total_marks})
                    </div>
                  </div>
                  <div className="w-[15%] text-center font-[600] px-[6px]">
                    Percentage
                    <div className="text-[11px]">(%)</div>
                  </div>
                  <div className="w-[20%] text-center font-[600] px-[6px]">
                    Mark Paper
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center w-full py-[40px] gap-6 text-center">
                {/* Spinner */}
                <div className="flex items-center justify-center">
                  <Spinner className="w-6 h-6 animate-spin text-blue-500" />
                </div>

                {/* Animated skeleton rows */}
                <div className="flex flex-col w-[90%] max-w-[800px] gap-3 mt-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex flex-row items-center justify-between gap-4 animate-pulse"
                    >
                      <div className="h-4 w-[45%] bg-gray-200 rounded-full"></div>
                      <div className="h-4 w-[15%] bg-gray-200 rounded-full"></div>
                      <div className="h-4 w-[15%] bg-gray-200 rounded-full"></div>
                      <div className="h-4 w-[20%] bg-gray-200 rounded-full"></div>
                    </div>
                  ))}
                </div>

                <div className="text-gray-400 text-sm font-medium">
                  Loading student list...
                </div>
              </div>
            )}

            {/* Student rows */}
            {filteredStudentList.map((studentEnrolment) => (
              <div
                key={studentEnrolment.id}
                className="flex flex-row w-full gap-[8px] items-center border-b border-[#eee] pb-[8px]"
              >
                <div className="text-[14px] w-[45%] text-[#484848] font-[600] tracking-[1px]">
                  {studentEnrolment.student.full_name_with_title}
                  <span className="text-[#9d9d9d] border border-[#ddd] rounded-[8px] text-[11px] ml-2 px-[3px]">
                    {studentEnrolment.student.admission_number}
                  </span>
                </div>

                <div className="w-[10%]">
                  <Switch
                    size="sm"
                    color="primary"
                    isSelected={studentEnrolment.is_present ?? false}
                    onValueChange={(checked) => {
                      const updatedList =
                        paperClassStudentEnrolmentListData.map((item) =>
                          item.id === studentEnrolment.id
                            ? {
                                ...item,
                                is_present: checked,
                              }
                            : item
                        );
                      setPaperClassStudentEnrolmentListData(updatedList);

                      // If absent → reset marks & percentage to 0
                      if (checked === false) {
                        initialSectionForm.setValue(
                          `student_mark_${studentEnrolment.id}`,
                          0
                        );
                        initialSectionForm.setValue(
                          `percentage_${studentEnrolment.id}`,
                          0
                        );
                      }
                    }}
                  >
                    {studentEnrolment.is_present ? "Present" : "Absent"}
                  </Switch>
                </div>

                {/* Mark input */}
                <div className="w-[15%]">
                  <Controller
                    name={`student_mark_${studentEnrolment.id}`}
                    control={initialSectionForm.control}
                    defaultValue={studentEnrolment.total_mark}
                    render={({ field }) => (
                      <TInput
                        className={cn({
                          "cursor-not-allowed bg-gray-100 text-gray-400":
                            studentEnrolment.is_present === true ? false : true,
                        })}
                        disabled={
                          studentEnrolment.is_present === true ? false : true
                        }
                        type="number"
                        label=""
                        placeholder="Enter mark"
                        {...field}
                        onChange={(e) =>
                          handleMarkChange(studentEnrolment.id, e.target.value)
                        }
                      />
                    )}
                  />
                </div>

                {/* Percentage input */}
                <div className="w-[15%]">
                  <Controller
                    name={`percentage_${studentEnrolment.id}`}
                    control={initialSectionForm.control}
                    defaultValue={studentEnrolment.percentage}
                    render={({ field }) => (
                      <TInput
                        type="text"
                        label=""
                        placeholder="%"
                        disabled={true}
                        readOnly
                        className="cursor-not-allowed bg-gray-100"
                        {...field}
                        // value={studentEnrolment.percentage}
                      />
                    )}
                  />
                </div>
                <div className="w-[15%]">
                  <TButton
                    variant="outline"
                    type="button"
                    id="add-new-paper-class"
                    className="ml-[16px] flex items-center justify-center gap-2 cursor-pointer"
                    disabled={
                      studentEnrolment.is_present === true ? false : true
                    }
                    onClick={() => {
                      dispatch(setIsUploadMarkPaperDialogOpenStateStore(true));
                      dispatch(
                        setUploadMarkPaper({
                          id: studentEnrolment.id,
                          student_id: studentEnrolment.student.id,
                          paper_class_id: studentEnrolment.paper_class_id,
                        })
                      );
                    }}
                  >
                    <UploadIcon className="w-4 h-4" /> Upload
                  </TButton>
                </div>
                <div className="w-[10%]">
                  <div
                    className={cn({
                      hidden:
                        studentEnrolment
                          .paper_class_student_enrolment_mark_paper_attachment_list
                          .length === 0,
                    })}
                  >
                    <TButton
                      variant="outline"
                      type="button"
                      id="add-new-paper-class"
                      className="ml-[2px] flex items-center justify-center gap-2 cursor-pointer"
                      backgroundColor={"rgb(185 201 218)"}
                      onClick={() => {
                        dispatch(setIsViewMarkPaperDialogOpenStateStore(true));
                        dispatch(
                          setViewMarkPaper({
                            file_id:
                              studentEnrolment
                                .paper_class_student_enrolment_mark_paper_attachment_list[0]
                                .gd_file_id,
                          })
                        );
                      }}
                    >
                      <EyeIcon className="w-4 h-4" />
                    </TButton>
                  </div>
                </div>
              </div>
            ))}
          </form>
        </div>
      </div>

      {/* Footer */}
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
          className={cn(
            "ml-[16px] flex items-center justify-center gap-2 cursor-pointer",
            isPaperClassViewModeActive ? "hidden" : "block"
          )}
          disabled={isLoading}
          onClick={initialSectionForm.handleSubmit(initialSectionFormOnSubmit)}
        >
          {isLoading && <Spinner className="w-4 h-4 animate-spin" />}
          {isLoading ? "Loading..." : "Submit"}
        </TButton>
      </div>
    </div>
  );
}
