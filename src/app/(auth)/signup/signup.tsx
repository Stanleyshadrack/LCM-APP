"use client";

import React, { useState, useEffect } from "react";
import "./signup.css";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const togglePassword = () => setShowPassword((prev) => !prev);
  const toggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (!/^\+?[0-9\s\-()]{7,15}$/.test(phone)) {
      setError("Please enter a valid phone number.");
      setLoading(false);
      return;
    }

    const userData = {
      email,
      password,
      firstName,
      lastName,
      phone,
    };

    localStorage.setItem("signupData", JSON.stringify(userData));
    setError("");
    setTimeout(() => {
      router.push("/account-type");
    }, 1000); // mimic animation
  };

  return (
    <div className="login-container fade-in">
      <div className="login-box">
        <div className="logname">
          <img src="/lcmicon.SVG" alt="LCM Logo" className="logo" />
          <div className="name">L.C.M</div>
        </div>

        <div className="header">
          Welcome to <span className="header2">Tenant Management System</span>
        </div>

        <form onSubmit={handleNext} autoComplete="off">
          <label>Email</label>
          <input
            type="email"
            placeholder="kamrul@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Phone Number</label>
          <input
            type="text"
            placeholder="+254 712345678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <div className="name-fields">
            <div>
              <label>First Name</label>
              <input
                type="text"
                placeholder="Kamrul"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Hasan"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
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
              {showConfirmPassword ? (
                <EyeInvisibleOutlined />
              ) : (
                <EyeOutlined />
              )}
            </span>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" disabled={loading}>
            {loading ? "Loading..." : "NEXT"}
          </button>
        </form>

        <div className="register">
          <span>Already have an account?</span>
          <span
            className="login-link"
            onClick={() => router.push("/login")}
          >
            Log In
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
