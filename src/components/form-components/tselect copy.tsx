"use client";

import { forwardRef, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TSelectProps<T = any> {
  id?: string;
  label: string;
  dalalist: T[];
  className?: string;
  placeholder?: string;
  defaultValue?: string;
  error?: string;
  labelKey?: keyof T;
  valueKey?: keyof T;
  idKey?: keyof T;
  onChange?: (selectedItem: T) => void;
}

const TSelect = forwardRef<HTMLButtonElement, TSelectProps>(
  (
    {
      id,
      label,
      dalalist,
      className,
      placeholder = "Select...",
      defaultValue,
      error,
      labelKey = "name",
      valueKey = "id",
      idKey = "id",
      onChange,
    },
    ref
  ) => {
    const [search, setSearch] = useState("");

    // Filter array based on 'name'
    const filteredList = dalalist.filter((item) =>
      String(item[labelKey]).toLowerCase().includes(search.toLowerCase())
    );

    const handleChange = (selectedValue: string) => {
      const selectedItem = dalalist.find(
        (item) => String(item[valueKey]) === selectedValue
      );
      if (selectedItem && onChange) onChange(selectedItem);
    };

    return (
      <div className="flex flex-col w-full  space-y-1">
        {/* Label */}
        {label && (
          <Label
            htmlFor={id}
            className="text-sm font-medium text-gray-800 select-none"
          >
            {label}
          </Label>
        )}

        {/* Select */}
        <Select defaultValue={defaultValue} onValueChange={handleChange}>
          <SelectTrigger
            ref={ref}
            id={id}
            className={cn(
              "bg-[#ededef] text-[#484848] focus-visible:ring-1 focus-visible:ring-gray-400",
              "border-gray-300",
              className
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>

          <SelectContent>
            {/* Search Field */}
            <div className="p-2 sticky top-0 bg-white z-10">
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 text-sm"
              />
            </div>

            {/* Filtered Items */}
            <div className="max-h-[200px] overflow-y-auto">
              {filteredList.length > 0 ? (
                filteredList.map((item: any) => (
                  <SelectItem key={item[idKey]} value={String(item[valueKey])}>
                    {String(item[labelKey]).charAt(0).toUpperCase() +
                      String(item[labelKey]).slice(1)}
                  </SelectItem>
                ))
              ) : (
                <p className="text-sm text-gray-400 text-center py-2">
                  No results found
                </p>
              )}
            </div>
          </SelectContent>
        </Select>

        {/* Error Message */}
        {error && <p className="text-red-400 text-xs mt-0 ml-1">{error}</p>}
      </div>
    );
  }
);

TSelect.displayName = "TSelect";

export default TSelect;
