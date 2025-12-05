"use client";

import { ColumnDef } from "@tanstack/react-table";
import LecturerTimeScheduleColumn from "./lecturer-time-schedule-column";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type LecturerTimeScheduleColumns = {
  data: any;
};
// export type LecturerTimeScheduleColumns = {
//   id: number;
//   school_location: string;
//   grade: string;
//   program: string;
// };

export const LecturerTimeScheduleColumns: ColumnDef<LecturerTimeScheduleColumns>[] =
  [
    {
      accessorKey: "data",
      header: "",
      size: 200,
      cell: ({ row }) => {
        return <LecturerTimeScheduleColumn row={row} />;
      },
    },
  ];
