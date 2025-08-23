export default interface Invoice {
  waterReadingCurrent: string;
  waterReadingPrevious: string;
  waterConsumption: string;
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


export type Message = {
  sender: string;
  text: string;
  time: string;
};

export type ChatMap = Record<string, Message[]>;
export type GroupMembersMap = Record<string, string[]>;



export type Unit = {
  id: string;
  name: string;
  occupied: boolean; // required everywhere
};

export type Apartmentos = {
  name: string;
  units: Unit[];
};




  


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




  