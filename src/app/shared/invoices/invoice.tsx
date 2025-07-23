"use client";

import React, { useState, useMemo } from "react";
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
import type { SortOrder } from "antd/es/table/interface";
import dayjs, { Dayjs } from "dayjs";
import "./invoice.css";
import InvoicePage from "@/app/lcmapplication/protected/modals/view-invoice/view-invoice";
import Invoice from "@/app/lcmapplication/types/invoice";

const Invoices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [globalDueDate, setGlobalDueDate] = useState<string | null>(null);
  const [viewLastMonth, setViewLastMonth] = useState(false);
  const [monthFilter, setMonthFilter] = useState<Dayjs | null>(null);
  const [showSummary, setShowSummary] = useState(true);
  const [showOnlyOverpaid, setShowOnlyOverpaid] = useState(false);

  const parseKES = (val: string): number =>
    parseInt(val.replace(/[^\d]/g, ""), 10) || 0;

  const formatKES = (amount: number): string =>
    `KES ${amount.toLocaleString()}`;

  const invoices: Invoice[] = [
    {
      key: "1",
      unitId: "A01",
      apartment: "Bima Heights",
      rentAmount: "KES 8,000",
      waterBill: "KES 500",
      amountPaid: "KES 11,000", // overpaid 500
      amountPaidLastMonth: "KES 3,000",
      arrears: "KES 2,000",
      balanceDue: "KES 0",
      phoneNumber: "254742792965",
      date: "2025-07-02",
      dueDate: globalDueDate || "2025-07-10",
      status: "CLEARED",
      currentReading: "",
      previousReading: ""
    },
    {
      key: "2",
      unitId: "A02",
      apartment: "LCM Apartments",
      rentAmount: "KES 8,000",
      waterBill: "KES 200",
      amountPaid: "KES 10,000",
      amountPaidLastMonth: "KES 8,200",
      arrears: "KES 0",
      balanceDue: "KES 0",
      phoneNumber: "254742792965",
      date: "2025-06-02",
      dueDate: globalDueDate || "2025-06-10",
      status: "PENDING",
      currentReading: "",
      previousReading: ""
    },
  ];

  const getTotalPayable = (invoice: Invoice) =>
    parseKES(invoice.rentAmount) +
    parseKES(invoice.waterBill) +
    parseKES(invoice.arrears);

  const getBalanceDue = (invoice: Invoice) =>
    getTotalPayable(invoice) - parseKES(invoice.amountPaid);

  const getOverpaidAmount = (invoice: Invoice) => {
    const extra = parseKES(invoice.amountPaid) - getTotalPayable(invoice);
    return extra > 0 ? extra : 0;
  };

  const getComputedStatus = (invoice: Invoice): Invoice["status"] => {
    const balance = getBalanceDue(invoice);
    const due = new Date(invoice.dueDate);
    return balance > 0 && due < new Date() ? "OVERDUE" : invoice.status;
  };

const openModal = (invoice: Invoice) => {
  const computedStatus = getComputedStatus(invoice);
  const totalPayable = getTotalPayable(invoice);
  const balanceDue = Math.max(0, getBalanceDue(invoice));
  const totalPaid = parseKES(invoice.amountPaid);
  const overpaid = getOverpaidAmount(invoice);

  setSelectedInvoice({
    ...invoice,
    totalPayable: totalPayable.toString(),
    balanceDue: balanceDue.toString(),
    totalPaid: totalPaid.toString(),
    overpaid: overpaid.toString(),
    status: computedStatus,
  });
  setIsModalVisible(true);
};



  const handleDueDateChange = (date: Dayjs | null, record: Invoice) => {
    if (record.key && date) {
      record.dueDate = date.format("YYYY-MM-DD");
    }
  };

  const paidLastMonthLabel = (() => {
    if (invoices.length === 0) return "Paid Last Month";
    const d = new Date(invoices[0].date);
    d.setMonth(d.getMonth() - 1);
    return `Paid in ${d.toLocaleString("en-US", { month: "short" }).toUpperCase()}`;
  })();

  const filteredInvoices = useMemo(() => {
    return invoices.filter((i) => {
      const matchesSearch =
        i.apartment.toLowerCase().includes(searchTerm.toLowerCase()) ||
        i.unitId.toLowerCase().includes(searchTerm.toLowerCase());

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
      title: paidLastMonthLabel,
      dataIndex: "amountPaidLastMonth",
      key: "amountPaidLastMonth",
      render: (value: string) => {
        const amount = parseKES(value);
        const color = amount > 0 ? "green" : "red";
        return <Tag color={color}>{value}</Tag>;
      },
    },
    {
      title: "Balance Due",
      key: "balanceDue",
      render: (_: any, record: Invoice) => {
        const balance = getBalanceDue(record);
        return (
          <Tag color={balance <= 0 ? "green" : "red"}>
            {formatKES(balance > 0 ? balance : 0)}
          </Tag>
        );
      },
    },
    {
      title: "Due Date",
      key: "dueDate",
      render: (_: any, record: Invoice) => (
        <DatePicker
          defaultValue={dayjs(record.dueDate)}
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
        const color =
          status === "OVERDUE" ? "red" : status === "PENDING" ? "orange" : "green";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Invoice) => (
        <Button type="link" onClick={() => openModal(record)}>
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search apartment or unit..."
            style={{ width: 200 }}
          />
          <DatePicker
            onChange={(date) =>
              setGlobalDueDate(date?.format("YYYY-MM-DD") || null)
            }
            placeholder="Set Global Due Date"
          />
          <DatePicker
            picker="month"
            value={monthFilter}
            onChange={(val) => setMonthFilter(val)}
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
        rowClassName={(record: Invoice) =>
          getComputedStatus(record) === "OVERDUE" ? "overdue-row" : ""
        }
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
