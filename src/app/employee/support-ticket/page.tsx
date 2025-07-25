"use client";

import ProtectedRoute from "@/app/(auth)/ProtectedRoute";
import Tickets from "./ticket";


export default function EmployeeTicketsPage() {
  return (
    <ProtectedRoute allowedRoles={["employee"]}>
      <Tickets />
    </ProtectedRoute>
  );
}

