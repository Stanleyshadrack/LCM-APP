"use client";
import React, { useState, useMemo } from "react";
import { Table, Input, DatePicker, Typography, Select } from "antd";
import dayjs from "dayjs";
import "./waterMeterData.css";

const { Title } = Typography;
const { Option } = Select;

interface Payment {
  key: string;
  unitId: string;
  apartment: string;
  CurrentReading: string;
  PreviousReading: string;
  Consumption: string;
  TotalAmount: string;
  dateTime: string; // Format: "DD/MM/YYYY HH:mm"
}

const WaterMetersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

  const payments: Payment[] = [
    {
      key: "1",
      unitId: "A01",
      apartment: "Bima Heights",
      CurrentReading: "8",
      PreviousReading: "7",
      Consumption: "1000",
      TotalAmount: "2000",
      dateTime: "02/04/2024 10:30",
    },
    {
      key: "2",
      unitId: "A01",
      apartment: "Bima Heights",
      CurrentReading: "9",
      PreviousReading: "8",
      Consumption: "1000",
      TotalAmount: "2000",
      dateTime: "02/05/2024 10:30",
    },
    {
      key: "3",
      unitId: "A02",
      apartment: "Wima Heights",
      CurrentReading: "10",
      PreviousReading: "8",
      Consumption: "2000",
      TotalAmount: "4000",
      dateTime: "02/05/2025 14:45",
    },
  ];

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.unitId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = dateFilter
      ? dayjs(payment.dateTime, "DD/MM/YYYY HH:mm").isSame(dateFilter, "month")
      : true;

    const matchesUnit =
      selectedUnits.length === 0 || selectedUnits.includes(payment.unitId);

    return matchesSearch && matchesDate && matchesUnit;
  });

  const totalStats = useMemo(() => {
    const totalConsumption = filteredPayments.reduce(
      (sum, p) => sum + parseFloat(p.Consumption || "0"),
      0
    );
    const totalAmount = filteredPayments.reduce(
      (sum, p) => sum + parseFloat(p.TotalAmount || "0"),
      0
    );
    return { totalConsumption, totalAmount };
  }, [filteredPayments]);

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
      title: "Consumption (units)",
      dataIndex: "Consumption",
      key: "Consumption",
    },
    {
      title: "Total Amount (KES)",
      dataIndex: "TotalAmount",
      key: "TotalAmount",
      render: (amount: string) => `KES ${parseFloat(amount).toLocaleString()}`,
    },
    {
      title: "Date/Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Month",
      key: "month",
      render: (_: any, record: Payment) =>
        dayjs(record.dateTime, "DD/MM/YYYY HH:mm").format("MMMM YYYY"),
    },
  ];

  const unitOptions = Array.from(new Set(payments.map((p) => p.unitId)));

  return (
    <div className="payments-page">
      <div className="page-header">
        <Title level={3}>WATER METER READINGS</Title>
        <div className="page-actions">
          <Input
            placeholder="Search by unit/apartment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <DatePicker
            picker="month"
            format="MMMM YYYY"
            placeholder="Filter by month"
            onChange={(date) => setDateFilter(date)}
            className="search-input"
          />
          <Select
            mode="multiple"
            allowClear
            style={{ minWidth: 180 }}
            placeholder="Select unit(s)"
            onChange={(units) => setSelectedUnits(units)}
          >
            {unitOptions.map((unit) => (
              <Option key={unit} value={unit}>
                {unit}
              </Option>
            ))}
          </Select>
        </div>
      </div>

      <div className="summary-box">
        <div>
          Total Consumption: <strong>{totalStats.totalConsumption}</strong> units
        </div>
        <div>
          Total Amount: <strong>KES {totalStats.totalAmount.toLocaleString()}</strong>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredPayments}
        pagination={{ pageSize: 8 }}
        className="payments-table"
        rowKey="key"
      />
    </div>
  );
};

export default WaterMetersPage;
