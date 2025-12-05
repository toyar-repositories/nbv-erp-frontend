"use client";

import { ColumnDef } from "@tanstack/react-table";
import PaperSetColumn from "./paper-set-column";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PaperSetColumns = {
  data: any;
};
// export type PaperSetColumns = {
//   id: number;
//   school_location: string;
//   grade: string;
//   program: string;
// };

export const PaperSetColumns: ColumnDef<PaperSetColumns>[] = [
  {
    accessorKey: "data",
    header: "",
    size: 200,
    cell: ({ row }) => {
      return <PaperSetColumn row={row} />;
    },
  },
];
