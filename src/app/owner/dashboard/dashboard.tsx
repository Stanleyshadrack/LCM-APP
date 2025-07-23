"use client";

import React from "react";
import "./dashboard.css";
import {
  ApartmentOutlined,
  HomeOutlined,
  DollarCircleOutlined,
  FileExclamationOutlined,
  RiseOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import StatCard from "@/app/lcmapplication/protected/widgets/statCard/statcard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const OwnerDashboard = () => {
  const chartData = [
    { name: "Jan", Income: 22000, Expense: 14000 },
    { name: "Feb", Income: 18000, Expense: 9000 },
    { name: "Mar", Income: 30000, Expense: 18000 },
    { name: "Apr", Income: 26000, Expense: 15000 },
  ];

  return (
    <div className="dashboard-content">
      <div className="main-dashboard">
        <h2>OWNER DASHBOARD</h2>

        {/* Stat Cards */}
        <div className="stats-grid">
          <StatCard label="Total Apartments" value="45" icon={<ApartmentOutlined />} />
          <StatCard label="Total Units" value="142" icon={<HomeOutlined />} />
          <StatCard label="Total Amount Paid" value="KES 56,456.00" icon={<DollarCircleOutlined />} />
          <StatCard label="Total Expenses" value="KES 34,200.00" icon={<FileExclamationOutlined />} />
          <StatCard label="Net Income" value="KES 22,256.00" icon={<RiseOutlined />} />
        </div>

        {/* Bar Chart */}
       

        {/* Tables */}
        <div className="payment-section">
          {/* Recent Payments */}
          <div className="payment-card">
            <h4>Recent Payments</h4>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>September 2023</td>
                  <td>KES 4,568.00</td>
                  <td>A02</td>
                </tr>
                <tr>
                  <td>October 2023</td>
                  <td>KES 4,568.00</td>
                  <td>B03</td>
                </tr>
                <tr>
                  <td>November 2023</td>
                  <td>KES 4,568.00</td>
                  <td>H02</td>
                </tr>
              </tbody>
            </table>
            <Link href="/owner/payments">
              <button className="see-invoices-button">View All Payments</button>
            </Link>
          </div>

          {/* Recent Invoices */}
          <div className="payment-card">
            <h4>Recent Invoices</h4>
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>September 2023</td>
                  <td>KES 4,568.00</td>
                  <td>B03</td>
                </tr>
                <tr>
                  <td>October 2023</td>
                  <td>KES 4,568.00</td>
                  <td>C01</td>
                </tr>
                <tr>
                  <td>November 2023</td>
                  <td>KES 4,568.00</td>
                  <td>M02</td>
                </tr>
              </tbody>
            </table>
            <Link href="/owner/invoices">
              <button className="see-invoices-button">View All Invoices</button>
            </Link>
          </div>
        </div>
         <div className="chart-container">
          <h4>Income vs Expense (Quarterly)</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="Income" fill="#15672f" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Expense" fill="#f44336" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
