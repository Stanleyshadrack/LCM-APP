"use client"
import React, { createContext, useContext } from "react";

export interface WaterReading {
  unitId: string;
  apartment: string;
  currentReading: number;
  previousReading: number;
  consumption: number;
  totalAmount: number;
  dateTime: string; // should be ISO or parsable by dayjs
}

const Context = createContext<WaterReading[]>([]);

export const WaterReadingProvider: React.FC<{ readings: WaterReading[]; children: React.ReactNode }> = ({
  readings,
  children,
}) => (
  <Context.Provider value={readings}>{children}</Context.Provider>
);

export const useWaterReadings = () => useContext(Context);
