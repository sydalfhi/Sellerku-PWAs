import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function PaymentBase() {
  const totalBelanja = 55000;
  const presetAmounts = [2000, 5000, 10000, 20000, 50000, 100000];

  const [paidAmount, setPaidAmount] = useState<number>(0);

  const change = paidAmount - totalBelanja;

  // ✅ preset DIGABUNG
  const handlePresetClick = (amount: number) => {
    setPaidAmount((prev) => prev + amount);
  };

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setPaidAmount(value === "" ? 0 : Number(value));
  };

  const handleReset = () => {
    setPaidAmount(0);
  };

  const handlePay = () => {
    alert("Pembayaran berhasil!");
    // di sini nanti bisa kirim ke API / print struk / dll
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
            <p className="text-3xl font-bold text-[#1e1e1e]">
              Rp {totalBelanja.toLocaleString("id-ID")}
            </p>
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
                Rp {amount.toLocaleString("id-ID")}
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
              value={paidAmount.toLocaleString("id-ID")}
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
