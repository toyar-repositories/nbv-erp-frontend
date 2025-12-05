"use client";
import { useAppSelector } from "@/lib/state-store-hooks";
import { useRouter, redirect } from "next/navigation";
import TFooter from "@/components/tfooter";
import THeaderUnauthenticated from "@/components/theader-unauthenticated";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);
  if (isAuthenticated) {
    redirect("/program-management/paper-class/get-paper-class-list-data");
  }

  return (
    <>
      {!isAuthenticated && (
        <>
          <div className="flex flex-col w-[100%] h-[100vh] overflow-hidden">
            <div className="flex flex-row w-[100%]">
              <THeaderUnauthenticated />
            </div>
            <div className="flex flex-row w-full h-[calc(100vh-86px)]">
              {children}
            </div>
            <div className="flex flex-row w-[100%]">
              <TFooter />
            </div>
          </div>
        </>
      )}
    </>
  );
}
