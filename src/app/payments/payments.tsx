import React, { useState, useMemo, useCallback } from "react";
import { Table, Tag, Modal, message, Typography } from "antd";
import { v4 as uuidv4 } from "uuid";
import "./payments.css";
import AddTenantButton from "../lcmapplication/protected/widgets/addButton/AddTenantButton";
import SearchInput from "../lcmapplication/protected/widgets/search/SearchInput";
import AddPaymentForm from "../lcmapplication/forms/add-payment/addPayments";

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
}

const initialPayments: Payment[] = [
  {
    key: "1",
    unitId: "A01",
    apartment: "Bima Heights",
    paidAmount: "KES 8,000",
    phoneNumber: "254742792965",
    refCode: "TDI08N80BK",
    dateTime: "02/04/2024",
    arrears: "Not owed",
  },
  {
    key: "2",
    unitId: "A02",
    apartment: "LCM Apartments",
    paidAmount: "KES 8,000",
    phoneNumber: "254742792965",
    refCode: "TDI08N80BK",
    dateTime: "02/04/2024",
    arrears: "Not owed",
  },
  {
    key: "3",
    unitId: "A03",
    apartment: "H&R Apartments",
    paidAmount: "KES 8,000",
    phoneNumber: "254742792965",
    refCode: "TDI08N80BK",
    dateTime: "02/04/2024",
    arrears: "Owed",
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

  const filteredPayments = useMemo(
    () => paymentList.filter((payment) => matchesSearch(payment, searchTerm)),
    [searchTerm, paymentList]
  );

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
      title: "Paid Amount",
      dataIndex: "paidAmount",
      key: "paidAmount",
      sorter: (a: Payment, b: Payment) => a.paidAmount.localeCompare(b.paidAmount),
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
      title: "Date/Time",
      dataIndex: "dateTime",
      key: "dateTime",
      sorter: (a: Payment, b: Payment) =>
        new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime(),
    },
    {
      title: "Arrears",
      dataIndex: "arrears",
      key: "arrears",
      render: (arrears: "Owed" | "Not owed") => (
        <Tag color={arrears === "Owed" ? "red" : "green"}>{arrears}</Tag>
      ),
    },
  ];

  return (
    <div className="payments-page">
      <div className="page-header">
        <Title level={3}>Payments History</Title>
        <div className="page-actions">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search apartment, unit, phone or ref..."
          />
          <AddTenantButton
            onClick={() => setIsModalOpen(true)}
            label="+ Add Payment"
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredPayments}
        pagination={{ pageSize: 8 }}
        className="payments-table"
        rowKey="key"
        locale={{
          emptyText: (
            <div style={{ textAlign: "center" }}>
              <img
                src="/empty.svg"
                alt="No data"
                style={{ width: 100, marginBottom: 8 }}
              />
              <p>No payments found</p>
            </div>
          ),
        }}
      />

      <Modal
        title={null}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        destroyOnClose
        centered
        closable={false}
        width="auto"
        wrapClassName="custom-modal-wrapper"
        bodyStyle={{
          padding: 0,
          background: "transparent",
        }}
      >
        <AddPaymentForm onSuccess={handleAddPayment} />
      </Modal>
    </div>
  );
};

export default Payments;
