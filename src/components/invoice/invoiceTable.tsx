import React from "react";
import dayjs from "dayjs";
import Invoice from "@/app/lcmapplication/types/invoice";
import { parseKES } from "@/components/currency/currency";

interface Props {
  invoice: Invoice;
}

const InvoiceTable: React.FC<Props> = ({ invoice }) => {
  // 🟢 Safe parsing (numbers only for money values)
  const rentAmount = parseKES(invoice.rentAmount) || 0;
  const waterBillAmount = parseKES(invoice.waterBill) || 0;
  const balanceDue = parseKES(invoice.balanceDue) || 0;
  const totalPaid = parseKES(invoice.totalPaid) || 0;
  const arrears = parseKES(invoice.arrears) || 0;

  // 🟢 Calculate totals
  const subtotal = rentAmount + waterBillAmount;
  const totalDue = subtotal + arrears;

  // 🟢 Safe meter values
  const currentReading = invoice.currentReading ?? "-";
  const previousReading = invoice.previousReading ?? "-";
  const consumption = invoice.waterConsumption ?? "-";

  // 🟢 Dates
  const rawInvoiceDate = invoice.invoiceDate || invoice.date;
  const dateObj = dayjs(rawInvoiceDate).isValid() ? dayjs(rawInvoiceDate) : dayjs();

  const rentBillingMonth = dateObj.format("MMM YYYY");
  const waterBillingMonth = dateObj.subtract(1, "month").format("MMM YYYY");
  const paidMonth = dateObj.subtract(1, "month").format("MMM YYYY");
  const dueDate = invoice.dueDate && dayjs(invoice.dueDate).isValid()
    ? dayjs(invoice.dueDate).format("DD MMM YYYY")
    : null;

  // 🟢 Helper for money formatting
  const formatKES = (val?: number) => `KES ${(val || 0).toLocaleString()}`;

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
          <tr>
            <td>Water Billing Month</td>
            <td>{waterBillingMonth}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Rent Billing Month</td>
            <td>{rentBillingMonth}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Current Meter Reading</td>
            <td>{currentReading}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Previous Meter Reading</td>
            <td>{previousReading}</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Total Water Consumption</td>
            <td>{consumption} unit(s)</td>
            <td>-</td>
          </tr>
          <tr>
            <td>Water Bill Amount</td>
            <td>-</td>
            <td>{formatKES(waterBillAmount)}</td>
          </tr>
          <tr>
            <td>Monthly Rent</td>
            <td>-</td>
            <td>{formatKES(rentAmount)}</td>
          </tr>
          <tr>
            <td><strong>Bill for {rentBillingMonth} (Rent + Water)</strong></td>
            <td>-</td>
            <td><strong>{formatKES(subtotal)}</strong></td>
          </tr>
          <tr>
            <td>Total Amount Paid In {paidMonth}</td>
            <td>-</td>
            <td>{formatKES(totalPaid)}</td>
          </tr>
          <tr>
            <td>Outstanding Arrears</td>
            <td>-</td>
            <td>{formatKES(balanceDue)}</td>
          </tr>
          <tr>
            <td><strong>Total Payable Amount In {rentBillingMonth}</strong></td>
            <td>-</td>
            <td><strong>{formatKES(totalDue)}</strong></td>
          </tr>

          {dueDate && (
            <tr>
              <td colSpan={2}><strong>Due Date</strong></td>
              <td><strong>{dueDate}</strong></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTable;
