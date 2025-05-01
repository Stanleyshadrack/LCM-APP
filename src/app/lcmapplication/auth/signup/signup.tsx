import React, { useState } from 'react';
import './signup.css'; 
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  

  const toggleConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
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

        <p>Enter your information below to continue</p>


        <form>
  <label>Email</label>
  <input className="email-input" type="email" placeholder="kamrul@gmail.com" />

  <div className="name-fields">
    <div>
      <label>First Name</label>
      <input className="firstname-input" type="text" placeholder="Kamrul" />
    </div>
    <div>
      <label>Last Name</label>
      <input className="lastname-input" type="text" placeholder="Hasan" />
    </div>
  </div>

  <label>Create Password</label>
  <div className="password-input">
    <input
      className="password-field"
      type={showPassword ? "text" : "password"}
      placeholder="********"
    />
    <span className="toggle-icon" onClick={togglePassword}>
      {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
    </span>
  </div>

  <label>Confirm Password</label>
  <div className="password-input">
    <input
      className="confirm-password-field"
      type={showConfirmPassword ? "text" : "password"}
      placeholder="********"
    />
    <span className="toggle-icon" onClick={toggleConfirmPassword}>
      {showConfirmPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
    </span>
  </div>

  <button type="submit">Create Account</button>
</form>


        <div className="register">
          <span>Already have an account?</span>
          <a href="#">Log In</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
