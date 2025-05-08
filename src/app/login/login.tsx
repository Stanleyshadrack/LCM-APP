'use client';

import React, { useState } from 'react';
import './login.css';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const searchParams = useSearchParams();
  const accountType = searchParams.get('accountType') || 'owner';
  const router = useRouter();

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    setError('');

    // Mock login logic — replace this with your real auth call
    console.log('Logging in as:', accountType, email);

    // Redirect based on account type
    switch (accountType) {
      case 'tenant':
        router.push('/dashboard/tenant');
        break;
      case 'employee':
        router.push('/dashboard/employee');
        break;
      case 'owner':
      default:
        router.push('/dashboard/owner');
        break;
    }
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

        {accountType && (
          <div className="account-type-display">
            <strong>Please Logging in as:</strong>{' '}
            {accountType.charAt(0).toUpperCase() + accountType.slice(1)}
          </div>
        )}

  

        {error && <div className="login-error">{error}</div>}

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            placeholder="kamrul@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <div className="password-input">
            <input
              className="password-field"
              type={showPassword ? 'text' : 'password'}
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="toggle-icon" onClick={togglePassword}>
              {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
            </span>
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Log In</button>
        </form>

        {/* <div className="divider">Or Continue With</div>

        <button className="google-button">
          <img src="/google.svg" alt="Google" />
          Google
        </button> */}

        <div className="register">
          <span>New member here?</span>
          <Link href="/signup">Register Now</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
