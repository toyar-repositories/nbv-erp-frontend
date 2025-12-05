"use client";

import { useState } from "react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TFileUpload(props: {
  id: string;
  label: string;
  className?: string;
  isMultiple?: boolean;
  error?: string;
  accept?: Record<string, string[]>;
  maxFiles?: number;
  maxSize?: number;
  minSize?: number;
  onChange?: (files: File[]) => void;
}) {
  const {
    label,
    className,
    isMultiple = true,
    error,
    accept = { "image/*": [] },
    maxFiles = 10,
    maxSize = 1024 * 1024 * 25, // 10MB
    minSize = 1024, // 1KB
    onChange,
  } = props;

  const [files, setFiles] = useState<File[]>([]);

  const handleDrop = (acceptedFiles: File[]) => {
    const updatedFiles = isMultiple
      ? [...files, ...acceptedFiles]
      : [acceptedFiles[0]];

    setFiles(updatedFiles);
    if (onChange) onChange(updatedFiles);
  };

  const handleRemove = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    if (onChange) onChange(updatedFiles);
  };

  const handleClearAll = () => {
    setFiles([]);
    if (onChange) onChange([]);
  };

  return (
    <div className="w-full space-y-1">
      {/* Label */}
      <Label className="text-sm font-medium text-gray-800">{label}</Label>

      {/* Dropzone */}
      <div
        className={cn(
          "rounded-md border border-gray-300 bg-[#ededef] text-[#484848]",
          "focus-within:ring-1 focus-within:ring-gray-400 transition-all duration-150 ease-in-out",
          className
        )}
      >
        <Dropzone
          accept={accept}
          maxFiles={isMultiple ? maxFiles : 1}
          maxSize={maxSize}
          minSize={minSize}
          onDrop={handleDrop}
          onError={console.error}
          src={files}
        >
          {/* {files.length === 0 ? <DropzoneEmptyState /> : <DropzoneContent />} */}
          <DropzoneContent />
        </Dropzone>
      </div>

      {/* File List */}

      {files.length > 0 && (
        <div className="mt-2 rounded-md border border-gray-200 bg-white p-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">
              Selected Files ({files.length})
            </span>
            {files.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-gray-500 hover:text-red-500"
                onClick={handleClearAll}
              >
                Clear All
              </Button>
            )}
          </div>
          <ul className="space-y-1 max-h-[150px] overflow-y-auto">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded"
              >
                <span className="truncate max-w-[80%]">{file.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-500 hover:text-red-500"
                  onClick={() => handleRemove(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-400 text-xs mt-0 ml-1">{error}</p>}
    </div>
  );
}
