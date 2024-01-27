import type { Entry } from "@prisma/client";
import { create } from "zustand";

interface EntryState {
  entry: Entry | null;
  setEntry: (entry: Entry | null) => void;
}

export const useEntry = create<EntryState>()((set) => ({
  entry: null,
  setEntry: (entry: Entry | null) => set(() => ({ entry })),
}));
