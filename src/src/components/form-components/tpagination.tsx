"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TPaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function TPagination({
  totalPages,
  currentPage,
  onPageChange,
  className,
}: TPaginationProps) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5; // Number of visible pages around current page

    if (totalPages <= maxVisible + 2) {
      // Show all pages if few enough
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // Always show first and last pages
      let start = Math.max(2, currentPage - 2);
      let end = Math.min(totalPages - 1, currentPage + 2);

      if (currentPage <= 3) {
        end = 5;
      } else if (currentPage >= totalPages - 2) {
        start = totalPages - 4;
      }

      pages.push(1);
      if (start > 2) pages.push("...");
      for (let i = start; i <= end; i++) pages.push(i);
      if (end < totalPages - 1) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={cn("flex items-center justify-center gap-0", className)}>
      {/* Prev button */}
      <Button
        variant="outline"
        className="cursor-pointer rounded-none"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      {pages.map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            size="sm"
            className="cursor-pointer rounded-none"
            variant={currentPage === page ? "default" : "outline"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-2 text-gray-500 select-none">
            {page}
          </span>
        )
      )}

      {/* Next button */}
      <Button
        variant="outline"
        size="sm"
        className="cursor-pointer rounded-none"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
