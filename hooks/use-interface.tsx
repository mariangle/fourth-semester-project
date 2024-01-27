import { create } from "zustand";

interface InterfaceState {
  open: boolean;
  setOpen: (value: boolean) => void;
}

export const useInterface = create<InterfaceState>()((set) => ({
  open: false,
  setOpen: (value: boolean) => set(() => ({ open: value })),
}));
