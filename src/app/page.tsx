"use client";

import { authApi } from "@/api/auth-api";
import { useAppSelector } from "@/lib/state-store-hooks";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Home from "./(unauthenticated)/sign-in/page";
import TFooter from "@/components/tfooter";

export default function RootPage() {
  const isAuthenticated = useAppSelector((state) => state.app.isAuthenticated);
  if (isAuthenticated) {
    redirect("/program-management/paper-class/get-paper-class-list-data");
  } else {
    redirect("/sign-in");
  }

  return <></>;
}
