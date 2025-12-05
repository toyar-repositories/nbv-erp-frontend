// // "use client";

// // import { forwardRef, useState } from "react";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { Input } from "@/components/ui/input";
// // import { Label } from "@/components/ui/label";
// // import { cn } from "@/lib/utils";

// // interface TSelectProps<T = any> {
// //   id?: string;
// //   label: string;
// //   dalalist: T[];
// //   className?: string;
// //   placeholder?: string;
// //   defaultValue?: string;
// //   error?: string;
// //   labelKey?: keyof T;
// //   valueKey?: keyof T;
// //   idKey?: keyof T;
// //   onChange?: (selectedItem: T) => void;
// //   onOpen?: () => void;
// // }

// // const TSelect = forwardRef<HTMLButtonElement, TSelectProps>(
// //   (
// //     {
// //       id,
// //       label,
// //       dalalist,
// //       className,
// //       placeholder = "Select...",
// //       defaultValue,
// //       error,
// //       labelKey = "name",
// //       valueKey = "id",
// //       idKey = "id",
// //       onChange,
// //       onOpen,
// //     },
// //     ref
// //   ) => {
// //     const [search, setSearch] = useState("");
// //     const [isOpen, setIsOpen] = useState(false);

// //     // Filter items by search
// //     const filteredList = dalalist.filter((item) =>
// //       String(item[labelKey]).toLowerCase().includes(search.toLowerCase())
// //     );

// //     const handleChange = (selectedValue: string) => {
// //       const selectedItem = dalalist.find(
// //         (item) => String(item[valueKey]) === selectedValue
// //       );
// //       if (selectedItem && onChange) onChange(selectedItem);
// //     };

// //     return (
// //       <div className="flex flex-col w-full space-y-1">
// //         {/* Label */}
// //         {label && (
// //           <Label
// //             htmlFor={id}
// //             className="text-sm font-medium text-gray-800 select-none"
// //           >
// //             {label}
// //           </Label>
// //         )}

// //         {/* Select */}
// //         <Select
// //           defaultValue={defaultValue}
// //           onValueChange={handleChange}
// //           onOpenChange={(open) => {
// //             setIsOpen(open);
// //             if (open && onOpen) onOpen();
// //           }}
// //         >
// //           <SelectTrigger
// //             ref={ref}
// //             id={id}
// //             className={cn(
// //               "bg-[#ededef] text-[#484848] focus-visible:ring-1 focus-visible:ring-gray-400",
// //               "border-gray-300",
// //               className
// //             )}
// //           >
// //             <SelectValue placeholder={placeholder} />
// //           </SelectTrigger>

// //           <SelectContent>
// //             {/* Search Input */}
// //             <div className="p-2 sticky top-0 bg-white z-10">
// //               <Input
// //                 placeholder="Search..."
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 className="h-8 text-sm"
// //               />
// //             </div>

// //             {/* Options */}
// //             <div className="max-h-[200px] overflow-y-auto">
// //               {filteredList.length > 0 ? (
// //                 filteredList.map((item: any) => (
// //                   <SelectItem key={item[idKey]} value={String(item[valueKey])}>
// //                     {String(item[labelKey]).charAt(0).toUpperCase() +
// //                       String(item[labelKey]).slice(1)}
// //                   </SelectItem>
// //                 ))
// //               ) : (
// //                 <p className="text-sm text-gray-400 text-center py-2">
// //                   No results found
// //                 </p>
// //               )}
// //             </div>
// //           </SelectContent>
// //         </Select>

// //         {/* Error Message */}
// //         {error && <p className="text-red-400 text-xs mt-0 ml-1">{error}</p>}
// //       </div>
// //     );
// //   }
// // );

// // TSelect.displayName = "TSelect";

// // export default TSelect;

// "use client";

// import { forwardRef, useState, useEffect } from "react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { cn } from "@/lib/utils";

// interface TSelectProps<T = any> {
//   id?: string;
//   label: string;
//   dalalist: T[];
//   className?: string;
//   placeholder?: string;
//   defaultValue?: T; // <-- Now expects an object
//   error?: string;
//   labelKey?: keyof T;
//   valueKey?: keyof T;
//   idKey?: keyof T;
//   onChange?: (selectedItem: T) => void;
//   onOpen?: () => void;
// }

// const TSelect = forwardRef<HTMLButtonElement, TSelectProps>(
//   (
//     {
//       id,
//       label,
//       dalalist,
//       className,
//       placeholder = "Select...",
//       defaultValue,
//       error,
//       labelKey = "name",
//       valueKey = "id",
//       idKey = "id",
//       onChange,
//       onOpen,
//     },
//     ref
//   ) => {
//     const [search, setSearch] = useState("");
//     const [selectedValue, setSelectedValue] = useState<string>("");

//     // Initialize default value if provided as object
//     // useEffect(() => {
//     //   if (defaultValue && defaultValue[valueKey]) {
//     //     setSelectedValue(String(defaultValue[valueKey]));
//     //   }
//     // }, [defaultValue, valueKey]);

//     useEffect(() => {
//       if (defaultValue && defaultValue[valueKey]) {
//         setSelectedValue(String(defaultValue[valueKey]));
//       }
//     }, [defaultValue, valueKey, dalalist]);

//     // Filter items by search
//     const filteredList = dalalist.filter((item) =>
//       String(item[labelKey]).toLowerCase().includes(search.toLowerCase())
//     );

//     const handleChange = (selectedVal: string) => {
//       setSelectedValue(selectedVal);
//       const selectedItem = dalalist.find(
//         (item) => String(item[valueKey]) === selectedVal
//       );
//       if (selectedItem && onChange) onChange(selectedItem);
//     };

//     return (
//       <div className="flex flex-col w-full space-y-1">
//         {/* Label */}
//         {label && (
//           <Label
//             htmlFor={id}
//             className="text-sm font-medium text-gray-800 select-none"
//           >
//             {label}
//           </Label>
//         )}

//         {/* Select */}
//         <Select
//           value={selectedValue}
//           onValueChange={handleChange}
//           onOpenChange={(open) => {
//             if (open && onOpen) onOpen();
//           }}
//         >
//           <SelectTrigger
//             ref={ref}
//             id={id}
//             className={cn(
//               "bg-[#ededef] text-[#484848] focus-visible:ring-1 focus-visible:ring-gray-400",
//               "border-gray-300",
//               className
//             )}
//           >
//             <SelectValue
//               placeholder={placeholder}
//               defaultValue={selectedValue}
//             />
//           </SelectTrigger>

//           <SelectContent>
//             {/* Search Input */}
//             <div className="p-2 sticky top-0 bg-white z-10">
//               <Input
//                 placeholder="Search..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="h-8 text-sm"
//               />
//             </div>

//             {/* Options */}
//             <div className="max-h-[200px] overflow-y-auto">
//               {filteredList.length > 0 ? (
//                 filteredList.map((item: any) => (
//                   <SelectItem key={item[idKey]} value={String(item[valueKey])}>
//                     {String(item[labelKey]).charAt(0).toUpperCase() +
//                       String(item[labelKey]).slice(1)}
//                   </SelectItem>
//                 ))
//               ) : (
//                 <p className="text-sm text-gray-400 text-center py-2">
//                   No results found
//                 </p>
//               )}
//             </div>
//           </SelectContent>
//         </Select>

//         {/* Error Message */}
//         {error && <p className="text-red-400 text-xs mt-0 ml-1">{error}</p>}
//       </div>
//     );
//   }
// );

// TSelect.displayName = "TSelect";

// export default TSelect;

"use client";

import { forwardRef, useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface TSelectProps<T = any> {
  id?: string;
  label: string;
  dalalist: T[];
  className?: string;
  placeholder?: string;
  defaultValue?: T;
  error?: string;
  labelKey?: keyof T;
  valueKey?: keyof T;
  idKey?: keyof T;
  onChange?: (selectedItem: T) => void;
  onOpen?: () => void;
  onAddClick?: () => void; // ✅ new prop for the Add button
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
      onOpen,
      onAddClick, // ✅ added
    },
    ref
  ) => {
    const [search, setSearch] = useState("");
    const [selectedValue, setSelectedValue] = useState<string>("");

    useEffect(() => {
      if (defaultValue && defaultValue[valueKey]) {
        setSelectedValue(String(defaultValue[valueKey]));
      }
    }, [defaultValue, valueKey, dalalist]);

    const filteredList = dalalist.filter((item) =>
      String(item[labelKey]).toLowerCase().includes(search.toLowerCase())
    );

    const handleChange = (selectedVal: string) => {
      setSelectedValue(selectedVal);
      const selectedItem = dalalist.find(
        (item) => String(item[valueKey]) === selectedVal
      );
      if (selectedItem && onChange) onChange(selectedItem);
    };

    return (
      <div className="flex flex-col w-full space-y-1">
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
        <Select
          value={selectedValue}
          onValueChange={handleChange}
          onOpenChange={(open) => {
            if (open && onOpen) onOpen();
          }}
        >
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
            {/* Search Input */}
            <div className="p-2 sticky top-0 bg-white z-10">
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-8 text-sm"
              />
            </div>

            {/* Options */}
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

            {/* ✅ Add New Button */}
            {onAddClick && (
              <div className="border-t border-gray-200 mt-1 p-2 bg-gray-50 sticky bottom-0">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="w-full flex items-center justify-center gap-1 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddClick();
                  }}
                >
                  <Plus className="w-4 h-4" /> Add New
                </Button>
              </div>
            )}
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
