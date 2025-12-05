"use client";
// import TSidebar from "@/components/tsidebar";
import TFooter from "@/components/tfooter";
import THeaderAuthenticated from "@/components/theader-authenticated";
import { useAppSelector } from "@/lib/state-store-hooks";
import { redirect, useRouter } from "next/navigation";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import TSidebar from "@/components/tsidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";
export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);
  if (!isAuthenticated) {
    redirect("/sign-in");
  }

  return (
    <>
      {isAuthenticated && (
        <>
          <div className="flex flex-col w-[100%] h-[100vh] overflow-hidden">
            <div className="flex flex-row w-[100%]">
              <THeaderAuthenticated />
            </div>
            <div className="flex flex-row w-full h-[calc(100vh-86px)]">
              <div className="flex flex-col w-[300px] bg-[#e9e9e9]">
                <SidebarProvider>
                  <TSidebar />
                </SidebarProvider>
              </div>
              <div className="flex flex-col w-[calc(100%-300px)] overflow-hidden overflow-y-scroll">
                <div className="px-[64px] py-[32px] bg-background text-foreground">
                  {children}
                </div>
              </div>
            </div>
            <div className="flex flex-row w-[100%]">
              <TFooter />
            </div>
          </div>
        </>
      )}
      {!isAuthenticated && (
        <>
          <div className="flex flex-col w-[100%] h-[100vh] overflow-hidden">
            <div className="flex flex-row w-full h-[calc(100vh-95px)]">
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
