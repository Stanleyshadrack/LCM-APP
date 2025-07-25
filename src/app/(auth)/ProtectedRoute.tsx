// src/auth/ProtectedRoute.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const router = useRouter();
  const { user } = useAuth();

  if (!user) {
    router.push("/login");
    return null;
  }

  if (!allowedRoles.includes(user.role)) {
    router.push("/account-type");
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

