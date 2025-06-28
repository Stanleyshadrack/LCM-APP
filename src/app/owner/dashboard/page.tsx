
import ProtectedRoute from "@/app/(auth)/ProtectedRoute";
import OwnerDashboard from "./dashboard";


export default function OwnersDashboard() {
  return (
    <ProtectedRoute allowedRoles={["owner"]}>
      <OwnerDashboard />
    </ProtectedRoute>
  );
}
