"use client";

import { ColumnDef } from "@tanstack/react-table";
import PaperClassColumn from "./paper-class-column";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PaperClassColumns = {
  data: any;
};
// export type PaperClassColumns = {
//   id: number;
//   school_location: string;
//   grade: string;
//   program: string;
// };

export const PaperClassColumns: ColumnDef<PaperClassColumns>[] = [
  {
    accessorKey: "data",
    header: "",
    size: 200,
    cell: ({ row }) => {
      return <PaperClassColumn row={row} />;
    },
  },
];
