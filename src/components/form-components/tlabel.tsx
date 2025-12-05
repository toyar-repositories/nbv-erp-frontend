"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

export default function TLabel(props: {
  id: string;
  label: string;
  className?: string;
}) {
  return (
    <div className="w-full">
      <Label
        htmlFor={props.id}
        className={cn("text-sm font-medium text-gray-900", props.className)}
      >
        {props.label}
      </Label>
    </div>
  );
}
