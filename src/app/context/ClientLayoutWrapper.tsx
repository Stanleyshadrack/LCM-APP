"use client";

import RoleBasedLayout from "@/components/layout/RoleBasedLayout";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";

const publicRoutes = ["/", "/login", "/signup", "/account-type", "/forgot-password"];

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isPublicRoute = publicRoutes.includes(pathname);

  // Wait for auth status before rendering anything
  if (loading) {
    return <div>Loading...</div>;
  }

  // Public pages: don't require authentication
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Protected pages: only render after loading and when user exists
  return <RoleBasedLayout>{children}</RoleBasedLayout>;
}
