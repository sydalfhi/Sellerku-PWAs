import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatCurrency";
import { useShallow } from "zustand/shallow";
import {
  useTransactionStore,
  selectCartTotal,
  selectGrandTotal,
  selectCartItemCount,
} from "../store/transactionStore";
import { Calendar, User, Tag, Receipt } from "lucide-react";
import EditModal from "./EditModal";
import { useState } from "react";

interface CartSummaryProps {
  onCancel: () => void;
}

export default function CartSummary({ onCancel }: CartSummaryProps) {
  const [editField, setEditField] = useState<
    "customer" | "discount" | "ppn" | null
  >(null);
  const [discountType, setDiscountType] = useState<"percent" | "amount">(
    "amount"
  );
  const [ppnType, setPpnType] = useState<"percent" | "amount">("amount"); // TAMBAH INI
  const [
    tanggalTransaksi,
    metodePembayaran,
    customer,
    diskonSubtotal,
    ppn,
    setTanggalTransaksi,
    setCustomer,
    setDiskonSubtotal,
    setPPN,
  ] = useTransactionStore(
    useShallow((state) => [
      state.tanggalTransaksi,
      state.metodePembayaran,
      state.customer,
      state.diskonSubtotal,
      state.ppn,
      state.setTanggalTransaksi,
      state.setCustomer,
      state.setDiskonSubtotal,
      state.setPPN,
    ])
  );

  const totalQuantity = useTransactionStore(selectCartItemCount);
  const totalSubtotal = useTransactionStore(selectCartTotal);
  const totalFinal = useTransactionStore(selectGrandTotal);

  const handleEdit = (
    field: "customer" | "discount" | "ppn",
    value: string,
    type?: "percent" | "amount"
  ) => {
    if (field === "customer") {
      setCustomer(value);
    } else if (field === "discount") {
      const numValue = Number(value);
      if (type === "percent") {
        const discountAmount = totalSubtotal * (numValue / 100);
        setDiskonSubtotal(discountAmount);
      } else {
        setDiskonSubtotal(numValue);
      }
    } else if (field === "ppn") {
      const numValue = Number(value);
      if (type === "percent") {
        const ppnAmount = totalSubtotal * (numValue / 100); // TAMBAH INI
        setPPN(ppnAmount);
      } else {
        setPPN(numValue);
      }
    }
    setEditField(null);
  };

  return (
    <>
      <div className="bg-white p-6 absolute rounded-t-3xl bottom-0 left-0 right-0 border-t-2 border-[#37393d]/10 shadow-2xl z-10">
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="w-4 h-4" />
              <span>Tanggal</span>
            </div>
            <input
              type="date"
              className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-[#1e1e1e] focus:outline-none focus:ring-2 focus:ring-[#d7d0fe]"
              value={tanggalTransaksi}
              onChange={(e) => setTanggalTransaksi(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <Receipt className="w-4 h-4" />
              <span>Metode</span>
            </div>
            <span className="font-medium text-[#1e1e1e]">
              {metodePembayaran}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <User className="w-4 h-4" />
              <span>Customer</span>
            </div>
            <button
              onClick={() => setEditField("customer")}
              className="flex items-center gap-2 font-medium text-[#1e1e1e] hover:text-[#37393d] transition"
            >
              {customer}
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                ✎
              </span>
            </button>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Item</span>
            <span className="font-semibold text-[#1e1e1e]">
              {totalQuantity}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-3 mt-3" />

          <div className="flex justify-between items-center text-base">
            <span className="font-medium text-gray-700">Subtotal</span>
            <span className="font-semibold">
              {formatCurrency(String(totalSubtotal))}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span>Diskon</span>
            </div>
            <button
              onClick={() => {
                setEditField("discount");
                setDiscountType("amount");
              }}
              className="flex items-center gap-2 font-medium hover:text-gray-800 transition"
            >
              {formatCurrency(String(diskonSubtotal))}
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                ✎
              </span>
            </button>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <span>PPN</span>
            <button
              onClick={() => {
                setEditField("ppn");
                setDiscountType("amount");
              }}
              className="flex items-center gap-2 font-medium hover:text-gray-800 transition"
            >
              {formatCurrency(String(ppn))}
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                ✎
              </span>
            </button>
          </div>

          <div className="border-t-2 border-gray-200 pt-3 mt-3" />

          <div className="flex justify-between items-center text-xl">
            <span className="font-bold text-[#1e1e1e]">TOTAL</span>
            <span className="font-bold text-[#1e1e1e]">
              {formatCurrency(String(totalFinal))}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_1.5fr_2fr] gap-3 mt-6">
          <Button
            variant="destructive"
            className="font-semibold"
            onClick={onCancel}
          >
            Batalkan
          </Button>

          <Button variant="secondary" className="font-semibold">
            Pending
          </Button>

          <Link to="/payment" className="w-full">
            <Button className="w-full bg-[#37393d] hover:bg-[#2a2c2e] text-white font-bold">
              Pembayaran
            </Button>
          </Link>
        </div>
      </div>

      <EditModal
        isOpen={editField !== null}
        field={editField}
        currentValue={
          editField === "customer"
            ? customer
            : editField === "discount"
            ? String(diskonSubtotal)
            : String(ppn)
        }
        subtotal={totalSubtotal}
        initialDiscountType={editField === "ppn" ? ppnType : discountType} // UBAH INI
        onClose={() => setEditField(null)}
        onSave={handleEdit}
      />
    </>
  );
}
