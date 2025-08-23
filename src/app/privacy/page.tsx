import { Suspense } from "react";
import PrivacyPage from "./privacy";


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PrivacyPage />
    </Suspense>
  );
}
