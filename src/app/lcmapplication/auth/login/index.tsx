import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className='logname'>
          <img src="/lcmicon.SVG" alt="LCM Logo" className="logo" />
          <div className='name'>L.C.M</div>
        </div>

        <div className="header">
          Welcome to <span className='header2'>Tenant Management System</span>
        </div>

        <p>Please Login your account.</p>

        <form>
          <label>Email</label>
          <input type="email" placeholder="kamrul@gmail.com" />

          <label>Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"

              
            />
            
          </div>

          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>

          <button type="submit">Log In</button>
        </form>

        <div className="divider">Or Continue With</div>

        <button className="google-button">
          <img src="/google.svg" alt="Google" />
          Google
        </button>

        <div className="register">
          <span>New member here?</span>
          <a href="#">Register Now</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
