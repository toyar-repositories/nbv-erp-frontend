"use client";

import { ColumnDef } from "@tanstack/react-table";
import StudentSubjectEnrolmentColumn from "./student-subject-enrolment-column";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StudentSubjectEnrolmentColumns = {
  data: any;
};
// export type StudentSubjectEnrolmentColumns = {
//   id: number;
//   school_location: string;
//   grade: string;
//   program: string;
// };

export const StudentSubjectEnrolmentColumns: ColumnDef<StudentSubjectEnrolmentColumns>[] =
  [
    {
      accessorKey: "data",
      header: "",
      size: 200,
      cell: ({ row }) => {
        return <StudentSubjectEnrolmentColumn row={row} />;
      },
    },
  ];
