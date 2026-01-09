import { Button } from "@/components/ui/button";

import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/formatCurrency";
import { useShallow } from "zustand/shallow";
import { useTransactionStore } from "../store/transactionStore";
import { useState } from "react";

export default function CartBase() {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  // Ambil semua state & action dari transactionStore
  const [
    cart,
    updateQty,
    removeFromCart,
    tanggalTransaksi,
    metodePembayaran,
    customer,
    diskonSubtotal,
    ppn,
    paidAmount,
    changeAmount,
    setTanggalTransaksi,
    setMetodePembayaran,
    setCustomer,
    setDiskonSubtotal,
    setPPN,
    setPaidAmount,
    clearTransaction,
  ] = useTransactionStore(
    useShallow((state) => [
      state.cart,
      state.updateQty,
      state.removeFromCart,
      state.tanggalTransaksi,
      state.metodePembayaran,
      state.customer,
      state.diskonSubtotal,
      state.ppn,
      state.paidAmount,
      state.changeAmount,
      state.setTanggalTransaksi,
      state.setMetodePembayaran,
      state.setCustomer,
      state.setDiskonSubtotal,
      state.setPPN,
      state.setPaidAmount,
      state.clearTransaction,
    ])
  );

  const totalQuantity = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalSubtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
  const totalFinal = totalSubtotal - diskonSubtotal + ppn;

  const increaseQty = (item) => {
    if (item.qty < Number(item.stock)) {
      updateQty(item.mtrl_code, item.qty + 1);
    }
  };

  const decreaseQty = (item) => {
    if (item.qty > 1) {
      updateQty(item.mtrl_code, item.qty - 1);
    } else {
      removeFromCart(item.mtrl_code);
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfbff] pb-2">
      {cart.length === 0 && (
        <div className="text-center text-gray-500 mt-10">Keranjang kosong</div>
      )}

      {cart.map((item) => (
        <div
          key={item.mtrl_code}
          className="border-b border-gray-200 px-2 mb-1"
        >
          {/* Header */}
          <div className="px-4 py-2 border-b border-gray-100">
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
                {formatCurrency(item.sell_price)} / {item.satuan}
              </div>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>Stock: {item.stock}</span>
              <div className="flex items-center gap-2">
                <button
                  className="w-7 h-7 rounded bg-[#ff7075]/60 text-gray-700 flex items-center justify-center text-lg hover:bg-[#ff7075]/80"
                  aria-label="kurang"
                  onClick={() => decreaseQty(item)}
                >
                  −
                </button>
                <span className="w-8 text-center font-medium">{item.qty}</span>
                <button
                  className="w-7 h-7 rounded bg-green-100 text-gray-700 flex items-center justify-center text-lg hover:bg-green-200"
                  aria-label="tambah"
                  onClick={() => increaseQty(item)}
                >
                  +
                </button>
              </div>
            </div>

            <div className="text-right text-sm mt-1">
              Subtotal: {formatCurrency(item.subtotal)}
            </div>
          </div>
        </div>
      ))}

      {/* Summary */}
      <div className="bg-white p-5 relative rounded-t-2xl bottom-0 left-0 right-0 border-t border-[#37393d]/40 mt-10 z-10">
        <div className="space-y-4">
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-600">Tanggal Transaksi</span>
            <input
              type="date"
              className="border rounded px-2 py-1 text-sm font-medium text-[#1e1e1e]"
              value={tanggalTransaksi}
              onChange={(e) => setTanggalTransaksi(e.target.value)}
            />
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Metode Pembayaran</span>
            <span className="font-medium text-[#1e1e1e]">
              {metodePembayaran}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Customer</span>
            <div className="flex items-center gap-2">
              <span className="font-medium text-[#1e1e1e]">{customer}</span>
              <button
                className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded"
                onClick={() => {
                  const newCustomer = prompt(
                    "Masukkan nama customer:",
                    customer
                  );
                  if (newCustomer) setCustomer(newCustomer);
                }}
              >
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
            <span>{formatCurrency(totalSubtotal)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>Diskon SubTotal</span>
              <button
                className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded"
                onClick={() => {
                  const newDiscount = prompt(
                    "Masukkan diskon subtotal:",
                    diskonSubtotal
                  );
                  if (newDiscount) setDiskonSubtotal(Number(newDiscount));
                }}
              >
                +
              </button>
            </div>
            <span>{formatCurrency(diskonSubtotal)}</span>
          </div>

          <div className="flex justify-between text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <span>PPN</span>
              <button
                className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded"
                onClick={() => {
                  const newPPN = prompt("Masukkan PPN:", ppn);
                  if (newPPN) setPPN(Number(newPPN));
                }}
              >
                +
              </button>
            </div>
            <span>{formatCurrency(ppn)}</span>
          </div>

          <hr className="border-gray-200 my-3" />

          <div className="flex justify-between text-xl font-bold text-[#1e1e1e]">
            <span>TOTAL</span>
            <span>{formatCurrency(totalFinal)}</span>
          </div>
        </div>

        {showCancelModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-black opacity-30"
              onClick={() => setShowCancelModal(false)}
            />

            {/* Modal box */}
            <div className="relative bg-white rounded-xl p-6 w-[90%] max-w-sm shadow-lg z-10">
              <h2 className="text-lg font-semibold text-gray-900">
                Batalkan Transaksi?
              </h2>

              <p className="text-sm text-gray-600 mt-2">
                Semua barang di keranjang dan data transaksi akan dihapus.
              </p>

              <div className="flex gap-3 mt-6">
                <Button
                  variant="ghost"
                  className="flex-1"
                  onClick={() => setShowCancelModal(false)}
                >
                  Tidak
                </Button>

                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    clearTransaction(); // 🔥 reset cart + summary
                    setShowCancelModal(false);
                    navigate("/home", { replace: true });
                  }}
                >
                  Ya, Batalkan
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Tombol action */}
        <div className="flex gap-3 mt-12">
          {/* 20% */}
          <Button
            variant="destructive"
            className="flex-[2]"
            onClick={() => setShowCancelModal(true)}
          >
            Batalkan
          </Button>

          {/* 30% */}
          <Button variant="secondary" className="flex-[3]">
            Pending
          </Button>

          {/* 50% */}
          <Link to="/payment" className="flex-[5]">
            <Button variant="default" className="w-full font-bold">
              Pembayaran
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
