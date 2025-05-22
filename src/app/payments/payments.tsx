import React, { useState } from "react";
import { Table, Tag, Modal } from "antd";
import "./payments.css";
import AddTenantButton from "../lcmapplication/protected/widgets/addButton/AddTenantButton";
import SearchInput from "../lcmapplication/protected/widgets/search/SearchInput";
import AddPaymentForm from "../lcmapplication/forms/add-payment/addPayments";


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

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const payments: Payment[] = [
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

  const columns = [
    { title: "Unit Id", dataIndex: "unitId", key: "unitId" },
    { title: "Apartment", dataIndex: "apartment", key: "apartment" },
    { title: "Paid Amount", dataIndex: "paidAmount", key: "paidAmount" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Ref Code", dataIndex: "refCode", key: "refCode" },
    { title: "Date/Time", dataIndex: "dateTime", key: "dateTime" },
    {
      title: "Arrears",
      dataIndex: "arrears",
      key: "arrears",
      render: (arrears: "Owed" | "Not owed") => (
        <Tag className={`arrears-tag ${arrears === "Owed" ? "owed" : "not-owed"}`}>
          {arrears}
        </Tag>
      ),
    },
  ];

  const filteredPayments = payments.filter((payment) =>
    payment.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.unitId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="payments-page">
      <div className="page-header">
        <h2>PAYMENTS HISTORY</h2>
        <div className="page-actions">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search apartment or unit..."
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
      />

      {/* AntD Modal with form inside */}
<Modal
  title={null}
  open={isModalOpen}
  onCancel={() => setIsModalOpen(false)}
  footer={null}
  destroyOnClose
  centered
  style={{
    padding: 0,
    maxWidth: "100%",
    height:"fit-comtent",
    width: "auto",
  }}
 
  wrapClassName="custom-modal-wrapper"
>
  <AddPaymentForm />
</Modal>


    </div>
  );
};

export default Payments;
