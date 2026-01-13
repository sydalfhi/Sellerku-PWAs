import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import type { CartItem } from "@/types/cart.type";

interface DiscountModalProps {
  isOpen: boolean;
  item: CartItem | null;
  onClose: () => void;
  onSave: (discountType: "percent" | "amount" | null, discountValue: number) => void;
}

export default function DiscountModal({ isOpen, item, onClose, onSave }: DiscountModalProps) {
  const [discountType, setDiscountType] = useState<"percent" | "amount">("percent");
  const [discountValue, setDiscountValue] = useState("");

  useEffect(() => {
    if (item) {
      setDiscountType(item.discountType === "amount" ? "amount" : "percent");
      setDiscountValue(item.discountValue > 0 ? String(item.discountValue) : "");
    }
  }, [item]);

  if (!isOpen || !item) return null;

  const originalSubtotal = Number(item.sell_price) * item.qty;
  const value = Number(discountValue) || 0;

  let calculatedDiscount = 0;
  let finalSubtotal = originalSubtotal;

  if (value > 0) {
    if (discountType === "percent") {
      calculatedDiscount = originalSubtotal * (value / 100);
      finalSubtotal = originalSubtotal - calculatedDiscount;
    } else {
      calculatedDiscount = value;
      finalSubtotal = originalSubtotal - value;
    }
  }

  if (finalSubtotal < 0) finalSubtotal = 0;

  const handleSave = () => {
    console.info(value)
    if (value <= 0) {
      onSave(null, 0);
    } else {
      onSave(discountType, value);
    }
  };

  const handleRemoveDiscount = () => {
    onSave(null, 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl z-10 animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Diskon Item</h2>
        <p className="text-sm text-gray-600 mb-4">{item.mtrl_name}</p>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Harga Satuan</span>
            <span className="font-medium">{formatCurrency(String(item.sell_price))}</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Quantity</span>
            <span className="font-medium">{item.qty}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal Awal</span>
            <span className="font-semibold">{formatCurrency(String(originalSubtotal))}</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">Tipe Diskon</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setDiscountType("percent")}
              className={`px-4 py-2.5 rounded-lg font-medium transition ${
                discountType === "percent"
                  ? "bg-[#d7d0fe] text-[#37393d]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Persen (%)
            </button>
            <button
              onClick={() => setDiscountType("amount")}
              className={`px-4 py-2.5 rounded-lg font-medium transition ${
                discountType === "amount"
                  ? "bg-[#d7d0fe] text-[#37393d]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Rupiah (Rp)
            </button>
          </div>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Nilai Diskon {discountType === "percent" ? "(%)" : "(Rp)"}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
              {discountType === "percent" ? "%" : "Rp"}
            </span>
            <Input
              type="number"
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
              placeholder={discountType === "percent" ? "Misal: 10" : "Misal: 5000"}
              className="pl-10"
              autoFocus
            />
          </div>
        </div>

        {value > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-green-700 font-medium">Potongan</span>
              <span className="text-green-700 font-semibold">
                -{formatCurrency(String(calculatedDiscount))}
              </span>
            </div>
            <div className="flex justify-between text-base border-t border-green-200 pt-2">
              <span className="text-green-800 font-semibold">Subtotal Akhir</span>
              <span className="text-green-800 font-bold">{formatCurrency(String(finalSubtotal))}</span>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          {item.discountValue > 0 && (
            <Button
              variant="outline"
              className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
              onClick={handleRemoveDiscount}
            >
              Hapus
            </Button>
          )}
          <Button
            variant="ghost"
            className="flex-1"
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            className="flex-1 text-white bg-[#37393d] hover:bg-[#2a2c2e] font-semibold"
            onClick={handleSave}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}