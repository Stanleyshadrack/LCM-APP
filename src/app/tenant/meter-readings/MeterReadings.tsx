"use client";

import React, { useState } from "react";
import { Table, DatePicker, Space } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

import styles from "./MeterReadings.module.css";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

const { RangePicker } = DatePicker;

const TenantMeterReadings = () => {
  const ratePerUnit = 75;

  const rawData = [
    { month: "2025-07", label: "July 2025", reading: 8732 },
    { month: "2025-06", label: "June 2025", reading: 8620 },
    { month: "2025-05", label: "May 2025", reading: 8490 },
    { month: "2025-04", label: "April 2025", reading: 8370 },
  ];

const [range, setRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);


const filteredData = rawData.filter((entry) => {
  if (!range) return true;
  const month = dayjs(entry.month);
  return (
    month.isSameOrAfter(range[0], "month") &&
    month.isSameOrBefore(range[1], "month")
  );
});


  const dataSource = filteredData.map((entry, index) => {
    const current = entry.reading;
    const previous = filteredData[index + 1]?.reading ?? current;
    const units = current - previous;
    const amount = units * ratePerUnit;

    return {
      key: index,
      month: entry.label,
      currentReading: current,
      previousReading: previous,
      units,
      amount,
    };
  });

  const columns = [
    { title: "Month", dataIndex: "month", key: "month" },
    { title: "Previous Reading", dataIndex: "previousReading", key: "previousReading" },
    { title: "Current Reading", dataIndex: "currentReading", key: "currentReading" },
    { title: "Units Consumed", dataIndex: "units", key: "units" },
    {
      title: "Amount (KES)",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => `KES ${amount.toLocaleString()}`,
    },
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Water Meter Readings</h1>

      <div className={styles.filter}>
        <Space>
       <RangePicker
  picker="month"
  onChange={(dates) => setRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)}
  allowClear
/>

        </Space>
      </div>

      <Table
        className={styles.table}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </div>
  );
};

export default TenantMeterReadings;
