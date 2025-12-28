import { create } from 'zustand';
import { Bill, BillParticipant } from '../types';

interface BillState {
  bills: Bill[];
  participants: BillParticipant[];
  currentBill: Bill | null;
  setBills: (bills: Bill[]) => void;
  setCurrentBill: (bill: Bill | null) => void;
  setParticipants: (participants: BillParticipant[]) => void;
  addBill: (bill: Bill) => void;
}

export const useBillStore = create<BillState>((set) => ({
  bills: [],
  participants: [],
  currentBill: null,
  setBills: (bills) => set({ bills }),
  setCurrentBill: (bill) => set({ currentBill: bill }),
  setParticipants: (participants) => set({ participants }),
  addBill: (bill) => set((state) => ({ bills: [bill, ...state.bills] })),
}));
