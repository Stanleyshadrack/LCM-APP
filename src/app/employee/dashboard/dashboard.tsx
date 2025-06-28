"use client";

import React from "react";
import "./dashboard.css";
import {
  ApartmentOutlined,
  HomeOutlined,
  DollarCircleOutlined,
  FileDoneOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import StatCard from "@/app/lcmapplication/protected/widgets/statCard/statcard";

const DashboardEmployee = () => {
  return (
    <div className="dashboard-content">
      <div className="main-dashboard">
        <h2>EMPLOYEE DASHBOARD</h2>

        <div className="stats-grid">
          <StatCard label="Total Apartments" value="45" icon={<ApartmentOutlined />} />
          <StatCard label="Total Units" value="142" icon={<HomeOutlined />} />
          <StatCard label="Total Amount Paid" value="KES 56,456.00" icon={<DollarCircleOutlined />} />
          <StatCard label="Total Invoices" value="85" icon={<FileDoneOutlined />} />
        </div>

        <div className="payment-section">
          {/* Payment History */}
          <div className="payment-card">
            <h4>Recent Payments</h4>
            <table>
              <thead>
                <tr>
                  <th>Payment Date</th>
                  <th>Amount</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>June 2024</td>
                  <td>KES 4,568.00</td>
                  <td>A02</td>
                </tr>
                <tr>
                  <td>May 2024</td>
                  <td>KES 4,568.00</td>
                  <td>B03</td>
                </tr>
                <tr>
                  <td>April 2024</td>
                  <td>KES 4,568.00</td>
                  <td>H02</td>
                </tr>
              </tbody>
            </table>
            <Link href="/payments">
              <button className="see-invoices-button">View All Payments</button>
            </Link>
          </div>

          {/* Invoice History */}
          <div className="payment-card">
            <h4>Recent Invoices</h4>
            <table>
              <thead>
                <tr>
                  <th>Invoice Date</th>
                  <th>Amount</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>June 2024</td>
                  <td>KES 4,568.00</td>
                  <td>B03</td>
                </tr>
                <tr>
                  <td>May 2024</td>
                  <td>KES 4,568.00</td>
                  <td>C01</td>
                </tr>
                <tr>
                  <td>April 2024</td>
                  <td>KES 4,568.00</td>
                  <td>M02</td>
                </tr>
              </tbody>
            </table>
            <Link href="/invoices">
              <button className="see-invoices-button">View All Invoices</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployee;
