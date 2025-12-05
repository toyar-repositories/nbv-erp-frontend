"use client";

import { ColumnDef } from "@tanstack/react-table";
import PaperClassStudentEnrolmentColumn from "./paper-class-student-enrolment-column";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PaperClassStudentEnrolmentColumns = {
  data: any;
};
// export type PaperClassStudentEnrolmentColumns = {
//   id: number;
//   school_location: string;
//   grade: string;
//   program: string;
// };

export const PaperClassStudentEnrolmentColumns: ColumnDef<PaperClassStudentEnrolmentColumns>[] =
  [
    {
      accessorKey: "data",
      header: "",
      size: 200,
      cell: ({ row }) => {
        return <PaperClassStudentEnrolmentColumn row={row} />;
      },
    },
  ];
