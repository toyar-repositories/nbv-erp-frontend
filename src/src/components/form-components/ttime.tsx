"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface TTimeProps {
  id: string;
  label: string;
  defaultValue?: string;
  error?: string;
  className?: string;
  value?: string;
  onChange?: (val: string) => void;
}

export default function TTime({
  id,
  label,
  defaultValue = "",
  error,
  className,
  value,
  onChange,
}: TTimeProps) {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [period, setPeriod] = useState<"AM" | "PM" | undefined>(undefined);

  // Initialize from defaultValue or controlled value
  useEffect(() => {
    const val = value || defaultValue;
    if (val) {
      const [timePart, periodPart] = val.split(" ");
      if (timePart) {
        const [h, m] = timePart.split(":");
        setHour(h || "");
        setMinute(m || "");
      }
      if (periodPart) setPeriod(periodPart as "AM" | "PM");
    }
  }, [defaultValue, value]);

  // Update combined time string
  useEffect(() => {
    if (onChange) {
      if (hour && minute && period) {
        onChange(`${hour}:${minute} ${period}`);
      } else {
        onChange("");
      }
    }
  }, [hour, minute, period]);

  return (
    <div className={cn("flex flex-col w-full space-y-1", className)}>
      {/* 🏷️ Label */}
      {label && (
        <Label
          htmlFor={id}
          className="text-sm font-medium text-gray-800 select-none"
        >
          {label}
        </Label>
      )}

      {/* ⏰ Time Input Row */}
      <div className="flex items-center space-x-2">
        {/* Hour Input */}
        <Input
          type="number"
          min={1}
          max={12}
          value={hour}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || (+val >= 1 && +val <= 12)) setHour(val);
          }}
          placeholder="HH"
          className="w-14 text-center bg-[#ededef] text-[#484848] border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400"
        />

        <span className="font-semibold text-gray-700">:</span>

        {/* Minute Input */}
        <Input
          type="number"
          min={0}
          max={59}
          value={minute}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "" || (+val >= 0 && +val <= 59)) setMinute(val);
          }}
          placeholder="MM"
          className="w-14 text-center bg-[#ededef] text-[#484848] border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400"
        />

        {/* AM/PM Select */}
        <Select
          value={period}
          onValueChange={(val: "AM" | "PM") => setPeriod(val)}
        >
          <SelectTrigger className="w-[70px] bg-[#ededef] text-[#484848] border-gray-300 focus-visible:ring-1 focus-visible:ring-gray-400">
            <SelectValue placeholder="AM/PM" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="AM">AM</SelectItem>
            <SelectItem value="PM">PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ⚠️ Error Message */}
      {error && <p className="text-red-400 text-xs mt-0 ml-1">{error}</p>}
    </div>
  );
}
