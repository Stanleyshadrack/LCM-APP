"use client";

import { usePathname } from "next/navigation";
import ClientLayout from "@/components/layout/clientLayout";

// Define public routes — no sidebar/topbar
const noLayoutRoutes = ["/", "/login", "/signup", "/account-type"];

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPublicRoute = noLayoutRoutes.includes(pathname);

  return isPublicRoute ? <>{children}</> : <ClientLayout>{children}</ClientLayout>;
}

