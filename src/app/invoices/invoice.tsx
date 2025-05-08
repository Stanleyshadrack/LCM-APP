import React, { useState, useMemo } from "react";
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

const Invoices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const invoices: Invoice[] = [
    {
      key: "1",
      unitId: "A01",
      apartment: "Bima Heights",
      rentAmount: "KES 8,000",
      phoneNumber: "254742792965",
      balanceDue: "KES 2,000.00",
      date: "02/04/2024",
      status: "SENT",
    },
    {
      key: "2",
      unitId: "A02",
      apartment: "LCM Apartments",
      rentAmount: "KES 8,000",
      phoneNumber: "254742792965",
      balanceDue: "KES 2,000.00",
      date: "02/04/2024",
      status: "PENDING",
    },
    {
      key: "3",
      unitId: "A02",
      apartment: "LCM Apartments",
      rentAmount: "KES 8,000",
      phoneNumber: "254742792965",
      balanceDue: "KES 2,000.00",
      date: "02/04/2024",
      status: "PENDING",
    },
    {
      key: "4",
      unitId: "A02",
      apartment: "LCM Apartments",
      rentAmount: "KES 8,000",
      phoneNumber: "254742792965",
      balanceDue: "KES 2,000.00",
      date: "02/04/2024",
      status: "PENDING",
    },
    {
      key: "5",
      unitId: "A02",
      apartment: "LCM Apartments",
      rentAmount: "KES 8,000",
      phoneNumber: "254742792965",
      balanceDue: "KES 2,000.00",
      date: "02/04/2024",
      status: "PENDING",
    },
    {
      key: "6",
      unitId: "A02",
      apartment: "LCM Apartments",
      rentAmount: "KES 8,000",
      phoneNumber: "254742792965",
      balanceDue: "KES 2,000.00",
      date: "02/04/2024",
      status: "PENDING",
    },
    // ... More data
  ];

  const openModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedInvoice(null);
  };

  const filteredInvoices = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return invoices.filter(
      (invoice) =>
        invoice.apartment.toLowerCase().includes(term) ||
        invoice.unitId.toLowerCase().includes(term)
    );
  }, [searchTerm, invoices]);

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
          Generate Invoice
        </Button>
      ),
    },
  ];

  return (
    <div className="invoices-page">
      <div className="page-header">
        <h2>INVOICES</h2>
        <div className="page-actions">
          <Input
            placeholder="Search by unit or apartment"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search invoices"
          />
          {/* <Button type="primary" className="add-tenant-button">
            + Add Tenant
          </Button> */}
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredInvoices}
        pagination={{ pageSize: 8 }}
        className="invoices-table"
        rowKey="key"
      />

      <Modal
        title={`Invoice Details`}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width="fit-content"
        centered
        destroyOnClose
      >
        {selectedInvoice && <InvoicePage invoice={selectedInvoice} />}
      </Modal>
    </div>
  );
};

export default Invoices;
