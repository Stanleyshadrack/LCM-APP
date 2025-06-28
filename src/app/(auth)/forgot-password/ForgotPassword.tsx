'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import './forgot-password.css';

const ForgotPassword = () => {
  const [contact, setContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!contact) {
      setError('Email or phone number is required');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      console.log(`Password reset link sent to ${contact}`);
    }, 2000);
  };

  const handleBack = () => {
    setContact('');
    setSubmitted(false);
  };

  const goToLogin = () => {
    router.push('/login');
  };

  return (
    <div className="forgot-container">
      <div className="forgot-box">
        <div className="logname">
          <img src="/lcmicon.svg" alt="LCM Logo" className="logo" />
          <div className="name">L.C.M</div>
        </div>

        <div className="header">
          Forgot Your <span className="header2">Password?</span>
        </div>

        <p className="subtitle">
          Enter your email or phone number to reset your password.
        </p>

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="spinner" />
        ) : submitted ? (
          <div className="success-wrapper">
            <div className="success-message animate-success">
              Password reset instructions have been sent!
            </div>
            <div className="success-buttons">
              <button onClick={handleBack}>Go Back</button>
              <button onClick={goToLogin}>Proceed to Login</button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label>Email or Phone Number</label>
            <input
              type="text"
              placeholder="kamrul@gmail.com or 0712345678"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <button type="submit">Send Reset Link</button>
          </form>
        )}

        {!submitted && (
          <div className="register">
            <span>Remember your password?</span>
            <a href="/login">Back to Login</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
