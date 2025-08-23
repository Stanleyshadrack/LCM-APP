"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import "./login.css";
import Footer from "@/components/footer/Footer";

type UserRole = "owner" | "tenant" | "employee";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage("Please enter email and password");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setLoading(true);

    const hardcodedUsers: { email: string; password: string; role: UserRole }[] = [
      { email: "owner@example.com", password: "owner123", role: "owner" },
      { email: "tenant@example.com", password: "tenant123", role: "tenant" },
      { email: "employee@example.com", password: "employee123", role: "employee" },
    ];

    const matchedUser = hardcodedUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (!matchedUser) {
      setErrorMessage("Invalid email or password.");
      setLoading(false);
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    const role: UserRole = matchedUser.role;
    login({ email: matchedUser.email, role });

    // Show success message, then redirect
    setTimeout(() => {
      setLoginSuccess(true);
      setLoading(false);

      setTimeout(() => {
        router.push(`/${role}/dashboard`);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="login-container">
      {(loading || loginSuccess) && (
        <div className="loading-overlay">
          <img
            src="/lcmicon.SVG"
            alt="LCM Logo"
            className={`lcm-loader ${loginSuccess ? "pulse" : "spin"}`}
          />
          <p className={loginSuccess ? "success-text" : "loading-text"}>
            {loginSuccess ? "Login successful!" : "Logging in..."}
          </p>
        </div>
      )}

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
              role="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>
          </div>

          <div className="options">
            <div className="remember">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <div
              className="forgot-link"
              onClick={() => router.push("/forgot-password")}
            >
              Forgot Password?
            </div>
          </div>

          {errorMessage && <div className="error-message">{errorMessage}</div>}

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
        <Footer />
      </div>

      
    </div>
  );
};

export default LoginPage;
