"use client";

import React from "react";
import "./dashboard.css";
import {
  ApartmentOutlined,
  DollarCircleOutlined,
  FileDoneOutlined,
  MessageOutlined,
  FileExclamationOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import StatCard from "@/app/lcmapplication/protected/widgets/statCard/statcard";

interface Payment {
  key: string;
  date: string;
  amount: string;
  unit: string;
}

const payments: Payment[] = [
  { key: "1", date: "July 2025", amount: "KES 4,800.00", unit: "D01" },
  { key: "2", date: "June 2025", amount: "KES 4,568.00", unit: "A02" },
  { key: "3", date: "May 2025", amount: "KES 4,568.00", unit: "B03" },
  { key: "4", date: "April 2025", amount: "KES 4,568.00", unit: "H02" },
  { key: "5", date: "March 2025", amount: "KES 4,200.00", unit: "F01" },
];

const invoices: Payment[] = [
  { key: "1", date: "July 2025", amount: "KES 5,000.00", unit: "A01" },
  { key: "2", date: "June 2025", amount: "KES 4,568.00", unit: "B03" },
  { key: "3", date: "May 2025", amount: "KES 4,568.00", unit: "C01" },
  { key: "4", date: "April 2025", amount: "KES 4,568.00", unit: "M02" },
  { key: "5", date: "March 2025", amount: "KES 4,400.00", unit: "L01" },
];

const columns: ColumnsType<Payment> = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Unit",
    dataIndex: "unit",
    key: "unit",
    render: (unit) => <Tag color="blue">{unit}</Tag>,
  },
];

const DashboardEmployee = () => {
  return (
    <div className="dashboard-content">
      <div className="main-dashboard">
        <h2>EMPLOYEE DASHBOARD</h2>

        <div className="stats-grid">
          <StatCard label="Pending Tasks" value="4" icon={<FileExclamationOutlined />} />
          <StatCard label="Open Tickets" value="3" icon={<MessageOutlined />} />
          <StatCard label="Units" value="400" icon={<DollarCircleOutlined />} />
          <StatCard label="Tenants" value="5" icon={<FileDoneOutlined />} />
        </div>

        <div className="payment-section">
          {/* Recent Payments */}
          <div className="payment-card">
            <h4>Recent Payments</h4>
            <Table
              dataSource={payments.slice(0, 4)}
              columns={columns}
              pagination={false}
              size="small"
              bordered
            />
            <Link href="/employee/payments">
              <button className="see-invoices-button">View All Payments</button>
            </Link>
          </div>

          {/* Recent Invoices */}
          <div className="payment-card">
            <h4>Recent Invoices</h4>
            <Table
              dataSource={invoices.slice(0, 4)}
              columns={columns}
              pagination={false}
              size="small"
              bordered
            />
            <Link href="/shared/invoices">
              <button className="see-invoices-button">View All Invoices</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardEmployee;
