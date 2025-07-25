"use client";

import ProtectedRoute from "@/app/(auth)/ProtectedRoute";
import Readings from "./readings";

export default function ReadingsPage() {
  return (
    <ProtectedRoute allowedRoles={["employee", "owner"]}>
      <Readings />
    </ProtectedRoute>
  );
}
