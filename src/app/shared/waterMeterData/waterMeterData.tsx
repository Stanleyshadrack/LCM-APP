"use client";
import React, { useState } from "react";
import { Table, Input, Button, DatePicker } from "antd";
import dayjs from "dayjs";
import "./waterMeterData.css";

interface Payment {
  key: string;
  unitId: string;
  apartment: string;
  CurrentReading: string;
  PreviousReading: string;
  Consumption: string;
  TotalAmount: string;
  dateTime: string; // Format: "DD/MM/YYYY"
}

const WaterMetersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);

  const payments: Payment[] = [
    {
      key: "1",
      unitId: "A01",
      apartment: "Bima Heights",
      CurrentReading: "8",
      PreviousReading: "7",
      Consumption: "1000",
      TotalAmount: "KES 2,000",
      dateTime: "02/04/2024 10:30",
    },
    {
      key: "2",
      unitId: "A02",
      apartment: "Wima Heights",
      CurrentReading: "8",
      PreviousReading: "7",
      Consumption: "1000",
      TotalAmount: "KES 2,000",
      dateTime: "02/05/2025 14:45",
    },
  ];

  const columns = [
    { title: "Unit Id", dataIndex: "unitId", key: "unitId" },
    { title: "Apartment", dataIndex: "apartment", key: "apartment" },
    {
      title: "Current Reading",
      dataIndex: "CurrentReading",
      key: "CurrentReading",
    },
    {
      title: "Previous Reading",
      dataIndex: "PreviousReading",
      key: "PreviousReading",
    },
    {
      title: "Consumption(units)",
      dataIndex: "Consumption",
      key: "Consumption",
    },
    { title: "Total Amount", dataIndex: "TotalAmount", key: "TotalAmount" },
    { title: "Date/Time", dataIndex: "dateTime", key: "dateTime" },
  ];

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.unitId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = dateFilter
      ? dayjs(payment.dateTime, "DD/MM/YYYY HH:mm").isSame(dateFilter, "day")
      : true;

    return matchesSearch && matchesDate;
  });

  return (
    <div className="payments-page">
      <div className="page-header">
        <h2>WATER METER READINGS</h2>
        <div className="page-actions">
          <Input
            placeholder="Search by unit/apartment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="Filter by date"
            onChange={(date) => setDateFilter(date)}
            className="search-input"
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredPayments}
        pagination={{ pageSize: 8 }}
        className="payments-table"
      />
    </div>
  );
};

export default WaterMetersPage;
