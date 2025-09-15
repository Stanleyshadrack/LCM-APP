import { create } from "zustand";
import { createInvoiceSlice, InvoiceSlice } from "./invoiceSlice";
import { createPaymentSlice, PaymentSlice } from "./paymentSlice";
import { createWaterMeterSlice, WaterMeterSlice } from "./waterMeterSlice";
import { createFilterSlice, FilterSlice } from "./filterSlice";

export type StoreState =
  InvoiceSlice &
  PaymentSlice &
  WaterMeterSlice &
  FilterSlice;

export const useStore = create<StoreState>()((...a) => ({
  ...createInvoiceSlice(...a),
  ...createPaymentSlice(...a),
  ...createWaterMeterSlice(...a),
  ...createFilterSlice(...a),
}));
