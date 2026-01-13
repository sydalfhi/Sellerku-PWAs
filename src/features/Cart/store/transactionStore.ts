import type { CartItem } from "@/types/cart.type";
import { create } from "zustand";

// ===== Types =====
type DiscountType = "percent" | "amount" | null;

type TransactionData = {
  cart: CartItem[];
  tanggalTransaksi: string;
  metodePembayaran: string;
  customer: string;
  diskonSubtotal: number;
  ppn: number;
  paidAmount: number;
  changeAmount: number;
};

type TransactionActions = {
  addToCart: (
    product: Omit<CartItem, "qty" | "discountType" | "discountValue" | "subtotal">,
    qty?: number
  ) => void;
  removeFromCart: (mtrl_code: string) => void;
  updateQty: (mtrl_code: string, qty: number) => void;
  updateDiscount: (
    mtrl_code: string,
    discountType: DiscountType,
    discountValue: number
  ) => void;
  clearCart: () => void;
  setTanggalTransaksi: (tanggal: string) => void;
  setMetodePembayaran: (metode: string) => void;
  setCustomer: (customerName: string) => void;
  setDiskonSubtotal: (diskon: number) => void;
  setPPN: (ppnValue: number) => void;
  setPaidAmount: (paid: number | ((current: number) => number)) => void;
  clearTransaction: () => void;
  resetStore: () => void;
};

type TransactionState = TransactionData & TransactionActions;

// ===== Constants =====
const STORAGE_KEY = "transaction";

// ===== Helper Functions =====
const calculateSubtotal = (item: CartItem): number => {
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

const getInitialData = (): TransactionData => ({
  cart: [],
  tanggalTransaksi: new Date().toLocaleDateString("id-ID"),
  metodePembayaran: "Cash",
  customer: "Umum",
  diskonSubtotal: 0,
  ppn: 0,
  paidAmount: 0,
  changeAmount: 0,
});

const saveToLocalStorage = (data: TransactionData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Failed to save to localStorage:", error);
  }
};

const getFromLocalStorage = (): TransactionData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<TransactionData>;
      return {
        ...getInitialData(),
        ...parsed,
      };
    }
  } catch (error) {
    console.error("Failed to load from localStorage:", error);
  }
  return getInitialData();
};

const clearLocalStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Failed to clear localStorage:", error);
  }
};

// ===== Zustand Store =====
export const useTransactionStore = create<TransactionState>((set, _) => {
  const initialData = getFromLocalStorage();

  return {
    // Initial Data
    ...initialData,

    // Actions
    addToCart: (product, qty = 1) => {
      set((state) => {
        const existing = state.cart.find((i) => i.mtrl_code === product.mtrl_code);
        let updatedCart: CartItem[];

        if (existing) {
          updatedCart = state.cart.map((item) =>
            item.mtrl_code === product.mtrl_code
              ? {
                  ...item,
                  qty: item.qty + qty,
                  subtotal: calculateSubtotal({ ...item, qty: item.qty + qty }),
                }
              : item
          );
        } else {
          const newItem: CartItem = {
            ...product,
            qty,
            discountType: null,
            discountValue: 0,
            subtotal: calculateSubtotal({
              ...product,
              qty,
              discountType: null,
              discountValue: 0,
            } as CartItem),
          };
          updatedCart = [...state.cart, newItem];
        }

        const newData: TransactionData = {
          cart: updatedCart,
          tanggalTransaksi: state.tanggalTransaksi,
          metodePembayaran: state.metodePembayaran,
          customer: state.customer,
          diskonSubtotal: state.diskonSubtotal,
          ppn: state.ppn,
          paidAmount: state.paidAmount,
          changeAmount: state.changeAmount,
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    removeFromCart: (mtrl_code) => {
      set((state) => {
        const updatedCart = state.cart.filter((item) => item.mtrl_code !== mtrl_code);

        const newData: TransactionData = {
          ...state,
          cart: updatedCart,
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    updateQty: (mtrl_code, qty) => {
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.mtrl_code === mtrl_code
            ? { ...item, qty, subtotal: calculateSubtotal({ ...item, qty }) }
            : item
        );

        const newData: TransactionData = {
          ...state,
          cart: updatedCart,
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    updateDiscount: (mtrl_code, discountType, discountValue) => {
      set((state) => {
        const updatedCart = state.cart.map((item) =>
          item.mtrl_code === mtrl_code
            ? {
                ...item,
                discountType,
                discountValue,
                subtotal: calculateSubtotal({ ...item, discountType, discountValue }),
              }
            : item
        );

        const newData: TransactionData = {
          ...state,
          cart: updatedCart,
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    clearCart: () => {
      set((state) => {
        const newData: TransactionData = {
          ...state,
          cart: [],
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    setTanggalTransaksi: (tanggal) => {
      set((state) => {
        const newData: TransactionData = {
          ...state,
          tanggalTransaksi: tanggal,
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    setMetodePembayaran: (metode) => {
      set((state) => {
        const newData: TransactionData = {
          ...state,
          metodePembayaran: metode,
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    setCustomer: (customerName) => {
      set((state) => {
        const newData: TransactionData = {
          ...state,
          customer: customerName,
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    setDiskonSubtotal: (diskon) => {
      set((state) => {
        const newData: TransactionData = {
          ...state,
          diskonSubtotal: diskon,
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    setPPN: (ppnValue) => {
      set((state) => {
        const newData: TransactionData = {
          ...state,
          ppn: ppnValue,
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    setPaidAmount: (paid) => {
      set((state) => {
        const newPaidAmount =
          typeof paid === "function" ? paid(state.paidAmount) : Number(paid) || 0;
        const totalSubtotal = state.cart.reduce((sum, item) => sum + item.subtotal, 0);
        const totalFinal = totalSubtotal - state.diskonSubtotal + state.ppn;

        const newData: TransactionData = {
          ...state,
          paidAmount: newPaidAmount,
          changeAmount: newPaidAmount - totalFinal,
        };

        saveToLocalStorage(newData);
        return newData;
      });
    },

    clearTransaction: () => {
      const newData = getInitialData();
      saveToLocalStorage(newData);
      set(newData);
    },

    resetStore: () => {
      clearLocalStorage();
      const newData = getInitialData();
      set(newData);
    },
  };
});

// ===== Selectors (Optional - untuk performa lebih baik) =====
export const selectCart = (state: TransactionState) => state.cart;
export const selectCartTotal = (state: TransactionState) =>
  state.cart.reduce((sum, item) => sum + item.subtotal, 0);
export const selectGrandTotal = (state: TransactionState) => {
  const subtotal = state.cart.reduce((sum, item) => sum + item.subtotal, 0);
  return subtotal - state.diskonSubtotal + state.ppn;
};
export const selectCartItemCount = (state: TransactionState) =>
  state.cart.reduce((sum, item) => sum + item.qty, 0);