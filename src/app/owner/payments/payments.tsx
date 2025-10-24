"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import { CSVLink } from "react-csv";
import { useStore } from "@/app/lcmapplication/store/useStore";
import AddPaymentForm from "@/app/lcmapplication/forms/add-payment/addPayments";
import AddTenantButton from "@/app/lcmapplication/protected/widgets/addButton/AddTenantButton";
import SearchInput from "@/app/lcmapplication/protected/widgets/search/SearchInput";
import "./payments.css";

const { Title } = Typography;

const Payments: React.FC = () => {
  const { payments, deletePayment, fetchPayments } = useStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  // Fetch payments on mount
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  // Filter payments based on search term
  const filteredPayments = useMemo(
    () =>
      payments.filter((payment) => {
        const lower = searchTerm.toLowerCase();
        return (
          payment.apartment.toLowerCase().includes(lower) ||
          payment.unitId.toLowerCase().includes(lower) ||
          payment.phoneNumber.toLowerCase().includes(lower) ||
          payment.refCode.toLowerCase().includes(lower)
        );
      }),
    [payments, searchTerm]
  );

  const selectedPayments = filteredPayments.filter((p) =>
    selectedRowKeys.includes(p.key)
  );

  // Columns for Ant Design Table
  const columns = [
    {
      title: "Date/Time",
      dataIndex: "dateTime",
      key: "dateTime",
      sorter: (a: typeof payments[0], b: typeof payments[0]) =>
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
    },
    { title: "Unit Id", dataIndex: "unitId", key: "unitId" },
    { title: "Apartment", dataIndex: "apartment", key: "apartment" },
    {
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      sorter: (a: typeof payments[0], b: typeof payments[0]) =>
        parseFloat(a.paidAmount.replace(/[^\d.-]/g, "")) -
        parseFloat(b.paidAmount.replace(/[^\d.-]/g, "")),
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      key: "paymentMode",
      render: (mode: string) => <Tag color="blue">{mode}</Tag>,
    },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Ref Code", dataIndex: "refCode", key: "refCode" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: typeof payments[0]) => (
        <div className="action-buttons">
          <Button
            icon={<EditOutlined />}
            type="link"
            onClick={() => message.info("Edit coming soon")}
          />
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => deletePayment(record.key)}
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
            data={selectedPayments.length > 0 ? selectedPayments : filteredPayments}
            filename="payments.csv"
            className="csv-export-btn"
          >
            <DownloadOutlined />
            Export CSV
          </CSVLink>
        </div>
      </div>

      <Table
        rowSelection={{
          selectedRowKeys,
          onChange: setSelectedRowKeys,
        }}
        columns={columns}
        dataSource={filteredPayments}
        pagination={{ pageSize: 8 }}
        className="payments-table"
        rowKey="key"
      />

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        centered
        width="auto"
        wrapClassName="custom-modal-wrapper"
        bodyStyle={{ padding: 0, background: "transparent" }}
      >
        <AddPaymentForm closeModal={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default Payments;
