"use client";

import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  Tag,
  Modal,
  message,
  Typography,
  Button,
  Popconfirm,
} from "antd";
import { DownloadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import "./payments.css";
import AddPaymentForm from "@/app/lcmapplication/forms/add-payment/addPayments";
import AddTenantButton from "@/app/lcmapplication/protected/widgets/addButton/AddTenantButton";
import SearchInput from "@/app/lcmapplication/protected/widgets/search/SearchInput";
import '@/styles/globals.css';

import { CSVLink } from "react-csv";

const { Title } = Typography;

interface Payment {
  key: string;
  unitId: string;
  apartment: string;
  paidAmount: string;
  phoneNumber: string;
  refCode: string;
  dateTime: string;
  arrears: "Owed" | "Not owed";
  paymentMode: "M-Pesa" | "Bank" | "Cash";
}

const initialPayments: Payment[] = [
  {
    key: "1",
    unitId: "A01",
    apartment: "Bima Heights",
    paidAmount: "KES 8,000",
    phoneNumber: "254742792965",
    refCode: "MPESA123456",
    dateTime: "2024-04-02",
    arrears: "Not owed",
    paymentMode: "M-Pesa",
  },
  {
    key: "2",
    unitId: "A02",
    apartment: "LCM Apartments",
    paidAmount: "KES 8,000",
    phoneNumber: "254742792965",
    refCode: "BANK999988",
    dateTime: "2024-04-02",
    arrears: "Not owed",
    paymentMode: "Bank",
  },
];

const matchesSearch = (payment: Payment, term: string): boolean => {
  const lower = term.toLowerCase();
  return (
    payment.apartment.toLowerCase().includes(lower) ||
    payment.unitId.toLowerCase().includes(lower) ||
    payment.phoneNumber.toLowerCase().includes(lower) ||
    payment.refCode.toLowerCase().includes(lower)
  );
};

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentList, setPaymentList] = useState<Payment[]>(initialPayments);

  const handleAddPayment = useCallback((newPayment: Omit<Payment, "key">) => {
    const updatedPayment: Payment = { ...newPayment, key: uuidv4() };
    setPaymentList((prev) => [...prev, updatedPayment]);
    message.success("Payment added successfully");
    setIsModalOpen(false);
  }, []);

  const handleDelete = (key: string) => {
    setPaymentList((prev) => prev.filter((p) => p.key !== key));
    message.success("Payment deleted");
  };

  const filteredPayments = useMemo(
    () => paymentList.filter((payment) => matchesSearch(payment, searchTerm)),
    [searchTerm, paymentList]
  );

const columns = [
  {
    title: "Date/Time",
    dataIndex: "dateTime",
    key: "dateTime",
    sorter: (a: { dateTime: string | number | Date; }, b: { dateTime: string | number | Date; }) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
  },
  {
    title: "Unit Id",
    dataIndex: "unitId",
    key: "unitId",
  },
  {
    title: "Apartment",
    dataIndex: "apartment",
    key: "apartment",
  },
  {
    title: "Paid Amount",
    dataIndex: "paidAmount",
    key: "paidAmount",
    sorter: (a: { paidAmount: string; }, b: { paidAmount: string; }) =>
      parseFloat(a.paidAmount.replace(/[^\d.-]/g, '')) -
      parseFloat(b.paidAmount.replace(/[^\d.-]/g, '')),
  },
  {
    title: "Payment Mode",
    dataIndex: "paymentMode",
    key: "paymentMode",
    render: (mode: string) => <Tag color="blue">{mode}</Tag>,
  },
  {
    title: "Phone Number",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "Ref Code",
    dataIndex: "refCode",
    key: "refCode",
  },
  {
    title: "Arrears",
    dataIndex: "arrears",
    key: "arrears",
    render: (arrears: string) => (
      <Tag className={`arrears-tag ${arrears === "Owed" ? "owed" : "not-owed"}`}>
        {arrears}
      </Tag>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_: any, record: Payment) => (
      <div className="action-buttons">
        <Button
          icon={<EditOutlined />}
          type="link"
          onClick={() => message.info("Edit coming soon")}
        />
        <Popconfirm
          title="Are you sure to delete?"
          onConfirm={() => handleDelete(record.key)}
          okText="Yes"
          cancelText="No"
        >
          <Button icon={<DeleteOutlined />} type="link" danger />
        </Popconfirm>
      </div>
    ),
  },
];


  return (
    <div className="payments-page">
      <div className="page-header">
        <Title level={3}>Payments History</Title>
        <div className="filters-inline">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search apartment, unit, phone or ref..."
          />
          <AddTenantButton
            onClick={() => setIsModalOpen(true)}
            label="+ Add Payment"
          />
        <CSVLink
  data={filteredPayments}
  filename="payments.csv"
  className="csv-export-btn"
>
  <DownloadOutlined />
  Export CSV
</CSVLink>

        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredPayments}
        pagination={{ pageSize: 8 }}
        className="payments-table"
        rowKey="key"
      />

      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        centered
        width="auto"
        wrapClassName="custom-modal-wrapper"
        bodyStyle={{ padding: 0, background: "transparent" }}
      >
        <AddPaymentForm onSuccess={handleAddPayment} />
      </Modal>
    </div>
  );
};

export default Payments;
