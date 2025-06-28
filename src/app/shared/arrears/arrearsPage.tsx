import React, { useState } from "react";
import { Table, Input, DatePicker, Select, Button, Modal, Tag } from "antd";
import dayjs from "dayjs";
import "./arrearsPage.css";

const { Option } = Select;

interface Payment {
  key: string;
  unitId: string;
  apartment: string;
  TotalPaid?: string;
  AmountDue?: string;
  Commited?: string;
  Assigned?: string;
  dateTime: string;
  Notes?: string;
}

const ArrearsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);
  const [data, setData] = useState<Payment[]>([
    {
      key: "1",
      unitId: "A01",
      apartment: "Bima Heights",
      TotalPaid: "1000",
      AmountDue: "2000",
      Commited: "01/05/2024",
      Assigned: "John Doe",
      dateTime: "02/04/2024 10:30",
      Notes: "Initial follow-up scheduled.",
    },
    {
      key: "2",
      unitId: "A02",
      apartment: "Wima Heights",
      TotalPaid: "11500",
      AmountDue: "3000",
      Commited: "05/05/2025",
      Assigned: "Jane Smith",
      dateTime: "02/05/2025 14:45",
      Notes: "Pending tenant response.",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNoteRecord, setCurrentNoteRecord] = useState<Payment | null>(null);
  const [editedNote, setEditedNote] = useState("");

  const handleAssignChange = (key: string, value: string) => {
    updateRecord(key, { Assigned: value });
  };

  const handleCommitDateChange = (key: string, date: dayjs.Dayjs | null) => {
    updateRecord(key, {
      Commited: date ? date.format("DD/MM/YYYY") : "",
    });
  };

  const updateRecord = (key: string, updates: Partial<Payment>) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, ...updates } : item
      )
    );
  };

  const showNotesModal = (record: Payment) => {
    setCurrentNoteRecord(record);
    setEditedNote(record.Notes || "");
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    if (currentNoteRecord) {
      updateRecord(currentNoteRecord.key, { Notes: editedNote });
    }
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
  };

  const formatCurrency = (value?: string) => {
    if (!value) return "KES 0";
    return `KES ${Number(value).toLocaleString()}`;
  };

  const filteredData = data.filter((item) => {
    const matchesSearch =
      item.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.unitId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDate = dateFilter
      ? dayjs(item.dateTime, "DD/MM/YYYY HH:mm").isSame(dateFilter, "day")
      : true;

    return matchesSearch && matchesDate;
  });

  const columns = [
    { title: "Unit Id", dataIndex: "unitId", key: "unitId" },
    { title: "Apartment", dataIndex: "apartment", key: "apartment" },
    {
      title: "Total Paid",
      dataIndex: "TotalPaid",
      key: "TotalPaid",
      render: (text: string) => formatCurrency(text),
    },
    {
      title: "Amount Due",
      dataIndex: "AmountDue",
      key: "AmountDue",
      render: (text: string) => (
        <Tag className={`arrears-tag ${Number(text) > 0 ? "owed" : "not-owed"}`}>
          {formatCurrency(text)}
        </Tag>
      ),
    },
    {
      title: "Committed Date",
      dataIndex: "Commited",
      key: "Commited",
      render: (_: string, record: Payment) => (
        <DatePicker
          format="DD/MM/YYYY"
          value={record.Commited ? dayjs(record.Commited, "DD/MM/YYYY") : null}
          onChange={(date) => handleCommitDateChange(record.key, date)}
          style={{ width: 150 }}
        />
      ),
    },
    {
      title: "Assigned to",
      dataIndex: "Assigned",
      key: "Assigned",
      render: (_: string, record: Payment) => (
        <Select
          value={record.Assigned || undefined}
          style={{ width: 150 }}
          onChange={(value) => handleAssignChange(record.key, value)}
        >
          <Option value="John Doe">John Doe</Option>
          <Option value="Jane Smith">Jane Smith</Option>
          <Option value="Mark Wilson">Mark Wilson</Option>
        </Select>
      ),
    },
    {
      title: "Notes",
      dataIndex: "Notes",
      key: "Notes",
      render: (_: string, record: Payment) => (
        <Button type="link" onClick={() => showNotesModal(record)} aria-label="Edit Notes">
          View/Edit
        </Button>
      ),
    },
    {
      title: "Date/Time",
      dataIndex: "dateTime",
      key: "dateTime",
      render: (text: string) => dayjs(text, "DD/MM/YYYY HH:mm").format("DD MMM YYYY HH:mm"),
    },
  ];

  return (
    <div className="payments-page">
      <div className="page-header">
        <h2>ARREARS FOLLOW-UP</h2>
        <div className="page-actions">
          <Input
            placeholder="Search by unit/apartment..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search by unit or apartment"
          />
          <DatePicker
            format="DD/MM/YYYY"
            placeholder="Filter by date"
            onChange={(date) => setDateFilter(date)}
            className="search-input"
            aria-label="Filter by date"
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 8 }}
        className="payments-table"
      />

      <Modal
        title={`Edit Notes for ${currentNoteRecord?.unitId || ""}`}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Input.TextArea
          value={editedNote}
          onChange={(e) => setEditedNote(e.target.value)}
          autoSize={{ minRows: 3, maxRows: 6 }}
          placeholder="Enter notes for follow-up..."
        />
      </Modal>
    </div>
  );
};

export default ArrearsPage;
