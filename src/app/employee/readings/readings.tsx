"use client";

import { useState } from "react";
import { Table, Button, Space, Tooltip, message } from "antd";
import { EditOutlined } from "@ant-design/icons";
import AddMeterReadingDrawer from "@/app/drawer/addMeterReadingDrawer";
import "./readings.css";

const Readings = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [editingReading, setEditingReading] = useState<any | null>(null);
  const [readings, setReadings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const units = [
    {
      id: "A01",
      apartment: "Bima Heights",
      lastReading: 8,
      unitCost: 900,
      name: "Unit A01",
    },
    {
      id: "A02",
      apartment: "Wima Heights",
      lastReading: 8,
      unitCost: 1200,
      name: "Unit A02",
    },
    
  ];

  const handleNewReading = (newData: any) => {
    setLoading(true);

    setTimeout(() => {
      if (editingReading) {
        setReadings((prev) =>
          prev.map((r) =>
            r.unitId === editingReading.unitId && r.timestamp === editingReading.timestamp
              ? newData
              : r
          )
        );
        message.success("Meter reading updated successfully.");
        setEditingReading(null);
      } else {
        const duplicate = readings.find(
          (r) => r.unitId === newData.unitId && r.timestamp === newData.timestamp
        );
        if (duplicate) {
          message.error("Duplicate reading entry for this unit and timestamp.");
          setLoading(false);
          return;
        }
        setReadings((prev) => [...prev, newData]);
        message.success("Meter reading added successfully.");
      }

      setDrawerOpen(false);
      setLoading(false);
    }, 600);
  };

  const handleEdit = (reading: any) => {
    setEditingReading(reading);
    setDrawerOpen(true);
  };

  const hasNotes = readings.some((r) => r.note && r.note.trim() !== "");

  const columns = [
    {
      title: "Unit ID",
      dataIndex: "unitId",
      sorter: (a: any, b: any) => a.unitId.localeCompare(b.unitId),
      filters: Array.from(new Set(units.map((u) => u.id))).map((id) => ({
        text: id,
        value: id,
      })),
      onFilter: (value: any, record: any) => record.unitId === value,
    },
    {
      title: "Apartment",
      dataIndex: "apartment",
      sorter: (a: any, b: any) => a.apartment.localeCompare(b.apartment),
      filters: Array.from(new Set(units.map((u) => u.apartment))).map(
        (apt) => ({ text: apt, value: apt })
      ),
      onFilter: (value: any, record: any) => record.apartment === value,
    },
    {
      title: "Previous",
      dataIndex: "previousReading",
      sorter: (a: any, b: any) => a.previousReading - b.previousReading,
    },
    {
      title: "Current",
      dataIndex: "currentReading",
      sorter: (a: any, b: any) => a.currentReading - b.currentReading,
    },
    {
      title: "Consumption (units)",
      dataIndex: "consumption",
      sorter: (a: any, b: any) => a.consumption - b.consumption,
    },
    {
      title: "Amount (KES)",
      dataIndex: "amount",
      sorter: (a: any, b: any) => a.amount - b.amount,
    },
    {
      title: "Date/Time",
      dataIndex: "timestamp",
      sorter: (a: any, b: any) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      render: (val: string) => new Date(val).toLocaleString(),
    },
    ...(hasNotes
      ? [
          {
            title: "Note",
            dataIndex: "note",
            render: (text: string) =>
              text?.trim() ? (
                <Tooltip title={text}>
                  <span className="meter-ellipsis">{text}</span>
                </Tooltip>
              ) : (
                "-"
              ),
          },
        ]
      : []),
    {
      title: "Actions",
      render: (_: any, record: any) => (
        <Tooltip title="Edit Meter Reading">
          <Button
            onClick={() => handleEdit(record)}
            type="link"
            icon={<EditOutlined />}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="meter-readings-container">
      
        <h2>Water Meter Readings</h2>
        <p className="meter-subtext">
          
        </p>
<div className="actions-div ">
        <Space style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            className="meter-add-button"
            onClick={() => setDrawerOpen(true)}
          >
            Add Meter Reading
          </Button>
        </Space>
        </div>

        <Table
          dataSource={readings}
          columns={columns}
          rowKey={(record) => `${record.unitId}-${record.timestamp}`}
          pagination={{ pageSize: 5 }}
          loading={loading}
        />

        <AddMeterReadingDrawer
          open={drawerOpen}
          onClose={() => {
            setDrawerOpen(false);
            setEditingReading(null);
          }}
          onSubmit={handleNewReading}
          units={units}
          editingReading={editingReading}
        />
      
    </div>
  );
};

export default Readings;
