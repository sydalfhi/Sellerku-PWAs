import { MockProducts } from "@/_mock/product";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

export default function CartBase() {
  const itemsList = [...MockProducts, ...MockProducts];

  // Hitung total quantity dan subtotal keseluruhan
  const totalQuantity = itemsList.reduce(
    (sum, item) => sum + (item.qty || 0),
    0
  );
  const totalSubtotal = itemsList.reduce(
    (sum, item) => sum + Number(item.sell_price) * (item.qty || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#fcfbff] pb-2">
      {itemsList.map((item) => {
        const subtotal = Number(item.sell_price) * (item.qty || 0);

        return (
          <div
            key={item.id || item.mtrl_name}
            className="border-b border-gray-200 px-2 mb-1"
          >
            {/* Header */}
            <div className="px-4 py-2 border-b  border-gray-100">
              <div className="flex justify-between items-start">
                <h3 className="text-base font-semibold text-gray-900">
                  {item.mtrl_name}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="px-4 py-1">
              <div className="flex justify-between items-center mb-2.5 text-sm">
                <div className="text-gray-600">
                  Rp {Number(item.sell_price).toLocaleString("id-ID")} / porsi
                </div>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>Stock: {item.stock}</span>
                <div className="flex items-center gap-2">
                  <button
                    className="w-7 h-7 rounded bg-[#ff7075]/60 text-gray-700 flex items-center justify-center text-lg hover:bg-[#ff7075]/80"
                    aria-label="kurang"
                    // onClick={() => decreaseQty(item)}
                  >
                    −
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.qty || 0}
                  </span>
                  <button
                    className="w-7 h-7 rounded bg-green-100 text-gray-700 flex items-center justify-center text-lg hover:bg-green-200"
                    aria-label="tambah"
                    // onClick={() => increaseQty(item)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="bg-white p-5 relative  rounded-t-2xl bottom-0 left-0 right-0 border-t border-[#37393d]/40 mt-10 z-10">
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tanggal Transaksi</span>
            <span className="font-medium text-[#1e1e1e]">8/1/2026</span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Metode Pembayaran</span>
            <span className="font-medium text-[#1e1e1e]">Cash</span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Customer</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#1e1e1e]">Umum</span>
              <button className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                +
              </button>
            </div>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Total Item</span>
            <span className="font-medium text-[#1e1e1e]">{totalQuantity}</span>
          </div>

          <hr className="border-gray-200 my-3" />

          <div className="flex justify-between text-base font-medium">
            <span className="text-gray-700">Subtotal</span>
            <span>Rp {totalSubtotal.toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>Diskon SubTotal</span>
              <button className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                +
              </button>
            </div>
            <span>Rp 0</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>PPN</span>
              <button className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
                +
              </button>
            </div>
            <span>Rp 0</span>
          </div>

          <hr className="border-gray-200 my-3" />

          <div className="flex justify-between text-xl font-bold text-[#1e1e1e]">
            <span>TOTAL</span>
            <span>Rp {totalSubtotal.toLocaleString("id-ID")}</span>
          </div>
        </div>

        {/* Tombol action */}
        <div className="flex gap-3 mt-6">
          <Button variant="ghost" className="flex-1">
            Batal
          </Button>
          <Button variant="secondary" className="flex-1">
            Pending
          </Button>
          <Link to="/payment">
            <Button variant="default" className="flex-1 font-bold">
              Pembayaran
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
