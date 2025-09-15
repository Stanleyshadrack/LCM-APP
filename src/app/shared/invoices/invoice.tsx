// app/lcmapplication/protected/pages/invoices.tsx
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  Tag,
  Button,
  Modal,
  Progress,
  DatePicker,
  Switch,
  Input,
  Badge,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useStore } from "@/app/lcmapplication/store/useStore";
import InvoicePage from "@/app/lcmapplication/protected/modals/view-invoice/view-invoice";
import Invoice from "@/app/lcmapplication/types/invoice";
import "./invoice.css";
import { parseKES, formatKES } from "@/components/currency/currency";

const Invoices: React.FC = () => {
  const invoices = useStore((state) => state.invoices);
  const updateInvoice = useStore((state) => state.updateInvoice);
  const fetchInvoices = useStore((state) => state.fetchInvoices);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInvoiceKey, setSelectedInvoiceKey] = useState<string | null>(null);
  const [viewLastMonth, setViewLastMonth] = useState(false);
  const [monthFilter, setMonthFilter] = useState<Dayjs | null>(null);
  const [showSummary, setShowSummary] = useState(true);
  const [showOnlyOverpaid, setShowOnlyOverpaid] = useState(false);

  useEffect(() => {
    fetchInvoices();
  }, [fetchInvoices]);

  const selectedInvoice = useMemo(
    () => invoices.find((inv) => inv.key === selectedInvoiceKey),
    [invoices, selectedInvoiceKey]
  );

  const getTotalPayable = (invoice: Invoice) =>
    parseKES(invoice.rentAmount) + parseKES(invoice.waterBill) + parseKES(invoice.arrears);

  const getBalanceDue = (invoice: Invoice) => getTotalPayable(invoice) - parseKES(invoice.amountPaid);

  const getOverpaidAmount = (invoice: Invoice) => {
    const extra = parseKES(invoice.amountPaid) - getTotalPayable(invoice);
    return extra > 0 ? extra : 0;
  };

  const getComputedStatus = (invoice: Invoice): Invoice["status"] => {
    const balance = getBalanceDue(invoice);
    const due = new Date(invoice.dueDate);
    return balance > 0 && due < new Date() ? "OVERDUE" : invoice.status;
  };

  const openModal = (invoiceKey: string) => {
    setSelectedInvoiceKey(invoiceKey);
    setIsModalVisible(true);
  };

  const handleDueDateChange = (date: Dayjs | null, record: Invoice) => {
    if (record.key && date) {
      updateInvoice(record.key, { dueDate: date.format("YYYY-MM-DD") });
    }
  };

  const filteredInvoices = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    return invoices.filter((i) => {
      const matchesSearch =
        i.apartment.toLowerCase().includes(normalizedSearch) ||
        i.unitId.toLowerCase().includes(normalizedSearch);

      const invoiceMonth = dayjs(i.date);
      const selectedMonth = viewLastMonth
        ? dayjs().subtract(1, "month")
        : monthFilter || dayjs();

      const matchesMonth =
        (!monthFilter && !viewLastMonth) ||
        (invoiceMonth.isSame(selectedMonth, "month") &&
          invoiceMonth.isSame(selectedMonth, "year"));

      const isOverpaid = getOverpaidAmount(i) > 0;
      const passesOverpaidFilter = showOnlyOverpaid ? isOverpaid : true;

      return matchesSearch && matchesMonth && passesOverpaidFilter;
    });
  }, [searchTerm, invoices, monthFilter, viewLastMonth, showOnlyOverpaid]);

  const totals = useMemo(() => {
    return filteredInvoices.reduce(
      (acc, inv) => {
        const totalPayable = getTotalPayable(inv);
        const amountPaid = parseKES(inv.amountPaid);
        const balance = totalPayable - amountPaid;
        const overpaid = getOverpaidAmount(inv);
        acc.totalPayable += totalPayable;
        acc.totalPaid += amountPaid;
        acc.totalBalance += balance < 0 ? 0 : balance;
        acc.totalOverpaid += overpaid;
        return acc;
      },
      { totalPayable: 0, totalPaid: 0, totalBalance: 0, totalOverpaid: 0 }
    );
  }, [filteredInvoices]);

  const columns = [
    { title: "Apartment", dataIndex: "apartment", key: "apartment" },
    { title: "Unit Id", dataIndex: "unitId", key: "unitId" },
    { title: "Rent", dataIndex: "rentAmount", key: "rentAmount" },
    { title: "Water Bill", dataIndex: "waterBill", key: "waterBill" },
    { title: "Arrears", dataIndex: "arrears", key: "arrears" },
    {
      title: "Total Payable",
      key: "totalPayable",
      render: (_: any, record: Invoice) => formatKES(getTotalPayable(record)),
    },
    {
      title: "Amount Paid",
      key: "amountPaid",
      render: (_: any, record: Invoice) => <span>{record.amountPaid}</span>,
    },
    {
      title: "Overpaid",
      key: "overpaid",
      render: (_: any, record: Invoice) => {
        const over = getOverpaidAmount(record);
        return over > 0 ? <Tag color="gold">{formatKES(over)}</Tag> : "--";
      },
    },
    {
      title: "Paid %",
      key: "paidPercent",
      render: (_: any, record: Invoice) => {
        const paid = parseKES(record.amountPaid);
        const total = getTotalPayable(record);
        const percent = Math.min(Math.round((paid / total) * 100), 100);
        return (
          <Progress
            percent={percent}
            size="small"
            status={percent >= 100 ? "success" : "active"}
          />
        );
      },
    },
    {
      title: "Balance Due",
      key: "balanceDue",
      render: (_: any, record: Invoice) => {
        const balance = getBalanceDue(record);
        return <Tag color={balance <= 0 ? "green" : "red"}>{formatKES(balance > 0 ? balance : 0)}</Tag>;
      },
    },
    {
      title: "Due Date",
      key: "dueDate",
      render: (_: any, record: Invoice) => (
        <DatePicker
          value={record.dueDate ? dayjs(record.dueDate) : undefined}
          format="DD MMM YYYY"
          onChange={(date) => handleDueDateChange(date, record)}
        />
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: Invoice) => {
        const status = getComputedStatus(record);
        const color = status === "OVERDUE" ? "red" : status === "PENDING" ? "orange" : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },

  {
  title: "Action",
  key: "action",
  render: (_: any, record: Invoice) => (
    <div style={{ display: "flex", gap: 8 }}>
      <Button type="link" onClick={() => openModal(record.key)}>
        View Invoice
      </Button>
      <Button
        type="primary"
        onClick={() => {
          // TODO: implement send action here
          console.log("Send invoice:", record.key);
        }}
        
      >
        Send
      </Button>
    </div>
  ),
}

  ];

  return (
    <div className="invoices-page">
      <div className="page-header">
        <h2>INVOICES</h2>
        <div className="page-actions">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search apartment or unit..."
            style={{ width: 200 }}
          />
          <DatePicker
            picker="month"
            value={monthFilter}
            onChange={setMonthFilter}
            placeholder="Filter Month"
          />
          <Switch
            checkedChildren="Last Month"
            unCheckedChildren="This Month"
            checked={viewLastMonth}
            onChange={() => setViewLastMonth(!viewLastMonth)}
          />
          <Switch
            checkedChildren="Hide Summary"
            unCheckedChildren="Show Summary"
            checked={showSummary}
            onChange={() => setShowSummary(!showSummary)}
          />
          <Switch
            checkedChildren="Overpaid Only"
            unCheckedChildren="All Tenants"
            checked={showOnlyOverpaid}
            onChange={() => setShowOnlyOverpaid(!showOnlyOverpaid)}
          />
        </div>
      </div>

      {showSummary && (
        <div className="monthly-summary">
          <Badge color="blue" text={`Total Payable: ${formatKES(totals.totalPayable)}`} />
          <Badge color="green" text={`Total Paid: ${formatKES(totals.totalPaid)}`} />
          <Badge color="red" text={`Balance Due: ${formatKES(totals.totalBalance)}`} />
          <Badge color="gold" text={`Overpaid: ${formatKES(totals.totalOverpaid)}`} />
        </div>
      )}

      <Table
        columns={columns}
        dataSource={filteredInvoices}
        pagination={{ pageSize: 8 }}
        rowKey="key"
        rowClassName={(record: Invoice) => (getComputedStatus(record) === "OVERDUE" ? "overdue-row" : "")}
        locale={{ emptyText: "No invoices found." }}
      />

      <Modal
        title={null}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        centered
        destroyOnClose
        width={900}
        bodyStyle={{ padding: 0, overflow: "visible" }}
        style={{ top: 20 }}
      >
        {selectedInvoice && <InvoicePage invoice={selectedInvoice} />}
      </Modal>
    </div>
  );
};

export default Invoices;
