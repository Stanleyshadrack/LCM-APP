// utils/currency.ts
export const parseKES = (val?: string | number | null) =>
  val ? parseFloat(String(val).replace(/[^\d.]/g, "")) : 0;

export const formatKES = (amount: number) =>
  `KES ${amount.toLocaleString("en-KE")}`;

