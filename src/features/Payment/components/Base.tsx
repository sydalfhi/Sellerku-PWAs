import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTransactionStore } from "@/features/Cart/store/transactionStore";
import { useShallow } from "zustand/shallow";
import { formatCurrency } from "@/utils/formatCurrency";

export default function PaymentBase() {
  const presetAmounts = [2000, 5000, 10000, 20000, 50000, 100000];

  const [cart, diskonSubtotal, ppn, paidAmount, setPaidAmount] =
    useTransactionStore(
      useShallow((state) => [
        state.cart,
        state.diskonSubtotal,
        state.ppn,
        state.paidAmount,
        state.setPaidAmount,
      ])
    );

  const totalSubtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const totalFinal = totalSubtotal - diskonSubtotal + ppn;
  const totalBelanja = totalFinal;

  const change = paidAmount - totalBelanja;

  // ✅ preset DIGABUNG
  const handlePresetClick = (amount: number) => {
    // Bisa pakai cara ini
    setPaidAmount(paidAmount + amount);
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const numericValue = value === "" ? 0 : Number(value);
    setPaidAmount(numericValue);
  };

  const handleReset = () => {
    setPaidAmount(0);
  };

  const handlePay = () => {
    alert("Pembayaran berhasil!");
  };

  return (
    <div className="min-h-screen">
      <div className="w-full max-w-xl mx-auto overflow-hidden">
        <div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold text-center text-[#1e1e1e]">
            Pembayaran Tunai
          </h1>

          <div className="bg-[#efecfa] p-5 text-center">
            <p className="text-sm text-gray-600">Total Belanja</p>
    <button className="cursor-pointer hover:scale-[1.25] transition-all duration-300" onClick={() => handlePresetClick(totalBelanja)}>
            <p className="text-3xl font-bold text-[#1e1e1e]">
              {formatCurrency(String(totalBelanja))}
            </p>
    </button>
          </div>

          <div className="w-full h-px bg-gray-300" />

          {/* Preset */}
          <div className="grid grid-cols-3 gap-3">
            {presetAmounts.map((amount) => (
              <Button
                key={amount}
                variant="outline"
                className="h-12 font-medium bg-[#efecff] border-[#efecff]"
                onClick={() => handlePresetClick(amount)}
              >
                {formatCurrency(String(amount))}
              </Button>
            ))}
          </div>

          {/* Input Manual */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-[#37393d]">
              Input Manual (Rp)
            </label>
            <Input
              type="text"
              value={formatCurrency(String(paidAmount))}
              onChange={handleManualInput}
              placeholder="0"
              className="text-lg font-medium text-center h-14"
            />
          </div>

          {/* Kembalian */}
          <div
            className={`rounded-xl p-5 text-center ${
              change >= 0 ? "bg-green-50" : "bg-gray-100"
            }`}
          >
            <p className="text-sm text-gray-600">Kembalian</p>
            <p
              className={`text-3xl font-bold ${
                change >= 0 ? "text-green-700" : "text-[#37393d]"
              }`}
            >
              Rp {Math.max(0, change).toLocaleString("id-ID")}
            </p>
            {change < 0 && (
              <p className="text-sm text-[#ff7075] mt-2 font-medium">
                Kurang Rp {Math.abs(change).toLocaleString("id-ID")}
              </p>
            )}
          </div>

          {/* Tombol Bayar */}
          <Button
            onClick={handlePay}
            disabled={paidAmount < totalBelanja}
            className={`w-full h-14 text-lg font-bold ${
              paidAmount >= totalBelanja
                ? "bg-green-600 hover:bg-green-600/90 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Bayar
          </Button>

          {/* Reset */}
          <Button
            onClick={handleReset}
            className="w-full h-14 text-lg font-bold bg-[#ff7075] hover:bg-[#ff7075]/90 text-white"
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
}
