"use client";

import React, { useState } from "react";
import "./signup.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("First and Second Passwords do not match!!");
      return;
    }

    setError("");
    router.push("../account-type");
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

        <p>Enter your information below to continue</p>

        <form onSubmit={handleNext}>
          <label>Email</label>
          <input
            type="email"
            placeholder="kamrul@gmail.com"
            required
          />

          <div className="name-fields">
            <div>
              <label>First Name</label>
              <input
                type="text"
                placeholder="Kamrul"
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Hasan"
                required
              />
            </div>
          </div>

          <label>Create Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="toggle-icon" onClick={togglePassword}>
              {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>
          </div>

          <label>Confirm Password</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span className="toggle-icon" onClick={toggleConfirmPassword}>
              {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit">NEXT</button>
        </form>

        <div className="register">
          <span>Already have an account?</span>
          <span
            className="login-link"
            onClick={() => router.push("/login")}
            style={{ cursor: "pointer", color: "#1890ff" }}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
