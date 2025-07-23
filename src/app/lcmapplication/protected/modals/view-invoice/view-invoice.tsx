"use client";

import React from "react";
import "./view-invoice.css";
import Invoice from "@/app/lcmapplication/types/invoice";
import SendButton from "../../widgets/button/SendButton";
import InvoiceMeta from "@/components/invoice/invoiceMeta";
import InvoiceNote from "@/components/invoice/InvoiceNote";
import InvoiceTable from "@/components/invoice/invoiceTable";
import PaymentInfo from "@/components/invoice/paymentInfo";
import dayjs from "dayjs";

interface InvoicePageProps {
  invoice: Invoice;
}

const InvoicePage: React.FC<InvoicePageProps> = ({ invoice }) => {
  if (!invoice) return null;

  const rentAmount = parseInt(invoice.rentAmount);
  const waterBillAmount = parseInt(invoice.waterBill || "0");
  const totalPaid = parseInt(invoice.totalPaid || "0");
  const subtotal = rentAmount + waterBillAmount;
  const totalDue = parseInt(invoice.balanceDue || "0") + subtotal;

  const isOverdue = invoice.dueDate
    ? dayjs(invoice.dueDate).isBefore(dayjs(), "day")
    : false;

  return (
    <div className="invoice-container">
      <header className="invoice-header">
        <div className="receiver-details">
          <h1 className="invoice-title">INVOICE</h1>
          <div className="recipient-info">
            <p><strong>Billed to:</strong> {invoice.phoneNumber}</p>
            <p>Unit {invoice.unitId}, {invoice.apartment}</p>
            <p>Nairobi, Kenya - 00000</p>
          </div>
        </div>

        <div className="company-details">
          <img src="/lcmlogo.svg" alt="Company Logo" className="company-logo" />
          <div>
            <p className="company-name">Panda, Inc</p>
            <p>Utawala Mihang'o</p>
            <p>Nairobi, Kenya, IN - 000 000</p>
            <p className="tax-id">TAX ID 00XXXXX1234XXX</p>
          </div>
        </div>
      </header>

      <main className="invoice-body">
        <InvoiceMeta invoice={invoice} />
        {invoice.status && (
  <p className={`status-label ${invoice.status.toLowerCase()}`}>
    Status: {invoice.status}
  </p>
)}

        <InvoiceTable
          invoice={invoice}
          subtotal={subtotal}
          totalDue={totalDue}
          totalPaid={totalPaid}
        />
        

        {invoice.dueDate && (
          <p
            className={`due-warning ${isOverdue ? "overdue" : "pending"}`}
          >
            📜 Please ensure payment is made by{" "}
            <strong>{dayjs(invoice.dueDate).format("Do [of] MMM YYYY")}</strong> to avoid penalties.
          </p>
        )}

        <PaymentInfo unitId={invoice.unitId} />
        <div className="send-button">
          <SendButton />
        </div>
      </main>
    </div>
  );
};

export default InvoicePage;
