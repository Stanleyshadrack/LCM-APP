import React, { useState } from "react";
import { Table, Tag, Input, Button } from "antd";
import "./payments.css";

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

  const payments: Payment[] = [
    {
      key: "1",
      unitId: "A01",
      apartment: "Bima Heights",
      paidAmount: "kes 8,000",
      phoneNumber: "254742792965",
      refCode: "TDI08N80BK",
      dateTime: "02/04/2024",
      arrears: "Not owed",
    },
    {
      key: "2",
      unitId: "A02",
      apartment: "LCM Apartments",
      paidAmount: "kes 8,000",
      phoneNumber: "254742792965",
      refCode: "TDI08N80BK",
      dateTime: "02/04/2024",
      arrears: "Not owed",
    },
    {
      key: "3",
      unitId: "A03",
      apartment: "H&R Apartments",
      paidAmount: "kes 8,000",
      phoneNumber: "254742792965",
      refCode: "TDI08N80BK",
      dateTime: "02/04/2024",
      arrears: "Owed",
    },
    // Add more payments as needed...
  ];

  const columns = [
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
    },
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
          <Input
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <Button type="primary" className="add-tenant-button">
            + Add Tenant
          </Button>
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredPayments}
        pagination={{ pageSize: 8 }}
        className="payments-table"
      />
    </div>
  );
};

export default Payments;
