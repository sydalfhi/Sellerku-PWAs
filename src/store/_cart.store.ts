import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

interface CartState {
    items: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],

            addToCart: (product) => {
                const items = [...get().items];
                const index = items.findIndex((i) => i.id === product.id);

                if (index > -1) {
                    // jika sudah ada di cart, tambah qty
                    items[index].qty += 1;
                } else {
                    items.push({ ...product, qty: 1 });
                }

                set({ items });
            },

            removeFromCart: (productId) => {
                set({ items: get().items.filter((i) => i.id !== productId) });
            },

            clearCart: () => set({ items: [] }),

            totalPrice: () =>
                get().items.reduce((sum, item) => sum + item.sell_price * item.qty, 0),
        }),
        {
            name: "cart-storage",
        }
    )
);
