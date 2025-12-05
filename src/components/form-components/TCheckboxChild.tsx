"use client";

import { Checkbox } from "@nextui-org/react";

interface TCheckboxChildProps {
  id: string;
  label: string;
  valueObject: any;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export default function TCheckboxChild({
  id,
  label,
  valueObject,
  checked = false,
  onChange,
}: TCheckboxChildProps) {
  return (
    <Checkbox
      id={id}
      isSelected={checked}
      onValueChange={(val) => onChange?.(val)}
      radius="sm"
      size="sm"
      className="text-[#333]"
      style={{
        margin: 0,
        padding: 0,
      }}
    >
      {label}
    </Checkbox>
  );
}
