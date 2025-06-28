"use client";

import RoleBasedLayout from "@/components/layout/RoleBasedLayout";
import React from "react";

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return <RoleBasedLayout>{children}</RoleBasedLayout>;
}
