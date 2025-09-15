import { StateCreator } from "zustand";
import { WaterMeter } from "@/app/lcmapplication/types/invoice";

export interface WaterMeterSlice {
  waterMeters: WaterMeter[];
  setWaterMeters: (meters: WaterMeter[]) => void;
  fetchWaterMeters: () => Promise<void>;
}

// Dummy dataset with duplicates across apartments
const dummyData: WaterMeter[] = [
  {
    key: "1",
    unitId: "A101",
    apartment: "Sunset Villas",
    CurrentReading: "1200",
    PreviousReading: "1150",
    Consumption: "50",
    TotalAmount: "750",
    dateTime: "01/08/2025 10:00",
  },
  {
    key: "2",
    unitId: "A102",
    apartment: "Sunset Villas",
    CurrentReading: "980",
    PreviousReading: "940",
    Consumption: "40",
    TotalAmount: "600",
    dateTime: "02/08/2025 11:00",
  },
  {
    key: "3",
    unitId: "B201",
    apartment: "Greenwood Heights",
    CurrentReading: "1500",
    PreviousReading: "1450",
    Consumption: "50",
    TotalAmount: "750",
    dateTime: "03/08/2025 09:30",
  },
  // 🔁 Duplicate unitId "A101" but in a different apartment
  {
    key: "4",
    unitId: "A101",
    apartment: "Greenwood Heights",
    CurrentReading: "1320",
    PreviousReading: "1280",
    Consumption: "40",
    TotalAmount: "600",
    dateTime: "05/08/2025 14:20",
  },
  // 🔁 Another duplicate for variety
  {
    key: "5",
    unitId: "B201",
    apartment: "Sunset Villas",
    CurrentReading: "1600",
    PreviousReading: "1550",
    Consumption: "50",
    TotalAmount: "750",
    dateTime: "06/08/2025 09:45",
  },
];

export const createWaterMeterSlice: StateCreator<
  WaterMeterSlice,
  [],
  [],
  WaterMeterSlice
> = (set) => ({
  waterMeters: [],
  setWaterMeters: (meters) => set({ waterMeters: meters }),
  fetchWaterMeters: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // simulate backend delay
    set({ waterMeters: dummyData });
  },
});
