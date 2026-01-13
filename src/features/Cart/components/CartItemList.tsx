import { formatCurrency } from "@/utils/formatCurrency";
import type { CartItem } from "@/types/cart.type";
import { Tag } from "lucide-react";
import { useState } from "react";
import DiscountModal from "./DiscountModal";


interface CartItemListProps {
  cart: CartItem[];
  onIncrease: (item: CartItem) => void;
  onDecrease: (item: CartItem) => void;
  onUpdateDiscount: (mtrl_code: string, discountType: "percent" | "amount" | null, discountValue: number) => void;
}

export default function CartItemList({ cart, onIncrease, onDecrease, onUpdateDiscount }: CartItemListProps) {
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  const handleOpenDiscount = (item: CartItem) => {
    setSelectedItem(item);
  };

  const handleSaveDiscount = (discountType: "percent" | "amount" | null, discountValue: number) => {

    if (selectedItem) {
      onUpdateDiscount(selectedItem.mtrl_code, discountType, discountValue);
      setSelectedItem(null);
    }
  };

  return (
    <>
      <div className="pb-105">
        {cart.map((item) => {
          const hasDiscount = item.discountType && item.discountValue > 0;
          const originalSubtotal = Number(item.sell_price) * item.qty;

          return (
            <div key={item.mtrl_code} className="bg-white mb-5 px-2 border-b border-gray-300">
              <div className="px-4 py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900">{item.mtrl_name}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{item.cat_name}</p>
                  </div>
                  <button
                    onClick={() => handleOpenDiscount(item)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#d7d0fe]/30 hover:bg-[#d7d0fe]/50 transition text-xs font-medium text-[#37393d]"
                  >
                    <Tag className="w-3.5 h-3.5" />
                    {hasDiscount ? "Edit" : "Diskon"}
                  </button>
                </div>
              </div>

              <div className="px-4 py-3">
                <div className="flex justify-between items-center mb-3">
                  <div className="text-sm text-gray-600">
                    {formatCurrency(String(item.sell_price))} / {item.satuan}
                  </div>
                  <div className="text-xs text-gray-500">Stock: {item.stock}</div>
                </div>

                {hasDiscount && (
                  <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-green-700 font-medium">
                        Diskon: {item.discountType === "percent" ? `${item.discountValue}%` : formatCurrency(String(item.discountValue))}
                      </span>
                      <span className="text-green-600">
                        Hemat {formatCurrency(String(originalSubtotal - item.subtotal))}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <button
                      className="w-8 h-8 rounded-lg bg-[#ff7075]/60 text-white flex items-center justify-center text-xl font-semibold hover:bg-[#ff7075]/80 transition"
                      onClick={() => onDecrease(item)}
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-semibold text-lg">{item.qty}</span>
                    <button
                      className="w-8 h-8 rounded-lg bg-green-500 text-white flex items-center justify-center text-xl font-semibold hover:bg-green-600 transition"
                      onClick={() => onIncrease(item)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Subtotal</div>
                    <div className="text-base font-semibold text-[#1e1e1e]">
                      {formatCurrency(String(item.subtotal))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <DiscountModal
        isOpen={selectedItem != null}
        item={selectedItem}
        onClose={() => setSelectedItem(null)}
        onSave={handleSaveDiscount}
      />
    </>
  );
}
