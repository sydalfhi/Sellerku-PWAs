import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { formatCurrency } from "@/utils/formatCurrency";

interface EditModalProps {
  isOpen: boolean;
  field: "customer" | "discount" | "ppn" | null;
  currentValue: string;
  subtotal?: number;
  initialDiscountType?: "percent" | "amount";
  onClose: () => void;
  onSave: (
    field: "customer" | "discount" | "ppn",
    value: string,
    discountType?: "percent" | "amount"
  ) => void;
}

export default function EditModal({
  isOpen,
  field,
  currentValue,
  subtotal = 0,
  initialDiscountType = "amount",
  onClose,
  onSave,
}: EditModalProps) {
  const [value, setValue] = useState(currentValue);
  const [discountType, setDiscountType] = useState<"percent" | "amount">(
    initialDiscountType
  );

  useEffect(() => {
    setValue(currentValue);
  }, [currentValue]);

  useEffect(() => {
    if (field === "discount") {
      setDiscountType(initialDiscountType);
    }
  }, [field, initialDiscountType]);

  if (!isOpen || !field) return null;

  const fieldLabels = {
    customer: "Nama Customer",
    discount: "Diskon Subtotal",
    ppn: "PPN",
  };

  const handleSave = () => {
    if (field === "discount") {
      onSave(field, value, discountType);
    } else {
      onSave(field, value);
    }
  };

  const numValue = Number(value) || 0;
  let calculatedDiscount = 0;
  let finalTotal = subtotal;

  if (field === "discount" && numValue > 0) {
    if (discountType === "percent") {
      calculatedDiscount = subtotal * (numValue / 100);
      finalTotal = subtotal - calculatedDiscount;
    } else {
      calculatedDiscount = numValue;
      finalTotal = subtotal - numValue;
    }
  }

  if (finalTotal < 0) finalTotal = 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-2xl z-10 animate-in fade-in zoom-in duration-200">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          {fieldLabels[field]}
        </h2>

        {(field === "discount" || field === "ppn") && (
          <>
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">
                  {formatCurrency(String(subtotal))}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Tipe Diskon
              </label>
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
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder={
                    discountType === "percent" ? "Misal: 10" : "Misal: 5000"
                  }
                  className="pl-10"
                  autoFocus
                />
              </div>
            </div>

            {numValue > 0 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-700 font-medium">Potongan</span>
                  <span className="text-green-700 font-semibold">
                    -{formatCurrency(String(calculatedDiscount))}
                  </span>
                </div>
                <div className="flex justify-between text-base border-t border-green-200 pt-2">
                  <span className="text-green-800 font-semibold">
                    Total Akhir
                  </span>
                  <span className="text-green-800 font-bold">
                    {formatCurrency(String(finalTotal))}
                  </span>
                </div>
              </div>
            )}
          </>
        )}

        {field !== "discount" && (
          <Input
            type={field === "customer" ? "text" : "number"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`Masukkan ${fieldLabels[field].toLowerCase()}`}
            className="mb-4"
            autoFocus
          />
        )}

        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={onClose}>
            Batal
          </Button>
          <Button
            className="flex-1 bg-[#37393d] hover:bg-[#2a2c2e] font-semibold"
            onClick={handleSave}
          >
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}
