import React from "react";
import Invoice from "@/app/lcmapplication/types/invoice";

interface Props {
  invoice: Invoice;
}

const InvoiceMeta: React.FC<Props> = ({ invoice }) => (
  <div className="invoice-meta">
    <div><strong>Invoice #</strong><p>{invoice.key}</p></div>
    <div><strong>Invoice date</strong><p>{invoice.date}</p></div>
    <div><strong>Reference</strong><p>INV-{invoice.key.padStart(3, "0")}</p></div>
    <div><strong>Due date</strong><p>7 MAR 2025</p></div>
  </div>
);

export default InvoiceMeta;

