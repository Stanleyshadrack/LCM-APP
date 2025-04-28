import React, { useState } from "react";
import { Table, Tag, Input, Button, Modal } from "antd";
import "./invoice.css";
import InvoicePage from "../lcmapplication/protected/modals/view-invoice/view-invoice";

interface Invoice {
  key: string;
  unitId: string;
  apartment: string;
  rentAmount: string;
  phoneNumber: string;
  balanceDue: string;
  date: string;
  status: "SENT" | "PENDING";
}

const Invoices = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoices: Invoice[] = [
    {
      key: "1",
      unitId: "A01",
      apartment: "Bima Heights",
      rentAmount: "kes 8,000",
      phoneNumber: "254742792965",
      balanceDue: "kes 2,000.00",
      date: "02/04/2024",
      status: "SENT",
    },
    {
      key: "2",
      unitId: "A02",
      apartment: "LCM Apartments",
      rentAmount: "kes 8,000",
      phoneNumber: "254742792965",
      balanceDue: "kes 2,000.00",
      date: "02/04/2024",
      status: "PENDING",
    },
    {
      key: "3",
      unitId: "A03",
      apartment: "H&R Apartments",
      rentAmount: "kes 8,000",
      phoneNumber: "254742792965",
      balanceDue: "kes 2,000.00",
      date: "02/04/2024",
      status: "PENDING",
    },
    {
      key: "4",
      unitId: "A03",
      apartment: "H&R Apartments",
      rentAmount: "kes 8,000",
      phoneNumber: "254742792965",
      balanceDue: "kes 2,000.00",
      date: "02/04/2024",
      status: "SENT",
    },
    {
      key: "5",
      unitId: "A03",
      apartment: "H&R Apartments",
      rentAmount: "kes 8,000",
      phoneNumber: "254742792965",
      balanceDue: "kes 2,000.00",
      date: "02/04/2024",
      status: "PENDING",
    },
    {
      key: "6",
      unitId: "A03",
      apartment: "H&R Apartments",
      rentAmount: "kes 8,000",
      phoneNumber: "254742792965",
      balanceDue: "kes 2,000.00",
      date: "02/04/2024",
      status: "SENT",
    },
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
      title: "Rent Amount",
      dataIndex: "rentAmount",
      key: "rentAmount",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Balance Due",
      dataIndex: "balanceDue",
      key: "balanceDue",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: "SENT" | "PENDING") => (
        <Tag className={`status-tag ${status.toLowerCase()}`}>
          {status}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Invoice) => (
        <Button
          type="link"
          className="view-invoice-button"
          onClick={() => openModal(record)}
        >
          View Invoice
        </Button>
      ),
    },
  ];

  const openModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedInvoice(null);
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.unitId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="invoices-page">
      <div className="page-header">
        <h2>INVOICES</h2>
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
        dataSource={filteredInvoices}
        pagination={{ pageSize: 8 }}
        className="invoices-table"
      />

      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="fit-content"
        centered
        destroyOnClose
      >
        <InvoicePage invoice={selectedInvoice} />
      </Modal>
    </div>
  );
};

export default Invoices;
