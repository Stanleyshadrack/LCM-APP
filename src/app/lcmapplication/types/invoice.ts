import { ReactNode } from "react";

export default interface Invoice {
  invoiceNo: string | number;   // Invoice number (e.g. "001" or 1)
  invoiceDate: string | number | Date;  // Supports ISO string, timestamp, or Date
  reference: string;            // e.g. "INV-001"

  waterReadingCurrent: string;
  waterReadingPrevious: string;
  waterConsumption: string;

  currentReading: string;
  previousReading: string;

  key: string;
  unitId: string;
  apartment: string;

  rentAmount: string;           // "8000" or "KES 8,000"
  waterBill: string;            // "500"
  amountPaid: string;
  amountPaidLastMonth: string;
  arrears: string;
  balanceDue: string;

  phoneNumber: string;
  date: string | number | Date; // Keep consistent with invoiceDate
  dueDate: string | number | Date;

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
  occupied: boolean; 
};

export type Apartmentos = {
  name: string;
  units: Unit[];
};

export interface WaterMeter {
  key: string;
  unitId: string;
  apartment: string;
  CurrentReading: string;
  PreviousReading: string;
  Consumption: string;
  TotalAmount: string;
  dateTime: string;
}


export interface Payment {
  key: string;
  unitId: string;
  apartment: string;
  paidAmount: string;
  phoneNumber: string;
  arrears?:string;
  refCode: string;
  dateTime: string;
  paymentMode: string;
}

  


export enum ApartmentStatus {
  Letting = "Letting",
  UnderConstruction = "Under construction",
  SoldOut = "Sold out",
}



export interface ApartmentUnits {
  unit: string;     // unit identifier like "B01"
  unitType: string; // "1BR", "Studio", etc.
  status: string;   
}

export interface Apartment {
  id: number;
  title: string;
  unitTypes: string[];
  units: ApartmentUnits[];
  status: ApartmentStatus;
 address?: string;
  imageUrl?: string | null;
}




  