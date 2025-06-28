"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import "./login.css";

const LoginPage: React.FC = () => {
  const searchParams = useSearchParams();
  const accountTypeParam = searchParams.get("accountType");

  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"owner" | "employee" | "tenant" | null>(null);

  useEffect(() => {
    if (!accountTypeParam) return;
    const normalized = accountTypeParam === "landlord" ? "owner" : accountTypeParam;
    if (["owner", "employee", "tenant"].includes(normalized)) {
      setRole(normalized as "owner" | "employee" | "tenant");
    }
  }, [accountTypeParam]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    if (!role) {
      alert("No role selected.");
      return;
    }

    login(role);

    const routeMap = {
      owner: "/owner/dashboard",
      tenant: "/tenant/dashboard",
      employee: "/employee/dashboard",
    };

    router.push(routeMap[role]);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logname">
          <img src="/lcmicon.SVG" alt="LCM Logo" className="logo" />
          <div className="name">L.C.M</div>
        </div>

        <div className="header">
          Welcome to <span className="header2">Tenant Management System</span>
        </div>

        <p className="account-type-display">
          {role ? `Logging in as: ${role}` : "No role selected"}
        </p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <div className="password-input">
            <input
              className="password-field"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit">Log In</button>
        </form>

        <div className="register">
          <span>Don't have an account?</span>
          <span
            className="login-link"
            onClick={() => router.push("/signup")}
            style={{ cursor: "pointer", color: "#1890ff" }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
