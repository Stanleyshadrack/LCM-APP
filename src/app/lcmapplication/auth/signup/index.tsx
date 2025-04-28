import React, { useState } from 'react';
import './signup.css'; // Reusing the same CSS for styling consistency

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
          <input type="email" placeholder="kamrul@gmail.com" />

          <div className="name-fields">
            <div>
              <label>First Name</label>
              <input type="text" placeholder="Kamrul" />
            </div>
            <div>
              <label>Last Name</label>
              <input type="text" placeholder="Hasan" />
            </div>
          </div>

          <label>Create Password</label>
          <div className="password-input">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="********"
            />
          </div>

          <label>Confirm Password</label>
          <div className="password-input">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="********"
            />
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
