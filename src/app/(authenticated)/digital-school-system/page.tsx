"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function DigitalTransformationPage() {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-row w-full gap-[8px]">
        <div className="flex flex-col w-full gap-[8px]">
          <div className="flex flex-row w-full gap-[8px]">
            <div className="flex flex-col w-full gap-[8px] items-center">
              DSS
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
