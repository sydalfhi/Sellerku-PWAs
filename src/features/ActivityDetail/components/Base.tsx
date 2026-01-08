import { MockTransactionsDetail } from "@/_mock/transaksi";
import { formatTanggal } from "@/utils/dateFormate";
import { formatCurrency } from "@/utils/formatCurrency";
import React from "react";

export default function ActivityDetailBase({
  outNo,
}: {
  outNo: string | undefined;
}) {
  const mockDetailActivity = MockTransactionsDetail;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Selesai":
        return "bg-[#dcfce7] text-[#166534]";
      case "Pending":
        return "bg-[#fef9c3] text-[#854d0e]";
      default:
        return "bg-[#f3f4f6] text-[#1f2937]";
    }
  };

  return (
    <div className="min-h-screen p-2 mb-10">
      <div className="">
        {/* Main Card */}
        <div className="overflow-hidden  bg-white ">
          {/* Header Card */}
          <div className=" p-4 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-regular text[#1e1e1e]">
                    No. Transaksi:
                  </span>
                  <span className="text-lg font-regular text[#1e1e1e]">
                    {mockDetailActivity.out_no}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text[#1e1e1e]/90">
                    {formatTanggal(mockDetailActivity?.out_date)}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#ffecba] text-[#92400e]">
                    {mockDetailActivity?.cust_name || "Umum"}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      mockDetailActivity?.status
                    )}`}
                  >
                    {mockDetailActivity?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Produk */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-[#1e1e1e]">
              Detail Produk
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#efecff]">
                    <th className="text-left p-2 font-medium text-[#37393d]">
                      Produk
                    </th>
                    <th className="text-right p-2 font-medium text-[#37393d]">
                      Harga
                    </th>
                    <th className="text-right p-2 font-medium text-[#37393d]">
                      Diskon
                    </th>
                    <th className="text-right p-2 font-medium text-[#37393d]">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockDetailActivity.details.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-[#efecff] hover:bg-gray-50"
                    >
                      <td className="p2">
                        <div>
                          <div className="font-regular text-sm text-[#1e1e1e]">
                            {item.mtrl_name}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {item.qty} / {item.satuan}
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-4 font-light text-sm text-[#1e1e1e]">
                        {formatCurrency(item.sell_price)}
                      </td>
                      <td className="text-right py-4 px-4 font-light text-sm text-[#ef4444]">
                        {formatCurrency(item.discount)}
                      </td>
                      <td className="text-right py-4 px-4 font-lith text-sm text-[#1e1e1e]">
                        {formatCurrency(item.subtotal)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Ringkasan Pembayaran */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#1e1e1e]">
              Ringkasan Pembayaran
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ringkasan */}
              <div className="space-y-3">
                <div className="flex justify-between text-[#37393d]">
                  <span>Total Harga</span>
                  <span className="font-light text-sm">
                    {formatCurrency(mockDetailActivity.total_price)}
                  </span>
                </div>
                <div className="flex justify-between text-[#37393d]">
                  <span>Diskon Total</span>
                  <span className="font-light text-sm text-[##ff7075]">
                    -{formatCurrency(mockDetailActivity.discount_total)}
                  </span>
                </div>
                <div className="flex justify-between text-[#37393d]">
                  <span>PPN</span>
                  <span className="font-light text-sm">
                    {formatCurrency(mockDetailActivity.ppn)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#efecff]">
                  <span className="font-medium text-[#1e1e1e]">
                    Total Bayar
                  </span>
                  <span className="font-medium text-lg text-[#1e1e1e]">
                    {formatCurrency(mockDetailActivity.totalbayar)}
                  </span>
                </div>
                <div className="flex justify-between  border-[#efecff]">
                  <span className="font-medium text-[#1e1e1e]">
                    Grand Total
                  </span>
                  <span className="font-medium text-lg text-[#1e1e1e]">
                    {formatCurrency(mockDetailActivity.grand_total)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#efecff]">
                  <span className="font-medium text-[#1e1e1e]">Kembalian</span>
                  <span className="font-medium text-lg text-[#1e1e1e]">
                    {formatCurrency(mockDetailActivity.kembalian)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-4 mt-8">
          {/* Tombol Cetak Struk */}
          <button
            className="group flex items-center gap-2 px-6 py-3 rounded-lg font-medium 
               border border-[#d7d0fe] text-[#37393d] 
               hover:bg-[#f8f5ff] hover:border-[#c4b5fd] 
               transition-all duration-200 active:scale-[0.98]"
          >
            <svg
              className="w-5 h-5 text-[#37393d] group-hover:text-[#4f46e5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            Cetak Struk
          </button>

          {/* Tombol Simpan PDF */}
          <button
            className="group flex items-center gap-2 px-6 py-3 rounded-lg font-medium 
               text-white bg-[#37393d] 
               hover:bg-[#2c2e33] hover:shadow-md 
               transition-all duration-200 active:scale-[0.98]"
          >
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="#fff"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Simpan PDF
          </button>
        </div>
      </div>
    </div>
  );
}
