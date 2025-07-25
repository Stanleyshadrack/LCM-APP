"use client";

import React from "react";
import ProtectedRoute from "@/app/(auth)/ProtectedRoute";
import TasksPage from "./tasks";


export default function EmployeeTasksPage() {
  return (
    <ProtectedRoute allowedRoles={["employee"]}>
      <TasksPage />
    </ProtectedRoute>
  );
}

