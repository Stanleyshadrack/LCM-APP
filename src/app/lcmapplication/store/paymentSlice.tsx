import { StateCreator } from "zustand";
import { Payment } from "@/app/lcmapplication/types/invoice";

export interface PaymentSlice {
  payments: Payment[];
  setPayments: (payments: Payment[]) => void;
  addPayment: (payment: Payment) => void;
  deletePayment: (key: string) => void;
  fetchPayments: () => Promise<void>;
}

export const createPaymentSlice: StateCreator<PaymentSlice> = (set) => ({
  payments: [],
  setPayments: (payments) => set({ payments }),
  addPayment: (payment) =>
    set((state) => ({ payments: [...state.payments, payment] })),
  deletePayment: (key) =>
    set((state) => ({ payments: state.payments.filter((p) => p.key !== key) })),
  fetchPayments: async () => {
    try {
      const dummy: Payment[] = [
        {
          key: "p1",
          dateTime: "2025-07-03 14:32",
          unitId: "A01",
          apartment: "Sunset Villas",
          paidAmount: "KES 11,000",
          paymentMode: "M-Pesa",
          phoneNumber: "0712345678",
          refCode: "MPESA12345",
        },
        {
          key: "p2",
          dateTime: "2025-06-05 10:12",
          unitId: "B02",
          apartment: "Greenwood Heights",
          paidAmount: "KES 11,000",
          paymentMode: "M-Pesa",
          phoneNumber: "0722334455",
          refCode: "BANK98765",
        },
      ];
      await new Promise((resolve) => setTimeout(resolve, 400));
      set({ payments: dummy });
    } catch (err) {
      console.error("Failed to fetch payments", err);
    }
  },
});
