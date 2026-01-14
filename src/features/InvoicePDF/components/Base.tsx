import { useRef } from "react";
import { formatTanggal } from "@/utils/dateFormate";
import { formatCurrency } from "@/utils/formatCurrency";
import Error from "@/components/fragments/Error";
import { getStoredUserData } from "@/utils/getStoredUser";
import { useReactToPrint } from "react-to-print";

import Loading from "@/components/fragments/Loadin";
import { useActivityDetail } from "@/features/ActivityDetail/hooks/useActivity";

export default function InvoicePDFBase({
  outNo,
}: {
  outNo: string | undefined;
}) {
  const userData = getStoredUserData();
  const email = userData?.email || "";
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useActivityDetail({ email, outNo });

  const handlePrint = useReactToPrint({
    content: () => contentRef.current,
    documentTitle: `Invoice-${transactions?.out_no}`,
  });

  const storeName = userData?.buss_name;
  const storeBranch = userData?.store_name;
  const storeAddress = userData?.store_address;
  // const cashierName = userData?.emp_name;

  if (isLoading) {
    return <Loading fullScreen={true} message="Loading invoice..." />;
  }

  if (isError) {
    const statusCode = (error as any)?.response?.status;
    return <Error statusCode={statusCode} fullScreen={true} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Action Buttons - Hidden saat print */}
      <div className="max-w-4xl mx-auto mb-6 print:hidden">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-[#1e1e1e]">Invoice</h1>
          <div className="flex gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-2 rounded-lg font-medium text-white bg-[#37393d] hover:bg-[#2c2e33] transition-all"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="#fff"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Invoice Content - Yang akan di-print */}
      <div
        ref={contentRef}
        className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none"
      >
        {/* Header Invoice */}
        <div className="border-b-2 border-[#37393d] p-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-[#37393d] mb-2">
                INVOICE
              </h2>
              <p className="text-sm text-gray-600">
                No: {transactions?.out_no}
              </p>
              <p className="text-sm text-gray-600">
                Tanggal: {formatTanggal(String(transactions?.out_date))}
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-xl capitalize font-bold text-[#37393d]">
                {storeName}
              </h3>
              <p className="text-sm text-gray-600 mt-2">{storeAddress}</p>
              <p className="text-sm text-gray-600">{storeBranch}</p>
              <p className="text-sm text-gray-600">Telp: (021) 1234-5678</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mt-2 border-t border-gray-200">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Kepada:</p>
                <p className="font-semibold text-[#1e1e1e]">
                  {transactions?.cust_name || "Umum"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Table Items */}
        <div className="px-8 py-4">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-300">
                <th className="text-left py-3 px-2 font-semibold text-[#37393d]">
                  Produk
                </th>
                <th className="text-center py-3 px-2 font-semibold text-[#37393d]">
                  Qty
                </th>
                <th className="text-right py-3 px-2 font-semibold text-[#37393d]">
                  Harga
                </th>
                <th className="text-right py-3 px-2 font-semibold text-[#37393d]">
                  Diskon
                </th>
                <th className="text-right py-3 px-2 font-semibold text-[#37393d]">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions?.details.map((item, index) => (
                <tr key={index} className="border-b border-gray-200">
                  <td className="py-4 px-2">
                    <div>
                      <p className="font-medium text-[#1e1e1e]">
                        {item.mtrl_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.mtrl_desc}
                      </p>
                    </div>
                  </td>
                  <td className="text-center py-4 px-2 text-[#1e1e1e]">
                    {item.qty} {item.satuan}
                  </td>
                  <td className="text-right py-4 px-2 text-[#1e1e1e]">
                    {formatCurrency(String(item.sell_price))}
                  </td>
                  <td className="text-right py-4 px-2 text-[#ef4444]">
                    {item.discount > 0
                      ? `-${formatCurrency(String(item.discount))}`
                      : "-"}
                  </td>
                  <td className="text-right py-4 px-2 font-medium text-[#1e1e1e]">
                    {formatCurrency(String(item.subtotal))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary */}
        <div className="px-8 pb-8">
          <div className="flex justify-end">
            <div className="w-full md:w-1/2 space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Total Harga:</span>
                <span>{formatCurrency(String(transactions?.total_price))}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Diskon Total:</span>
                <span className="text-[#ef4444]">
                  -{formatCurrency(String(transactions?.discount_total))}
                </span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>PPN:</span>
                <span>{formatCurrency(String(transactions?.ppn))}</span>
              </div>
              <div className="flex justify-between pt-3 border-t-2 border-gray-300 text-lg font-bold text-[#37393d]">
                <span>Grand Total:</span>
                <span>{formatCurrency(String(transactions?.grand_total))}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-700">Total Bayar:</span>
                <span className="font-semibold text-[#1e1e1e]">
                  {formatCurrency(String(transactions?.totalbayar))}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Kembalian:</span>
                <span className="font-semibold text-[#1e1e1e]">
                  {formatCurrency(String(transactions?.kembalian))}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-8 bg-gray-50">
          <div className="text-center text-sm text-gray-600">
            <p>Terima kasih atas pembelian Anda</p>
            <p className="mt-2">
              Invoice ini dibuat secara elektronik dan sah tanpa tanda tangan
            </p>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          .print\\:hidden {
            display: none !important;
          }
          
          .print\\:shadow-none {
            box-shadow: none !important;
          }
          
          @page {
            margin: 0.5cm;
          }
        }
      `}</style>
    </div>
  );
}
