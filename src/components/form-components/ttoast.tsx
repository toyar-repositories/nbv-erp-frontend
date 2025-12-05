"use client";

import { toast } from "sonner";

export default function TToast(props: {
  label: string;
  className?: string;
  description?: string;
  isUndo?: boolean;
}) {
  return toast(props.label, {
    description: props.description,
    action: props.isUndo
      ? {
          label: "Undo",
          onClick: () => console.log("Undo clicked"),
        }
      : undefined,
    className: "bg-green-500 text-white",
  });
}
