"use client";

import React from "react";
import "./view-invoice.css";
import Invoice from "@/app/lcmapplication/types/invoice";

interface InvoicePageProps {
  invoice: Invoice | null;
}

const InvoicePage: React.FC<InvoicePageProps> = ({ invoice }) => {
  if (!invoice) return null;

  const rentAmount = parseInt(invoice.rentAmount);
  const waterBillAmount = parseInt(invoice.waterBill || "0");
  const balanceDue = parseInt(invoice.balanceDue || "0");
  const totalPaid = parseInt(invoice.totalPayable || "0"); // Assuming totalPaid is stored in `totalPayable`
  const subtotal = rentAmount + waterBillAmount;
  const totalDue = balanceDue + subtotal;

  return (
    <div className="invoice-page">
      <div className="invoice-container">
        {/* Header */}
        <div className="invoice-header">
          <div className="reciever-details">
            <h1>INVOICE</h1>
            <p><strong>Billed to:</strong> {invoice.phoneNumber}</p>
            <p>Unit {invoice.unitId}, {invoice.apartment}</p>
            <p>Nairobi, Kenya - 00000</p>
          </div>

          <div className="company-details">
            <img src="/lcmlogo.svg" alt="Company Logo" className="company-logo" />
            <p className="company-name">Panda, Inc</p>
            <p>Utawala Mihang'o</p>
            <p>Nairobi, Kenya, IN - 000 000</p>
            <p>TAX ID 00XXXXX1234XXX</p>
          </div>
        </div>

        {/* Invoice Meta */}
        <div className="invoice-body">
          <div className="invoice-meta">
            <div><strong>Invoice #</strong><p>{invoice.key}</p></div>
            <div><strong>Invoice date</strong><p>{invoice.date}</p></div>
            <div><strong>Reference</strong><p>INV-{invoice.key.padStart(3, "0")}</p></div>
            <div><strong>Due date</strong><p>7 MAR 2025</p></div>
          </div>

          {/* Detailed Billing Table */}
          <div className="invoice-table-wrapper">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Details</th>
                  <th>Amount (KES)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Water Billing Month</td>
                  <td>FEB 2025</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Rent Billing Month</td>
                  <td>MAR 2025</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Current Meter Reading</td>
                  <td>{invoice.waterReadingCurrent ?? "30"}</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Previous Meter Reading</td>
                  <td>{invoice.waterReadingPrevious ?? "29"}</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Total Water Consumption</td>
                  <td>{invoice.waterConsumption ?? "14"} unit(s)</td>
                  <td>-</td>
                </tr>
                <tr>
                  <td>Water Bill Amount</td>
                  <td>-</td>
                  <td>{waterBillAmount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Monthly Rent</td>
                  <td>-</td>
                  <td>{rentAmount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Bill for MAR 2025 (Rent + Water)</strong></td>
                  <td>-</td>
                  <td><strong>{subtotal.toLocaleString()}</strong></td>
                </tr>
                <tr>
                  <td>Total Amount Paid In FEB 2025</td>
                  <td>-</td>
                  <td>{totalPaid.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>Outstanding Arrears</td>
                  <td>-</td>
                  <td>{balanceDue.toLocaleString()}</td>
                </tr>
                <tr>
                  <td><strong>Total Payable Amount In MAR 2025</strong></td>
                  <td>-</td>
                  <td><strong>{totalDue.toLocaleString()}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Important Note */}
          <div className="invoice-note">
            📜
            Please ensure payment is made by the <strong>7th of MAR 2025</strong> to avoid penalties.
          </div>

          {/* Payment Information */}
          <div className="payment-info">
            <p>PAY BILL NUMBER: <span className="highlight">4069089</span></p>
            <p>ACCOUNT: <span className="highlight">{invoice.unitId}</span></p>
          </div>

          {/* Send Button */}
          <div className="send-button">
            <button>SEND</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="invoice-footer">
        <p>www.website.com | +91 00000 00000 | hello@email.com</p>
      </footer>
    </div>
  );
};

export default InvoicePage;
