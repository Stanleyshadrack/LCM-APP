"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Table, Input, DatePicker, Typography, Select } from "antd";
import dayjs from "dayjs";
import { useStore, StoreState  } from "@/app/lcmapplication/store/useStore"; // centralized store
import "./waterMeterData.css";

const { Title } = Typography;
const { Option } = Select;

const WaterMetersPage = () => {
  const {
    waterMeters,
    fetchWaterMeters,
    searchTerm,
    setSearchTerm,
    monthFilter,
    setMonthFilter,
  } = useStore((state: StoreState) => state);

  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

  // 🟢 Fetch dummy data once on mount
  useEffect(() => {
    fetchWaterMeters();
  }, [fetchWaterMeters]);

  // 🔍 Filtering logic
  const filteredMeters = waterMeters.filter((m) => {
    const matchesSearch =
      m.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.unitId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = monthFilter
      ? dayjs(m.dateTime, "DD/MM/YYYY HH:mm").isSame(monthFilter, "month")
      : true;

    const matchesUnit =
      selectedUnits.length === 0 || selectedUnits.includes(m.unitId);

    return matchesSearch && matchesDate && matchesUnit;
  });

  // 📊 Totals
  const totalStats = useMemo(() => {
    const totalConsumption = filteredMeters.reduce(
      (sum, p) => sum + parseFloat(p.Consumption || "0"),
      0
    );
    const totalAmount = filteredMeters.reduce(
      (sum, p) => sum + parseFloat(p.TotalAmount || "0"),
      0
    );
    return { totalConsumption, totalAmount };
  }, [filteredMeters]);

  // 📋 Table columns
  const columns = [
    { title: "Unit Id", dataIndex: "unitId", key: "unitId" },
    { title: "Apartment", dataIndex: "apartment", key: "apartment" },
    { title: "Current Reading", dataIndex: "CurrentReading", key: "CurrentReading" },
    { title: "Previous Reading", dataIndex: "PreviousReading", key: "PreviousReading" },
    { title: "Consumption (units)", dataIndex: "Consumption", key: "Consumption" },
    {
      title: "Total Amount (KES)",
      dataIndex: "TotalAmount",
      key: "TotalAmount",
      render: (amount: string) => `KES ${parseFloat(amount).toLocaleString()}`,
    },
    { title: "Date/Time", dataIndex: "dateTime", key: "dateTime" },
    {
      title: "Month",
      key: "month",
      render: (_: any, record: any) =>
        dayjs(record.dateTime, "DD/MM/YYYY HH:mm").format("MMMM YYYY"),
    },
  ];

  const unitOptions = Array.from(new Set(waterMeters.map((p) => p.unitId)));

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
            onChange={(date) => setMonthFilter(date)}
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
          Total Amount:{" "}
          <strong>KES {totalStats.totalAmount.toLocaleString()}</strong>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredMeters}
        pagination={{ pageSize: 8 }}
        className="payments-table"
        rowKey="key"
      />
    </div>
  );
};

export default WaterMetersPage;
