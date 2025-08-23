"use client";

import RoleBasedLayout from "@/components/layout/RoleBasedLayout";
import { usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import "../(auth)/login/login.css";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/account-type",
  "/forgot-password",
  "/terms",
  "/privacy",
];

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const isPublicRoute = publicRoutes.includes(pathname);

  if (loading) {
    return (
      <div className="loading-overlay">
        <img
          src="/lcmicon.SVG"
          alt="LCM Logo"
          className="lcm-loader spin"
        />
        <p className="loading-text">Please wait...</p>
      </div>
    );
  }

  if (isPublicRoute) {
    return <>{children}</>;
  }

  return <RoleBasedLayout>{children}</RoleBasedLayout>;
}
