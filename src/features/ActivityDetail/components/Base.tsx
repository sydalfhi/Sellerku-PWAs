import { MockTransactionsDetail } from "@/_mock/transaksi";
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
        return "bg-[#dcfce7] text-[#166534]"; // ~ bg-green-100 & text-green-800
      case "Pending":
        return "bg-[#fef9c3] text-[#854d0e]"; // ~ bg-yellow-100 & text-yellow-800
      default:
        return "bg-[#f3f4f6] text-[#1f2937]"; // ~ bg-gray-100 & text-gray-800
    }
  };

  return (
    <div className="min-h-screen p-2">
      <div className="">
        {/* Main Card */}
        <div className="overflow-hidden  bg-white ">
          {/* Header Card */}
          <div className=" p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-lg font-semibold text[#1e1e1e]">
                    No. Transaksi:
                  </span>
                  <span className="text-xl font-bold text[#1e1e1e]">
                    {mockDetailActivity.out_no}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text[#1e1e1e]/90">
                    {mockDetailActivity.out_date}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#ffecba] text-[#92400e]">
                    {mockDetailActivity.cust_name}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      mockDetailActivity.status
                    )}`}
                  >
                    {mockDetailActivity.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Produk */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 text-[#1e1e1e]">
              Detail Produk
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#efecff]">
                    <th className="text-left py-3 px-4 font-medium text-[#37393d]">
                      Produk
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-[#37393d]">
                      Harga
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-[#37393d]">
                      Diskon
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-[#37393d]">
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
                      <td className="py-4 px-4">
                        <div>
                          <div className="font-medium text-[#1e1e1e]">
                            {item.mtrl_name}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            {item.mtrl_code} • {item.qty} {item.satuan}
                          </div>
                        </div>
                      </td>
                      <td className="text-right py-4 px-4 font-medium text-[#1e1e1e]">
                        {formatCurrency(item.sell_price)}
                      </td>
                      <td className="text-right py-4 px-4 font-medium text-[#ef4444]">
                        {formatCurrency(item.discount)}
                      </td>
                      <td className="text-right py-4 px-4 font-bold text-[#1e1e1e]">
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
                  <span className="font-medium">
                    {formatCurrency(mockDetailActivity.total_price)}
                  </span>
                </div>
                <div className="flex justify-between text-[#37393d]">
                  <span>Diskon Total</span>
                  <span className="font-medium text-[#ef4444]">
                    -{formatCurrency(mockDetailActivity.discount_total)}
                  </span>
                </div>
                <div className="flex justify-between text-[#37393d]">
                  <span>PPN</span>
                  <span className="font-medium">
                    {formatCurrency(mockDetailActivity.ppn)}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#efecff]">
                  <span className="font-semibold text-[#1e1e1e]">
                    Grand Total
                  </span>
                  <span className="font-bold text-lg text-[#1e1e1e]">
                    {formatCurrency(mockDetailActivity.grand_total)}
                  </span>
                </div>
              </div>

              {/* Pembayaran */}
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-[#ffecba]">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-[#37393d]">
                      Total Bayar
                    </span>
                    <span className="font-bold text-[#1e1e1e]">
                      {formatCurrency(mockDetailActivity.totalbayar)}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-[#d7d0fe]">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[#1e1e1e]">
                      Kembalian
                    </span>
                    <span className="font-bold text-xl text-[#1e1e1e]">
                      {formatCurrency(mockDetailActivity.kembalian)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-6 py-3 rounded-lg font-medium border border-[#d7d0fe] text-[#37393d] hover:bg-[#f8f5ff]">
            Cetak Struk
          </button>
          <button className="px-6 py-3 rounded-lg font-medium text-white bg-[#37393d] hover:bg-[#2c2e33]">
            Simpan PDF
          </button>
        </div>
      </div>
    </div>
  );
}
