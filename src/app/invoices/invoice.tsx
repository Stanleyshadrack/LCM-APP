"use client";

import React, { useState, useMemo } from "react";
import { Table, Tag, Button, Modal } from "antd";
import type { SortOrder } from "antd/es/table/interface";
import "./invoice.css";
import InvoicePage from "../lcmapplication/protected/modals/view-invoice/view-invoice";
import SearchInput from "../lcmapplication/protected/widgets/search/SearchInput";

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
      date: "2024-04-02",
      status: "SENT",
    },
    {
      key: "2",
      unitId: "A02",
      apartment: "LCM Apartments",
      rentAmount: "KES 8,000",
      phoneNumber: "254742792965",
      balanceDue: "KES 0.00",
      date: "2024-04-02",
      status: "PENDING",
    },
    // Add more invoices as needed
  ];

  const openModal = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedInvoice(null);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const parseKES = (val: string): number =>
    parseInt(val.replace(/[^\d]/g, ""), 10) || 0;

  const filteredInvoices = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return invoices.filter(
      (invoice) =>
        invoice.apartment.toLowerCase().includes(term) ||
        invoice.unitId.toLowerCase().includes(term)
    );
  }, [searchTerm, invoices]);

  const columns = [
    { title: "Unit Id", dataIndex: "unitId", key: "unitId" },
    { title: "Apartment", dataIndex: "apartment", key: "apartment" },
    { title: "Rent Amount", dataIndex: "rentAmount", key: "rentAmount" },
    { title: "Phone Number", dataIndex: "phoneNumber", key: "phoneNumber" },
    {
      title: "Balance Due",
      dataIndex: "balanceDue",
      key: "balanceDue",
      sorter: (a: Invoice, b: Invoice) =>
        parseKES(a.balanceDue) - parseKES(b.balanceDue),
      sortDirections: ["ascend", "descend"] as SortOrder[],
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a: Invoice, b: Invoice) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (date: string) =>
        new Date(date).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        }),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: "SENT" | "PENDING") => (
        <Tag className={`status-tag ${status.toLowerCase()}`}>{status}</Tag>
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
          aria-label={`Generate invoice for ${record.unitId}`}
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
          <SearchInput
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search apartment or units..."
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={filteredInvoices}
        pagination={{ pageSize: 8 }}
        className="invoices-table"
        rowKey="key"
        locale={{ emptyText: "No invoices found." }}
      />

<Modal
  title={null}
  open={isModalVisible}
  onCancel={handleCancel}
  footer={null}
  centered
  destroyOnClose
  width={900} // fixed width matching your .invoice-container max-width
  bodyStyle={{
    padding: 0, // removes default modal padding
    overflow: 'visible', // avoids inner scroll
  }}
  style={{ top: 20 }} // optional: move it a bit down
>
  {selectedInvoice && <InvoicePage invoice={selectedInvoice} />}
</Modal>

    </div>
  );
};

export default Invoices;
