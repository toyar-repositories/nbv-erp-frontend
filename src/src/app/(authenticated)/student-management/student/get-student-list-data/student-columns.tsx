"use client";

import { ColumnDef } from "@tanstack/react-table";
import StudentColumn from "./student-column";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StudentColumns = {
  data: any;
};
// export type StudentColumns = {
//   id: number;
//   school_location: string;
//   grade: string;
//   program: string;
// };

export const StudentColumns: ColumnDef<StudentColumns>[] = [
  {
    accessorKey: "data",
    header: "",
    size: 200,
    cell: ({ row }) => {
      return <StudentColumn row={row} />;
    },
  },
];
