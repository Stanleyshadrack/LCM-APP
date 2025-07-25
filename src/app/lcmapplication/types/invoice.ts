export default interface Invoice {
  currentReading: string;
  previousReading: string;
  key: string;
  unitId: string;
  apartment: string;
  rentAmount: string;
  waterBill: string;
  amountPaid: string;
  amountPaidLastMonth: string;
  arrears: string;
  balanceDue: string;
  phoneNumber: string;
  date: string;
  dueDate: string;
  status: "PENDING" | "CLEARED" | "OVERDUE";
  totalPayable?: string;
  totalPaid?: string;
  overpaid?: string;
}






  


export enum ApartmentStatus {
  Letting = "Letting",
  UnderConstruction = "Under construction",
  SoldOut = "Sold out",
}

export interface Apartment {
  id: number;
  title: string;
  unitTypes: string[];
  status: ApartmentStatus;
}




  