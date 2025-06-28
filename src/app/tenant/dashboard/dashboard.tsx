"use client";

import React from "react";
import "./dashboard.css";

const TenantDashboard = () => {
  return (
    <div className="tenant-dashboard-container">
      {/* Greeting Section */}
      <div className="dashboard-header">
        <h1>Hello, Kamrul 👋</h1>
        <p>Here’s what’s happening with your account</p>
      </div>

      {/* Statistics Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Current Balance</h3>
          <p className="stat-value">KES 4,250</p>
        </div>
        <div className="stat-card">
          <h3>Next Due Date</h3>
          <p className="stat-value">5th July, 2025</p>
        </div>
        <div className="stat-card">
          <h3>Meter Reading</h3>
          <p className="stat-value">8732 kWh</p>
        </div>
        <div className="stat-card">
          <h3>Tickets</h3>
          <p className="stat-value">2 Open</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="section">
        <h2>Recent Payments</h2>
        <div className="activity-list">
          <div className="activity-item">
            <span>June Rent</span>
            <span className="amount paid">KES 4,250</span>
          </div>
          <div className="activity-item">
            <span>Electricity Top-Up</span>
            <span className="amount paid">KES 1,200</span>
          </div>
          <div className="activity-item">
            <span>Water Bill</span>
            <span className="amount unpaid">Pending</span>
          </div>
        </div>
      </div>

      {/* Quick Support */}
      <div className="section">
        <h2>Need Help?</h2>
        <div className="support-grid">
          <div className="support-card">
            <h4>Submit Ticket</h4>
            <p>Report an issue or request assistance.</p>
          </div>
          <div className="support-card">
            <h4>View Responses</h4>
            <p>Check feedback on your previous tickets.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantDashboard;

