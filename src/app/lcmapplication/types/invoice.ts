export default interface Invoice {
    key: string;
    unitId: string;
    apartment: string;
    rentAmount: string;
    phoneNumber: string;
    balanceDue: string;
    date: string;
    status: "PENDING" | "SENT";
    waterBill?: string;
    waterReadingCurrent?: number;
    waterReadingPrevious?: number;
    waterConsumption?: number;
    totalPayable?: string;
  }
  