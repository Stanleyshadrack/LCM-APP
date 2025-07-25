import React, { useState } from "react";
import {
  Table,
  Input,
  DatePicker,
  Select,
  Button,
  Modal,
  Tag,
  message,
} from "antd";
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
  lastReminderSent?: string;
}

const ArrearsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState<dayjs.Dayjs | null>(null);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [bulkAssignee, setBulkAssignee] = useState<string | undefined>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNoteRecord, setCurrentNoteRecord] = useState<Payment | null>(
    null
  );
  const [editedNote, setEditedNote] = useState("");

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
      lastReminderSent: "10/07/2024",
    },
    {
      key: "2",
      unitId: "A02",
      apartment: "Wima Heights",
      TotalPaid: "11500",
      AmountDue: "300",
      Commited: "05/05/2025",
      Assigned: "Jane Smith",
      dateTime: "02/05/2025 14:45",
      Notes: "Pending tenant response.",
      lastReminderSent: "18/07/2024",
    },
  ]);

  const formatCurrency = (value?: string) => {
    if (!value) return "KES 0";
    return `KES ${Number(value).toLocaleString()}`;
  };

  const updateRecord = (key: string, updates: Partial<Payment>) => {
    setData((prev) =>
      prev.map((item) => (item.key === key ? { ...item, ...updates } : item))
    );
  };

  const handleAssignChange = (key: string, value: string) => {
    updateRecord(key, { Assigned: value });
  };

  const handleCommitDateChange = (key: string, date: dayjs.Dayjs | null) => {
    updateRecord(key, {
      Commited: date ? date.format("DD/MM/YYYY") : "",
    });
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

  const handleModalCancel = () => setIsModalVisible(false);

  const handleSendReminder = (record: Payment) => {
    updateRecord(record.key, {
      lastReminderSent: dayjs().format("DD/MM/YYYY"),
    });
    message.success(`Reminder sent to ${record.unitId}`);
  };

  const handleBulkAssign = () => {
    setData((prev) =>
      prev.map((item) =>
        selectedRowKeys.includes(item.key)
          ? { ...item, Assigned: bulkAssignee }
          : item
      )
    );
    setSelectedRowKeys([]);
    setBulkAssignee(undefined);
    message.success("Bulk assignment completed.");
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
  {
    title: "Unit Id",
    dataIndex: "unitId",
    key: "unitId",
    sorter: (a: Payment, b: Payment) => a.unitId.localeCompare(b.unitId),
  },
  {
    title: "Apartment",
    dataIndex: "apartment",
    key: "apartment",
    sorter: (a: Payment, b: Payment) => a.apartment.localeCompare(b.apartment),
  },
  {
    title: "Date/Time",
    dataIndex: "dateTime",
    key: "dateTime",
    render: (text: string) =>
      dayjs(text, "DD/MM/YYYY HH:mm").format("DD MMM YYYY HH:mm"),
  },
  {
    title: "Total Paid",
    dataIndex: "TotalPaid",
    key: "TotalPaid",
    sorter: (a: Payment, b: Payment) =>
      Number(a.TotalPaid) - Number(b.TotalPaid),
    render: (text: string) => formatCurrency(text),
  },
  {
    title: "Amount Due",
    dataIndex: "AmountDue",
    key: "AmountDue",
    sorter: (a: Payment, b: Payment) =>
      Number(a.AmountDue) - Number(b.AmountDue),
    render: (text: string) => {
      const amount = Number(text);
      const color =
        amount === 0
          ? "not-owed"
          : amount <= 1000
          ? "low-owed"
          : amount <= 5000
          ? "mid-owed"
          : "owed";

      return (
        <Tag className={`arrears-tag ${color}`}>{formatCurrency(text)}</Tag>
      );
    },
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
        value={record.Assigned}
        style={{ width: 150 }}
        onChange={(val) => handleAssignChange(record.key, val)}
      >
        <Option value="John Doe">John Doe</Option>
        <Option value="Jane Smith">Jane Smith</Option>
        <Option value="Mark Wilson">Mark Wilson</Option>
      </Select>
    ),
  },
  {
    title: "Last Reminder",
    dataIndex: "lastReminderSent",
    key: "lastReminderSent",
    render: (text: string) => text || "--",
  },
  {
    title: "Send Reminder",
    key: "Reminder",
    render: (_: string, record: Payment) => (
      <Button
        onClick={() => handleSendReminder(record)}
        type="primary"
        size="small"
      >
        Send Reminder
      </Button>
    ),
  },
  {
    title: "Notes",
    dataIndex: "Notes",
    key: "Notes",
    render: (_: string, record: Payment) => (
      <Button type="link" onClick={() => showNotesModal(record)}>
        View/Edit
      </Button>
    ),
  },
];


  return (
    <div className="payments-page">
      <h2>ARREARS FOLLOW-UP</h2>
      <div className="filters-inline">
        <Input
          placeholder="Search unit/apartment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <DatePicker
          format="DD/MM/YYYY"
          placeholder="Filter by date"
          onChange={(date) => setDateFilter(date)}
        />
        <Select
          placeholder="Bulk assign"
          value={bulkAssignee}
          onChange={(val) => setBulkAssignee(val)}
          style={{ minWidth: 160 }}
        >
          <Option value="John Doe">John Doe</Option>
          <Option value="Jane Smith">Jane Smith</Option>
          <Option value="Mark Wilson">Mark Wilson</Option>
        </Select>
        <Button
          onClick={handleBulkAssign}
          disabled={!bulkAssignee || selectedRowKeys.length === 0}
          type="primary"
        >
          Assign Selected
        </Button>
      </div>

      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: (keys) => setSelectedRowKeys(keys),
        }}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 8 }}
        className="payments-table"
        rowKey="key"
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
