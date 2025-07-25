"use client";

import { useRouter } from "next/navigation";
import "@/styles/welcome.css";

export default function WelcomePage() {
  const router = useRouter();

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to LCM Application</h1>
      <p className="welcome-subtitle">
        Your one-stop solution for managing apartments and tenants.
      </p>
      <button className="welcome-button" onClick={goToLogin}>
        Get Started
      </button>
    </div>
  );
}
