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
  const [uploadProgress, setUploadProgress] = useState(0);

  // 🔹 API setup
  const [uploadLectureRecordingTrigger] =
    programManagementApi.endpoints.uploadLectureRecording.useMutation();
  const [uploadLectureRecordingChunkTrigger] =
    programManagementApi.endpoints.uploadLectureRecordingChunk.useMutation();

  // 🔹 Form schema
  const initialSectionFormSchema = z.object({
    id: z.int().min(1, { message: "Required" }),
    lecture_recording: z.array(z.any()).min(1, { message: "Required" }),
  });

  type InitialSectionFormType = z.infer<typeof initialSectionFormSchema>;

  // 🔹 useForm
  const initialSectionForm = useForm<InitialSectionFormType>({
    resolver: zodResolver(initialSectionFormSchema),
    defaultValues: {
      id: props.initialData ? props.initialData.id : 0,
      lecture_recording: [],
    },
  });

  // 🔹 Submit
  const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
    // try {
    //   setIsLoading(true);

    //   const formData = new FormData();
    //   formData.append("id", data.id.toString());

    //   if (data.lecture_recording && data.lecture_recording.length > 0) {
    //     data.lecture_recording.forEach(function (
    //       savedFileItem: any,
    //       savedFileKey: any
    //     ) {
    //       formData.append("lecture_recording[]", savedFileItem);
    //     });
    //   }

    //   await uploadLectureRecordingTrigger(formData).unwrap();

    //   toast.success("Lecture Recording uploaded successfully!");
    //   dispatch(props.setIsDialogOpen(false));
    //   props.setReloadData(true);
    // } catch (err: any) {
    //   TToast({
    //     label: "Error",
    //     description: err?.data?.message || "Something went wrong.",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }

    try {
      setIsLoading(true);
      setUploadProgress(0);

      if (!data.lecture_recording || data.lecture_recording.length === 0) {
        toast.error("Please select a lecture recording file");
        return;
      }

      const file = data.lecture_recording[0];
      const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB per chunk
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

      for (let index = 0; index < totalChunks; index++) {
        const start = index * CHUNK_SIZE;
        const end = Math.min(file.size, start + CHUNK_SIZE);
        const chunk = file.slice(start, end);

        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("file_name", file.name);
        formData.append("chunk_index", index.toString());
        formData.append("total_chunks", totalChunks.toString());
        formData.append("id", data.id.toString());

        // await fetch(
        //   "api/program-management/paper-class/upload-lecture-recording-chunk",
        //   {
        //     method: "POST",
        //     body: formData,
        //   }
        // );
        await uploadLectureRecordingChunkTrigger(formData).unwrap();

        // progress update
        setUploadProgress(Math.round(((index + 1) / totalChunks) * 98));
      }

      // finalize upload
      const formData1 = new FormData();
      formData1.append("id", data.id.toString());
      formData1.append("file_name", file.name);
      formData1.append("total_chunks", totalChunks.toString());

      await uploadLectureRecordingTrigger(formData1).unwrap();
      // await fetch(
      //   "api/program-management/paper-class/finalize-lecture-recording",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       id: data.id,
      //       file_name: file.name,
      //       total_chunks: totalChunks,
      //     }),
      //   }
      // );
      setUploadProgress(100);
      toast.success("Lecture recording uploaded successfully!");
      dispatch(props.setIsDialogOpen(false));
      props.setReloadData(true);
    } catch (err: any) {
      console.error(err);
      toast.error("Upload failed. Please try again.");
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
              id="upload-lecture-recording-initial-section-form"
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
                    <div className="flex flex-row w-full gap-[8px] mt-[16px]">
                      <div
                        id="lecture_recording_wrapper"
                        className="w-full mt-[16px]"
                      >
                        <Controller
                          control={initialSectionForm.control}
                          name="lecture_recording"
                          render={({ field }) => (
                            <TFileUpload
                              className="w-full"
                              id="lecture_recording"
                              label="Upload Lecture Recording (Video)"
                              isMultiple
                              maxSize={1000000000 * 10} // 10GB
                              onChange={(files) => {
                                field.onChange(files);
                                // console.log("files", files);
                                // console.log(
                                //   initialSectionForm.getValues(
                                //     "lecture_recording"
                                //   )
                                // );
                              }}
                              error={
                                initialSectionForm.formState.errors
                                  .lecture_recording?.message
                              }
                              accept={{ "video/*": [] }}
                            />
                          )}
                        />
                      </div>
                    </div>
                  </div>
                  {/* <div className="flex justify-center items-center w-full h-[400px]">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://drive.google.com/file/d/1ikYWgY-5Xq-zn1yeFxsgh3Wmr7ATfnlT/preview"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div> */}
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
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Spinner />
                Uploading... {uploadProgress}%
              </div>
            ) : (
              "Upload"
            )}
          </TButton>
        </div>
      </div>
    </>
  );
}

// "use client";
// import { Spinner } from "@/components/ui/spinner";
// import { useDispatch } from "react-redux";
// import { useForm, Controller } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { DialogClose } from "@/components/ui/dialog";
// import { cn } from "@/lib/utils";
// import TInput from "@/components/form-components/tinput";
// import TSelect from "@/components/form-components/tselect";
// import TButton from "@/components/form-components/tbutton";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";
// import { z } from "zod";
// import { programManagementApi } from "@/api/program-management-api";

// const initialSectionSchema = z.object({
//   id: z.number(),
//   lecture_recording: z.any().optional(),
//   paper_set: z.string().optional(),
// });

// // 🔹 API setup
// // const [uploadLectureRecordingChunkTrigger] =
// //   programManagementApi.endpoints.uploadLectureRecordingChunk.useMutation();

// // const [uploadLectureRecordingTrigger] =
// //   programManagementApi.endpoints.uploadLectureRecording.useMutation();

// type InitialSectionFormType = z.infer<typeof initialSectionSchema>;

// interface Props {
//   setReloadData: (val: boolean) => void;
//   setIsDialogOpen: (val: boolean) => void;
//   paperSetList?: any[];
// }

// export default function InitialSection(props: {
//   initialData: any;
//   setIsDialogOpen: any;
//   setReloadData: any;
//   sectionMode: any;
// }) {
//   const dispatch = useDispatch();
//   const [isLoading, setIsLoading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const initialSectionForm = useForm<InitialSectionFormType>({
//     resolver: zodResolver(initialSectionSchema),
//     defaultValues: { id: 0 },
//   });

//   // ------------------------------
//   // 📤 Submit Handler
//   // ------------------------------
//   const initialSectionFormOnSubmit = async (data: InitialSectionFormType) => {
//     try {
//       setIsLoading(true);
//       setUploadProgress(0);

//       if (!data.lecture_recording || data.lecture_recording.length === 0) {
//         toast.error("Please select a lecture recording file");
//         return;
//       }

//       const file = data.lecture_recording[0];
//       const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB per chunk
//       const totalChunks = Math.ceil(file.size / CHUNK_SIZE);

//       for (let index = 0; index < totalChunks; index++) {
//         const start = index * CHUNK_SIZE;
//         const end = Math.min(file.size, start + CHUNK_SIZE);
//         const chunk = file.slice(start, end);

//         const formData = new FormData();
//         formData.append("chunk", chunk);
//         formData.append("file_name", file.name);
//         formData.append("chunk_index", index.toString());
//         formData.append("total_chunks", totalChunks.toString());
//         formData.append("id", data.id.toString());

//         await fetch(
//           "api/program-management/paper-class/upload-lecture-recording-chunk",
//           {
//             method: "POST",
//             body: formData,
//           }
//         );
//         // await uploadLectureRecordingChunkTrigger(formData).unwrap();

//         // progress update
//         setUploadProgress(Math.round(((index + 1) / totalChunks) * 100));
//       }

//       // finalize upload
//       const formData1 = new FormData();
//       formData1.append("id", data.id.toString());
//       formData1.append("file_name", file.name);
//       formData1.append("total_chunks", totalChunks.toString());

//       // await uploadLectureRecordingTrigger(formData1).unwrap();
//       await fetch(
//         "api/program-management/paper-class/finalize-lecture-recording",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             id: data.id,
//             file_name: file.name,
//             total_chunks: totalChunks,
//           }),
//         }
//       );

//       toast.success("Lecture recording uploaded successfully!");
//       // dispatch(props.setIsDialogOpen(false));
//       props.setReloadData(true);
//     } catch (err: any) {
//       console.error(err);
//       toast.error("Upload failed. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // ------------------------------
//   // 📋 JSX
//   // ------------------------------
//   return (
//     <form
//       onSubmit={initialSectionForm.handleSubmit(initialSectionFormOnSubmit)}
//     >
//       <div className="flex flex-col gap-[12px]">
//         {/* Paper Set */}
//         {/* <div>
//           <Controller
//             control={initialSectionForm.control}
//             name="paper_set"
//             render={({ field }) => (
//               <TSelect
//                 className="w-full"
//                 label="Paper Set"
//                 id="paper_set"
//                 dalalist={props.paperSetList || []}
//                 placeholder="Select Paper Set"
//                 {...field}
//               />
//             )}
//           />
//         </div> */}

//         {/* File Upload */}
//         <div>
//           <label className="block mb-2 text-sm font-medium text-gray-700">
//             Lecture Recording
//           </label>
//           <input
//             type="file"
//             accept="video/*,audio/*"
//             className="block w-full text-sm border border-gray-300 rounded-md cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
//             onChange={(e) =>
//               initialSectionForm.setValue("lecture_recording", e.target.files)
//             }
//           />
//         </div>

//         {/* Upload Progress */}
//         {isLoading && (
//           <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 mt-2">
//             <div
//               className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//         )}

//         {/* Buttons */}
//         {/* <div className="flex justify-end gap-[8px] mt-[16px]">
//           <DialogClose asChild>
//             <TButton variant="secondary" type="button">
//               Cancel
//             </TButton>
//           </DialogClose>
//           <TButton type="submit" disabled={isLoading}>
//             {isLoading ? (
//               <div className="flex items-center gap-2">
//                 <Spinner size="sm" />
//                 Uploading... {uploadProgress}%
//               </div>
//             ) : (
//               "Upload"
//             )}
//           </TButton>
//         </div> */}
//         <div className="w-full h-[64px] px-[16px] justify-end flex items-center rounded-bl-md rounded-br-md">
//           <DialogClose asChild>
//             <TButton
//               variant="outline"
//               type="close"
//               id="submit-button"
//               className="ml-[16px] flex items-center justify-center gap-2 cursor-pointer"
//               disabled={isLoading}
//               backgroundColor={"#ededef"}
//               color={"#1f1f1f"}
//               onClick={() => {
//                 dispatch(props.setIsDialogOpen(false));
//               }}
//             >
//               Close
//             </TButton>
//           </DialogClose>

//           <TButton
//             type="submit"
//             id="submit-button"
//             className="ml-[16px] flex items-center justify-center gap-2 cursor-pointer"
//             disabled={isLoading}
//             onClick={initialSectionForm.handleSubmit(
//               initialSectionFormOnSubmit
//             )}
//           >
//             {/* {isLoading && <Spinner className="w-4 h-4 animate-spin" />}
//             {isLoading ? "Loading..." : "Submit"} */}
//             {isLoading ? (
//               <div className="flex items-center gap-2">
//                 <Spinner />
//                 Uploading... {uploadProgress}%
//               </div>
//             ) : (
//               "Upload"
//             )}
//           </TButton>
//         </div>
//       </div>
//     </form>
//   );
// }
