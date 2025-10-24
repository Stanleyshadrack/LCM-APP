import { StateCreator } from "zustand";
import InvoiceType from "@/app/lcmapplication/types/invoice"; // <-- Use canonical type

export interface InvoiceSlice {
  invoices: InvoiceType[];
  setInvoices: (invoices: InvoiceType[]) => void;
  updateInvoice: (id: string, updates: Partial<InvoiceType>) => void;
  fetchInvoices: () => Promise<void>;
  setGlobalDueDate: (dueDate: string) => void;
}

export const createInvoiceSlice: StateCreator<InvoiceSlice> = (set, get) => ({
  invoices: [],

  setInvoices: (invoices) => set({ invoices }),

  updateInvoice: (id, updates) => {
    set((state) => ({
      invoices: state.invoices.map((inv) =>
        inv.key === id ? { ...inv, ...updates } : inv
      ),
    }));
  },

  setGlobalDueDate: (dueDate) => {
    set((state) => ({
      invoices: state.invoices.map((inv) => ({ ...inv, dueDate })),
    }));
  },

  fetchInvoices: async () => {
    // 🔗 Match waterMeters dummy data
    const dummy: InvoiceType[] = [
      {
        key: "1",
        unitId: "A101",
        apartment: "Sunset Villas",
        rentAmount: "KES 8,000",
        waterBill: "KES 750", // matches TotalAmount from meter
        amountPaid: "KES 8,750",
        amountPaidLastMonth: "KES 0",
        arrears: "KES 0",
        balanceDue: "KES 0",
        totalPayable: "KES 8,750",
        totalPaid: "KES 8,750",
        overpaid: "KES 0",
        phoneNumber: "254742792965",
        date: "2025-08-01",
        dueDate: "2025-08-10",
        status: "CLEARED",

        currentReading: "1200",
        previousReading: "1150",
        waterReadingCurrent: "1200",
        waterReadingPrevious: "1150",
        waterConsumption: "50",

        invoiceNo: "INV-001",
        invoiceDate: "2025-08-01",
        reference: "REF-001",
      },
      {
        key: "2",
        unitId: "A102",
        apartment: "Sunset Villas",
        rentAmount: "KES 7,500",
        waterBill: "KES 600",
        amountPaid: "KES 6,500",
        amountPaidLastMonth: "KES 7,000",
        arrears: "KES 1,600",
        balanceDue: "KES 1,600",
        totalPayable: "KES 8,100",
        totalPaid: "KES 6,500",
        overpaid: "KES 0",
        phoneNumber: "254742792965",
        date: "2025-08-02",
        dueDate: "2025-08-10",
        status: "PENDING",

        currentReading: "980",
        previousReading: "940",
        waterReadingCurrent: "980",
        waterReadingPrevious: "940",
        waterConsumption: "40",

        invoiceNo: "INV-002",
        invoiceDate: "2025-08-02",
        reference: "REF-002",
      },
      {
        key: "3",
        unitId: "B201",
        apartment: "Greenwood Heights",
        rentAmount: "KES 9,000",
        waterBill: "KES 750",
        amountPaid: "KES 9,750",
        amountPaidLastMonth: "KES 9,000",
        arrears: "KES 0",
        balanceDue: "KES 0",
        totalPayable: "KES 9,750",
        totalPaid: "KES 9,750",
        overpaid: "KES 0",
        phoneNumber: "254742792965",
        date: "2025-08-03",
        dueDate: "2025-08-12",
        status: "CLEARED",

        currentReading: "1500",
        previousReading: "1450",
        waterReadingCurrent: "1500",
        waterReadingPrevious: "1450",
        waterConsumption: "50",

        invoiceNo: "INV-003",
        invoiceDate: "2025-08-03",
        reference: "REF-003",
      },
    ];

    await new Promise((resolve) => setTimeout(resolve, 400));
    set({ invoices: dummy });
  },
});
