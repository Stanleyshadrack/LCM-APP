"use client";

import React from "react";
import "./view-invoice.css";
import Invoice from "@/app/lcmapplication/types/invoice";
import SendButton from "../../widgets/button/SendButton";
import InvoiceMeta from "@/components/invoice/invoiceMeta";
import InvoiceTable from "@/components/invoice/invoiceTable";
import PaymentInfo from "@/components/invoice/paymentInfo";
import dayjs from "dayjs";
import { parseKES } from "@/components/currency/currency";
import { useStore } from "@/app/lcmapplication/store/useStore";

interface InvoicePageProps {
  invoice: Invoice;
}

const InvoicePage: React.FC<InvoicePageProps> = ({ invoice }) => {
  if (!invoice) return null;

  // ✅ get water meter data from zustand
  const waterMeters = useStore((s) => s.waterMeters);

  // ✅ find the meter entry for this exact unit in the same apartment
  const meter = waterMeters.find(
    (m) => m.unitId === invoice.unitId && m.apartment === invoice.apartment
  );

  // 🟢 Safe numeric conversions
  const rentAmount = parseKES(invoice.rentAmount);
  const waterBillAmount = parseKES(invoice.waterBill);
  const arrears = parseKES(invoice.arrears);
  const totalPaid = parseKES(invoice.amountPaid);
  const subtotal = rentAmount + waterBillAmount;
  const totalDue = subtotal + arrears;

  // 🟢 Dates & references
  const invoiceNo = invoice.invoiceNo || invoice.key || "-";
  const reference =
    invoice.reference || `INV-${String(invoice.key || "0").padStart(3, "0")}`;
  const invoiceDate = invoice.invoiceDate || invoice.date;

  const isOverdue = invoice.dueDate
    ? dayjs(invoice.dueDate).isBefore(dayjs(), "day")
    : false;

  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <div className="receiver-details">
          <h1 className="invoice-title">INVOICE</h1>
          <div className="recipient-info">
            <p>
              <strong>Billed to:</strong> {invoice.phoneNumber}
            </p>
            <p>
              Unit {invoice.unitId}, {invoice.apartment}
            </p>
            <p>Nairobi, Kenya - 00000</p>
          </div>
        </div>

        <div className="company-details">
          <img
            src="/lcmlogo.svg"
            alt="Company Logo"
            className="company-logo"
          />
          <div>
            <p className="company-name">Panda, Inc</p>
            <p>Utawala Mihang'o</p>
            <p>Nairobi, Kenya, IN - 000 000</p>
            <p className="tax-id">TAX ID 00XXXXX1234XXX</p>
          </div>
        </div>
      </header>

      <main className="invoice-body">
        {/* Meta info */}
        <InvoiceMeta
          invoice={{
            ...invoice,
            invoiceNo,
            invoiceDate,
            reference,
            currentReading: meter?.CurrentReading || "-",
            previousReading: meter?.PreviousReading || "-",
            waterConsumption: meter?.Consumption || "-",
          }}
        />

        {invoice.status && (
          <p className={`status-label ${invoice.status.toLowerCase()}`}>
            Status: {invoice.status}
          </p>
        )}

        {/* Table (rent + water + arrears etc) */}
        <InvoiceTable
  invoice={{
    ...invoice,
    waterReadingCurrent: meter?.CurrentReading || "-",
    waterReadingPrevious: meter?.PreviousReading || "-",
    waterConsumption: meter?.Consumption || "-",
    invoiceDate: dayjs().format("DD MMM YYYY [at] HH:mm"), // ✅ force generation date
  }}
/>


        {/* Payment warning */}
        {invoice.dueDate && (
          <p className={`due-warning ${isOverdue ? "overdue" : "pending"}`}>
            📜 Please ensure payment is made by{" "}
            <strong>{dayjs(invoice.dueDate).format("Do [of] MMM YYYY")}</strong>{" "}
            to avoid penalties.
          </p>
        )}

        {/* Payment Info */}
        <PaymentInfo unitId={invoice.unitId} />

        <div className="send-button">
          <SendButton />
        </div>
      </main>
    </div>
  );
};

export default InvoicePage;
