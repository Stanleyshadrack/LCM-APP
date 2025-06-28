"use client";

import ProtectedRoute from "@/app/(auth)/ProtectedRoute";
import DashboardEmployee from "./dashboard";

export default function ApartmentsPage() {
  return (
    <ProtectedRoute allowedRoles={["employee"]}>
      <DashboardEmployee />
    </ProtectedRoute>
  );
}
