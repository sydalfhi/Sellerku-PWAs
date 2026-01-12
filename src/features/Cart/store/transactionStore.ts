// src/features/Cart/store/transactionStore.ts
import { create } from "zustand";

type CartItem = {
  mtrl_code: string;
  cat_name: string;
  sell_price: number | string; // terima string
  qty: number;
  discountType: "percent" | "amount" | null;
  discountValue: number;
  subtotal: number;
  satuan: string;
  stock?: number;
};

type TransactionState = {
  cart: CartItem[];
  tanggalTransaksi: string;
  metodePembayaran: string;
  customer: string;
  diskonSubtotal: number;
  ppn: number;
  paidAmount: number;
  changeAmount: number;

  addToCart: (product: Omit<CartItem, "qty" | "discountType" | "discountValue" | "subtotal">, qty?: number) => void;
  removeFromCart: (mtrl_code: string) => void;
  updateQty: (mtrl_code: string, qty: number) => void;
  updateDiscount: (mtrl_code: string, discountType: "percent" | "amount" | null, discountValue: number) => void;
  clearCart: () => void;

  setTanggalTransaksi: (tanggal: string) => void;
  setMetodePembayaran: (metode: string) => void;
  setCustomer: (customerName: string) => void;
  setDiskonSubtotal: (diskon: number) => void;
  setPPN: (ppnValue: number) => void;

  setPaidAmount: (paid: number | ((current: number) => number)) => void;
  clearTransaction: () => void;
};

// ===== Helper Functions =====
const calculateSubtotal = (item: CartItem) => {
  const price = Number(item.sell_price);
  const qty = Number(item.qty);
  let subtotal = price * qty;

  if (item.discountType === "percent") {
    subtotal -= subtotal * (Number(item.discountValue) / 100);
  } else if (item.discountType === "amount") {
    subtotal -= Number(item.discountValue);
  }

  return subtotal > 0 ? subtotal : 0;
};

const saveToLocalStorage = (state: TransactionState) => {
  localStorage.setItem("transaction", JSON.stringify(state));
};

const getFromLocalStorage = (): Partial<TransactionState> | null => {
  const stored = localStorage.getItem("transaction");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
  return null;
};

// ===== Zustand Store =====
export const useTransactionStore = create<TransactionState>((set, _) => ({
  cart: getFromLocalStorage()?.cart || [],
  tanggalTransaksi: getFromLocalStorage()?.tanggalTransaksi || new Date().toLocaleDateString("id-ID"),
  metodePembayaran: getFromLocalStorage()?.metodePembayaran || "Cash",
  customer: getFromLocalStorage()?.customer || "Umum",
  diskonSubtotal: getFromLocalStorage()?.diskonSubtotal || 0,
  ppn: getFromLocalStorage()?.ppn || 0,
  paidAmount: getFromLocalStorage()?.paidAmount || 0,
  changeAmount: getFromLocalStorage()?.changeAmount || 0,

  addToCart: (product, qty = 1) => {
    set((state) => {
      const existing = state.cart.find((i) => i.mtrl_code === product.mtrl_code);
      let updatedCart: CartItem[];

      if (existing) {
        updatedCart = state.cart.map((item) =>
          item.mtrl_code === product.mtrl_code
            ? { ...item, qty: item.qty + qty, subtotal: calculateSubtotal({ ...item, qty: item.qty + qty }) }
            : item
        );
      } else {
        const newItem: CartItem = {
          ...product,
          qty,
          discountType: null,
          discountValue: 0,
          subtotal: calculateSubtotal({ ...product, qty, discountType: null, discountValue: 0 } as CartItem),
        };
        updatedCart = [...state.cart, newItem];
      }

      const newState = { ...state, cart: updatedCart };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  removeFromCart: (mtrl_code) => {
    set((state) => {
      const updatedCart = state.cart.filter((item) => item.mtrl_code !== mtrl_code);
      const newState = { ...state, cart: updatedCart };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  updateQty: (mtrl_code, qty) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.mtrl_code === mtrl_code
          ? { ...item, qty, subtotal: calculateSubtotal({ ...item, qty }) }
          : item
      );
      const newState = { ...state, cart: updatedCart };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  updateDiscount: (mtrl_code, discountType, discountValue) => {
    set((state) => {
      const updatedCart = state.cart.map((item) =>
        item.mtrl_code === mtrl_code
          ? { ...item, discountType, discountValue, subtotal: calculateSubtotal({ ...item, discountType, discountValue }) }
          : item
      );
      const newState = { ...state, cart: updatedCart };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  clearCart: () => {
    set((state) => {
      const newState = { ...state, cart: [] };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  setTanggalTransaksi: (tanggal) => {
    set((state) => {
      const newState = { ...state, tanggalTransaksi: tanggal };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  setMetodePembayaran: (metode) => {
    set((state) => {
      const newState = { ...state, metodePembayaran: metode };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  setCustomer: (customerName) => {
    set((state) => {
      const newState = { ...state, customer: customerName };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  setDiskonSubtotal: (diskon) => {
    set((state) => {
      const newState = { ...state, diskonSubtotal: diskon };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  setPPN: (ppnValue) => {
    set((state) => {
      const newState = { ...state, ppn: ppnValue };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  setPaidAmount: (paid) => {
    set((state) => {
      const newPaidAmount = typeof paid === "function" ? paid(state.paidAmount) : Number(paid) || 0;
      const totalSubtotal = state.cart.reduce((sum, item) => sum + item.subtotal, 0);
      const totalFinal = totalSubtotal - state.diskonSubtotal + state.ppn;
      const newState = { ...state, paidAmount: newPaidAmount, changeAmount: newPaidAmount - totalFinal };
      saveToLocalStorage(newState);
      return newState;
    });
  },

  clearTransaction: () => {
    const defaultState: TransactionState = {
      cart: [],
      tanggalTransaksi: new Date().toLocaleDateString("id-ID"),
      metodePembayaran: "Cash",
      customer: "Umum",
      diskonSubtotal: 0,
      ppn: 0,
      paidAmount: 0,
      changeAmount: 0,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQty: () => {},
      updateDiscount: () => {},
      clearCart: () => {},
      setTanggalTransaksi: () => {},
      setMetodePembayaran: () => {},
      setCustomer: () => {},
      setDiskonSubtotal: () => {},
      setPPN: () => {},
      setPaidAmount: () => {},
      clearTransaction: () => {},
    };
    saveToLocalStorage(defaultState);
    set(defaultState);
  },
}));
