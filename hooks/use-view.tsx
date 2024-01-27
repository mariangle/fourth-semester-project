import { create } from "zustand";

type View = "table" | "calendar";

export const views: {
  value: View;
  name: string;
}[] = [
  {
    value: "table",
    name: "Table",
  },
  {
    value: "calendar",
    name: "Calendar",
  },
];

interface ViewState {
  view: View;
  setView: (view: View) => void;
  month: Date;
  setMonth: (month: Date) => void;
  date: Date;
  setDate: (month: Date) => void;
}

export const useView = create<ViewState>()((set) => ({
  month: new Date(),
  setMonth: (month: Date) => set(() => ({ month: month })),
  view: "table",
  setView: (view: View) => set(() => ({ view })),
  date: new Date(),
  setDate: (date: Date) => set(() => ({ date })),
}));
