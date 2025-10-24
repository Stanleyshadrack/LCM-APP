import { StateCreator } from "zustand";
import { Dayjs } from "dayjs";

export interface FilterSlice {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  monthFilter: Dayjs | null;
  setMonthFilter: (month: Dayjs | null) => void;
  viewLastMonth: boolean;
  setViewLastMonth: (val: boolean) => void;
  showOnlyOverpaid: boolean;
  setShowOnlyOverpaid: (val: boolean) => void;
  globalDueDate: string | null;
  setGlobalDueDate: (date: string | null) => void;
}

export const createFilterSlice: StateCreator<
  FilterSlice,
  [],
  [],
  FilterSlice
> = (set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),

  monthFilter: null,
  setMonthFilter: (month) => set({ monthFilter: month }),

  viewLastMonth: false,
  setViewLastMonth: (val) => set({ viewLastMonth: val }),

  showOnlyOverpaid: false,
  setShowOnlyOverpaid: (val) => set({ showOnlyOverpaid: val }),

  globalDueDate: null,
  setGlobalDueDate: (date) => set({ globalDueDate: date }),
});

