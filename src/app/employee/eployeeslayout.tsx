"use client";

import RoleBasedLayout from "@/components/layout/RoleBasedLayout";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return <RoleBasedLayout>{children}</RoleBasedLayout>;
}
