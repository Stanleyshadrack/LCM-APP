"use client";

import React from "react";
import "./view-invoice.css";
import Invoice from "@/app/lcmapplication/types/invoice";
import InvoiceMeta from "@/components/invoice/invoiceMeta";
import InvoiceNote from "@/components/invoice/InvoiceNote";
import InvoiceTable from "@/components/invoice/invoiceTable";
import PaymentInfo from "@/components/invoice/paymentInfo";
import SendButton from "../../widgets/button/SendButton";

interface InvoicePageProps {
  invoice: Invoice | null;
}

const InvoicePage: React.FC<InvoicePageProps> = ({ invoice }) => {
  if (!invoice) return null;

  const rentAmount = parseInt(invoice.rentAmount);
  const waterBillAmount = parseInt(invoice.waterBill || "0");
  const balanceDue = parseInt(invoice.balanceDue || "0");
  const totalPaid = parseInt(invoice.totalPayable || "0");
  const subtotal = rentAmount + waterBillAmount;
  const totalDue = balanceDue + subtotal;

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
          <InvoiceTable invoice={invoice} subtotal={subtotal} totalDue={totalDue} totalPaid={totalPaid} />
          <InvoiceNote />
          <PaymentInfo unitId={invoice.unitId} />
          <div className="send-button">
            <SendButton />
          </div>
        </main>
    </div>
  );
};

export default InvoicePage;
