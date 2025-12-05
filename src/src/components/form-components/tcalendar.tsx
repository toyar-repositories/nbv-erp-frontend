"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function formatDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function TCalendar(props: {
  label: string;
  id?: string;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  error?: string;
  minDate: Date;
  maxDate: Date;
  onChange?: (date: Date) => void;
  value?: Date;
}) {
  const {
    label,
    id,
    className,
    defaultValue,
    placeholder = "Select date",
    error,
    minDate,
    maxDate,
    onChange,
    value,
  } = props;

  const [open, setOpen] = React.useState(false);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    value ?? (defaultValue ? new Date(defaultValue) : undefined)
  );

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    onChange?.(date);
    setOpen(false);
  };

  return (
    <div className={cn("flex flex-col w-full space-y-1", className)}>
      {/* Label */}
      {label && (
        <Label
          htmlFor={id}
          className="text-sm font-medium text-gray-800 select-none"
        >
          {label}
        </Label>
      )}

      {/* Calendar Input Field */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            type="button"
            variant="outline"
            onClick={() => setOpen(true)}
            className={cn(
              "w-full justify-start bg-[#ededef] text-[#484848] font-normal",
              "border border-gray-300 rounded-md h-9 px-3 text-sm",
              "focus-visible:ring-1 focus-visible:ring-gray-400",
              !selectedDate && "text-gray-500"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-gray-600" />
            {selectedDate ? formatDate(selectedDate) : placeholder}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={4}
          className="w-auto p-0 bg-zinc-100 shadow-lg rounded-md"
        >
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            captionLayout="dropdown"
            disabled={(date) => date > maxDate || date < minDate}
          />
        </PopoverContent>
      </Popover>

      {/* Error Message */}
      {error && <p className="text-red-400 text-xs mt-0 ml-1">{error}</p>}
    </div>
  );
}
