"use client";
import { ScrollArea } from "@/components/ui/scroll-area";

import { AnyAaaaRecord } from "dns";
import {
  CheckCircle2,
  CheckIcon,
  CircleDotIcon,
  CircleIcon,
  DotIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import InitialSection from "./initial-section";
export default function CreateUpdatePaperClass(props: {
  initialData: any;
  setIsDialogOpen: any;
  setIsSaving: any;
  setReloadData: any;
  setReloadDataCausedByData: any;
}) {
  const [initialSectionMode, setInitialSectionMode] = useState("create");
  const [isInitialSectionComplete, setIsInitialSectionComplete] =
    useState(false);
  const [isSettlementSectionComplete, setIsSettlementSectionComplete] =
    useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!!props.initialData) {
      setInitialSectionMode("update");
    } else {
      setInitialSectionMode("create");
    }
  }, []);

  useEffect(() => {
    if (isSaving) {
      props.setIsSaving(true);
    } else {
      props.setIsSaving(false);
    }
  }, [isSaving]);

  return (
    <div className="w-full mt-[14px]">
      <div className="flex flex-row w-full gap-[32px]">
        {/* <div className="w-auto h-full mt-[8px] hidden">
          <ScrollArea
            type="always"
            className="w-full h-[calc(100vh-128px-96px-196px)]"
          >
            <VerticalTabs
              defaultValue="All"
              className="w-full py-[8px] border-none"
              onValueChange={(value: any) => {}}
            >
              <VerticalTabsList className="flex flex-col gap-[8px] bg-[#ededef] p-[18px] rounded-[2px] border-solid border-[1px] border-[#e0e0e0]">
                <VerticalTabsTrigger
                  key="All"
                  value="All"
                  className="w-full flex flex-row justify-between gap-[32px]"
                >
                  <div>PaperClass</div>
                  <div className="ml-[56px]">
                    {isInitialSectionComplete && <CheckIcon stroke="#8ebc7a" />}
                  </div>
                </VerticalTabsTrigger>
              </VerticalTabsList>
            </VerticalTabs>
          </ScrollArea>
        </div> */}
        <div className="w-full h-full">
          <InitialSection
            // initialData={props.initialData}
            setIsDialogOpen={props.setIsDialogOpen}
            // setIsSaving={setIsSaving}
            setReloadData={props.setReloadData}
            // setReloadDataCausedByData={props.setReloadDataCausedByData}
            sectionMode={initialSectionMode}
            // setSectionMode={setInitialSectionMode}
            // setIsSectionComplete={setIsInitialSectionComplete}
            // isSectionComplete={isInitialSectionComplete}
            // isPreviousSectionComplete={true}
            // isNextSectionComplete={isSettlementSectionComplete}
          />
        </div>
      </div>
    </div>
  );
}
