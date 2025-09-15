import React from "react";
import dayjs from "dayjs";
import Invoice from "@/app/lcmapplication/types/invoice";

interface Props {
  invoice: Invoice;
}

const InvoiceMeta: React.FC<Props> = ({ invoice }) => {
  const invoiceNo = invoice.invoiceNo || invoice.key || "-";
  const reference =
    invoice.reference || `INV-${String(invoice.key || "0").padStart(3, "0")}`;

  // ✅ Ensure only valid dayjs input types are passed
  const invoiceDate = invoice.invoiceDate || invoice.date;
  const safeInvoiceDate = (typeof invoiceDate === "string" || typeof invoiceDate === "number")
    ? invoiceDate
    : undefined;

  const formattedInvoiceDate = safeInvoiceDate
    ? dayjs(safeInvoiceDate).format("DD MMM YYYY")
    : "-";

  const safeDueDate = (typeof invoice.dueDate === "string" || typeof invoice.dueDate === "number")
    ? invoice.dueDate
    : undefined;

  const formattedDueDate = safeDueDate
    ? dayjs(safeDueDate).format("DD MMM YYYY")
    : "-";

  return (
    <div className="invoice-meta">
      <div>
        <strong>Invoice #</strong>
        <p>{invoiceNo}</p>
      </div>
      <div>
        <strong>Invoice date</strong>
        <p>{formattedInvoiceDate}</p>
      </div>
      <div>
        <strong>Reference</strong>
        <p>{reference}</p>
      </div>
      <div>
        <strong>Due date</strong>
        <p>{formattedDueDate}</p>
      </div>
    </div>
  );
};

export default InvoiceMeta;
