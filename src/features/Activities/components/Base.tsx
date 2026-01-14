import { formatTanggal } from "@/utils/dateFormate";
import { Link } from "react-router-dom";
import { useActivity } from "../hooks/useActivity";
import { useTransactionStatus } from "../store/useTransactionStatus";
import type { Activity } from "@/types/activity.types";
import Loading from "@/components/fragments/Loadin";
import Error from "@/components/fragments/Error";
import DebugStringify from "@/components/fragments/DebugStringify";

export default function ActivityBase() {
  const { status, setStatus } = useTransactionStatus();
  const {
    data: transactions = [],
    isLoading,
    isError,
    error,
  } = useActivity({
    email: "testingkasir@gmail.com",
    status,
  });

  const categories = [
    { label: "Selesai", value: 0 },
    { label: "Pending", value: 1 },
  ] as const;

  // Group berdasarkan tanggal
  const grouped: Record<string, Activity[]> = {};
  transactions.forEach((tx) => {
    const date = tx.out_date;
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(tx);
  });

  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const iconBgColors = ["#d7d0fe", "#ffecba", "#efecfa", "#ffffff"]; // urutan warna yang ingin dipakai

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error customMessage={`${error.message}`} />
  ) : (
    <div className="p-4 md:p-6 mb-32 min-h-screen">
      <section>
        <div className="">
          <div className="flex justify-start">
            <h3 className="text-xl font-semibold text-[#1e1e1e] mb-2">
              Riwayat Transaksi
            </h3>
          </div>

          <div className="mb-5 overflow-x-auto pb-2 no-scrollbar">
            <div className="flex gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => setStatus(cat.value)}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors
            ${
              status === cat.value
                ? "bg-[#37393d] text-white"
                : "bg-white text-[#37393d] hover:bg-[#37393d]/10 border border-[#efecff]"
            }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {!sortedDates && (
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-300 font-medium text-lg">
                Tidak ada transaksi
              </p>
            </div>
          )}

          {sortedDates &&
            sortedDates.map((date) => {
              const formattedDate = formatTanggal(date);
              const txs = grouped[date];

              return (
                <div key={date} className="mt-6">
                  <h4 className="text-lg font-medium text-[#37393d] mb-3">
                    {formattedDate}
                  </h4>

                  <div className="space-y-2">
                    {txs.map((tx, i) => (
                      <div
                        key={tx.out_no}
                        className="rounded-full p-1.5 bg-[#f9f8fd] focus:bg-white focus:scale-105 transition-all cursor-pointer duration-200"
                      >
                        <Link to={`/activity/${tx.out_no}`}>
                          <div className="flex items-center">
                            {/* Icon kiri */}
                            <div className="mr-3">
                              <div
                                className="rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                                style={{
                                  backgroundColor:
                                    iconBgColors[i % iconBgColors.length],
                                }}
                              >
                                <span className="text-2xl font-bold">⌘</span>
                              </div>
                            </div>

                            {/* Text tengah */}
                            <div className="flex-1">
                              <p className="text-foreground font-medium text-lg">
                                {tx.cust_name}
                              </p>
                              <p className="text-sm font-light text-[#37393d/70]">
                                {tx.out_no}
                              </p>
                            </div>

                            {/* Action kanan */}
                            <div className="ml-3">
                              <div className="rounded-full h-12 flex items-center justify-center">
                                <span className="text-foreground text-xl font-bold">
                                  <p className="text-sm text-[#37393d]">
                                    Rp{" "}
                                    {Number(tx.grand_total).toLocaleString(
                                      "id-ID"
                                    )}
                                  </p>
                                </span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </section>
    </div>
  );
}
