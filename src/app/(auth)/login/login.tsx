"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "./login.css";

type UserRole = "owner" | "tenant" | "employee";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👁️ Toggle state

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    const hardcodedUsers: { email: string; password: string; role: UserRole }[] = [
      { email: "owner@example.com", password: "owner123", role: "owner" },
      { email: "tenant@example.com", password: "tenant123", role: "tenant" },
      { email: "employee@example.com", password: "employee123", role: "employee" },
    ];

    const matchedUser = hardcodedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      alert("Invalid email or password.");
      return;
    }

    const role: UserRole = matchedUser.role;

    const routeMap: Record<UserRole, string> = {
      owner: "/owner/dashboard",
      tenant: "/tenant/dashboard",
      employee: "/employee/dashboard",
    };

    login({ email: matchedUser.email, role });
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
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-icon"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>
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
