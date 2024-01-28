import { create } from "zustand";

interface SettingsState {
  hourlyWage: number | null;
  setHourlyWage: (number: number | null) => void;
}

export const useSettings = create<SettingsState>()((set) => ({
  hourlyWage: 130,
  setHourlyWage: (number: number | null) => set(() => ({ hourlyWage: number })),
}));
