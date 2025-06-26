import React from "react";
import Invoice from "@/app/lcmapplication/types/invoice";

interface Props {
  invoice: Invoice;
  subtotal: number;
  totalDue: number;
  totalPaid: number;
}

const InvoiceTable: React.FC<Props> = ({ invoice, subtotal, totalDue, totalPaid }) => {
  const rentAmount = parseInt(invoice.rentAmount);
  const waterBillAmount = parseInt(invoice.waterBill || "0");
  const balanceDue = parseInt(invoice.balanceDue || "0");

  return (
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
          <tr><td>Water Billing Month</td><td>FEB 2025</td><td>-</td></tr>
          <tr><td>Rent Billing Month</td><td>MAR 2025</td><td>-</td></tr>
          <tr><td>Current Meter Reading</td><td>{invoice.waterReadingCurrent ?? "30"}</td><td>-</td></tr>
          <tr><td>Previous Meter Reading</td><td>{invoice.waterReadingPrevious ?? "29"}</td><td>-</td></tr>
          <tr><td>Total Water Consumption</td><td>{invoice.waterConsumption ?? "14"} unit(s)</td><td>-</td></tr>
          <tr><td>Water Bill Amount</td><td>-</td><td>{waterBillAmount.toLocaleString()}</td></tr>
          <tr><td>Monthly Rent</td><td>-</td><td>{rentAmount.toLocaleString()}</td></tr>
          <tr><td><strong>Bill for MAR 2025 (Rent + Water)</strong></td><td>-</td><td><strong>{subtotal.toLocaleString()}</strong></td></tr>
          <tr><td>Total Amount Paid In FEB 2025</td><td>-</td><td>{totalPaid.toLocaleString()}</td></tr>
          <tr><td>Outstanding Arrears</td><td>-</td><td>{balanceDue.toLocaleString()}</td></tr>
          <tr><td><strong>Total Payable Amount In MAR 2025</strong></td><td>-</td><td><strong>{totalDue.toLocaleString()}</strong></td></tr>
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;

