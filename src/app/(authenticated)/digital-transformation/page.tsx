"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
export default function DigitalTransformationPage() {
  const router = useRouter();
  return (
    <>
      {/* <div className="flex flex-row w-full gap-[8px]">
        <div className="flex flex-col w-full gap-[8px]">
          <div className="flex flex-row w-full gap-[8px]">
            <div className="flex flex-col w-full gap-[8px] items-center">
              <div className="text-[18px] max-w-[720px]">
                ශ්‍රී ලංකාව ඩිජිටල්කරනය කිරීමේ වත්මන් රජයේ වැඩපිළිවෙලට අනුව,
                රජයේ ඩිජිටල් පද්ධතියක් සංවර්ධනය වෙමින් පවතී. එහි අනු-කොටසකි
                ඩිජිටල් පාසල් පද්ධතිය.
              </div>
              <div className="mt-[48px] flex flex-col gap-[8px] items-center px-[64px] py-[32px] bg-[blue] rounded-[16px]">
                <div className="text-[48px]">
                  ශ්‍රී ලංකා රජයේ ඩිජිටල් පද්ධතිය
                </div>
              </div>
              <div className="flex flex-row w-full justify-center items-center">
                <Image
                  className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                  src="/arrow-down.svg"
                  alt=""
                  width={180}
                  height={37}
                  priority
                />
                <div className="text-[24px]">අනු-කොටස</div>
              </div>
              <div
                onClick={() => {
                  router.push("/digital-school-system");
                }}
                className="flex flex-col gap-[8px] items-center px-[64px] py-[32px] bg-[yellow] font-bold text-[black] rounded-[16px] cursor-pointer"
              >
                <div className="text-[48px]">ඩිජිටල් පාසල් පද්ධතිය</div>
                <div className="mt-[24px] flex flex-row w-full justify-center items-center">
                  <Image
                    className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
                    src="/arrow-right-circle.svg"
                    alt=""
                    width={48}
                    height={48}
                    priority
                  />
                  <div className="ml-[8px] text-[24px]">පිවිසෙන්න</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}
