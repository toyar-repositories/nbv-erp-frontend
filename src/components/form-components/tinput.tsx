"use client";

import { forwardRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const TInput = forwardRef<HTMLInputElement, TInputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1">
        {/* Label */}
        <Label htmlFor={props.id} className="text-sm font-medium text-gray-800">
          {label}
        </Label>

        {/* Input Field */}
        <Input
          ref={ref}
          {...props}
          className={cn(
            "bg-[#ededef] text-[#484848] focus-visible:ring-1 focus-visible:ring-gray-400",
            "border-gray-300",
            className
          )}
        />

        {/* Error Message */}
        {error && <p className="text-red-400 text-xs mt-0 ml-1">{error}</p>}
      </div>
    );
  }
);

TInput.displayName = "TInput";

export default TInput;
