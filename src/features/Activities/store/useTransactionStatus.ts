import { create } from "zustand";

type TransactionStatus = 0 | 1;

interface TransactionStatusStore {
    status: TransactionStatus;
    setStatus: (status: TransactionStatus) => void;
}

export const useTransactionStatus = create<TransactionStatusStore>((set) => ({
    status: 0, // default: Selesai
    setStatus: (status) => set({ status }),
}));
