"use client";

import { ReactNode } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function TButton(props: {
  variant?: any;
  type: any;
  id: any;
  className: any;
  defaultValue?: any;
  disabled?: boolean;
  onClick?: () => void;
  children?: ReactNode;
  color?: any;
  backgroundColor?: any;
}) {
  return (
    // <div className="w-full">
    <Button
      variant={props.variant}
      type={props.type}
      id={props.id}
      defaultValue={props.defaultValue}
      className={cn(props.className, "cursor-pointer")}
      style={{
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : "#1a6aff",
        color: props.color ? props.color : "white",
        // color: "white",
      }}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
    // </div>
  );
}
