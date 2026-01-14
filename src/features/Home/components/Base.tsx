import { formatTanggal } from "@/utils/dateFormate";
import { getStoredUserData } from "@/utils/getStoredUser";
import { getGreeting } from "@/utils/greeting";
import { Link } from "react-router-dom";
import { useRecentActivity } from "../hooks/useRecentActivity";
import LoadingSpinner from "@/components/fragments/LoadingSpinner";
// import { useRecentActivity } from "../hooks/useRecentActivity";

export default function HomeBase() {
  const userData = getStoredUserData();

  // const transactions = MockTransactionsActivity;
  const iconBgColors: string[] = ["#d7d0fe", "#ffecba", "#efecfa"];

  let nameCashier = userData?.emp_name ?? "Kasir";
  let greeting = getGreeting();

  const {
    data: transactions,
    isLoading,
    isError,
    error,
  } = useRecentActivity(userData?.email || "");

  return (
    <div className="p-4 md:p-6">
      {/* Salam pengguna */}
      <section className="mb-8 flex justify-between items-center">
        <div>
          <h4 className=" text-xl md:text-3xl font-semibold tracking-tight text-gray-800">
            {greeting}, {nameCashier}
          </h4>
          <p className="text-gray-500 text-base">
            Welcome to{" "}
            <span className="underline decoration-wavy underline-offset-4 decoration-primary">
              Sellerku POS
            </span>
          </p>
        </div>
        <div>
          <span className="text-xl font-bold">🧔</span>
        </div>
      </section>

      <section>
        <div>
          <div className="flex space-x-3">
            <div className=" bg-linear-to-br from-[#b8abff] to-[#d7d0fe] w-full p-3 rounded-3xl flex flex-col items-stretch ">
              <div className=" rounded-xl h-full ">
                <div className=" w-12 h-12 bg-white rounded-full text-[#242529] flex justify-center items-center">
                  🐨
                </div>
              </div>
              <div className=" mt-12 w-full pt-2 px-2 rounded-xl h-full  ">
                <h4 className=" text-[22px] md:text-3xl font-medium tracking-tight leading-tight text-[##242529]">
                  Talk With Cooper
                </h4>
                <p className="text-muted-foreground">Lets Try It Now</p>
              </div>
            </div>
            <div className="flex flex-col space-y-3 w-full">
              <div className="bg-linear-to-br from-[#ffdb7e] to-[#ffecba]  w-full p-2 rounded-3xl h-full flex flex-col relative">
                <div className="bg-[#ff7075] px-3 py-1 rounded-full flex justify-center items-center absolute -top-2 right-2">
                  <p className="text-white  text-sm">NEW</p>
                </div>
                <div className="  rounded-xl h-full ">
                  <div className=" w-12 h-12 bg-white rounded-full text-[#242529] flex justify-center items-center">
                    📧
                  </div>
                </div>
                <div className="  w-full p-2 rounded-xl h-full mb-3 ">
                  <h4 className=" text-[22px]  font-medium tracking-tight text-gray-800">
                    New Chat
                  </h4>
                </div>
              </div>
              <div className=" bg-linear-to-br from-[#3c3e42] to-[#66696e] w-full p-2 rounded-3xl h-full flex flex-col ">
                <div className="  rounded-xl h-full ">
                  <div className=" w-12 h-12 bg-white rounded-full text-[#242529] flex justify-center items-center">
                    🔎
                  </div>
                </div>
                <div className="  w-full p-2 rounded-xl h-full mb-3 ">
                  <h4 className=" text-[22px]  font-medium tracking-tight text-white leading-tight">
                    Search By Image
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mt-10">
          <div className="flex justify-between">
            <h3 className="text-xl font-semibold text-[#1e1e1e] mb-2">
              Transaksi Terakhir
            </h3>
            <Link to="/activity">
              <span className="underline decoration-wavy underline-offset-4 decoration-[#1e1e1e]">
                Show All
              </span>
            </Link>
          </div>
          <div className="space-y-2">
            {isLoading && (
              <div className="w-full min-h-25 flex flex-col items-center justify-center">
                <LoadingSpinner />
                <p className="text-gray-600 text-sm mt-2">Loading...</p>
              </div>
            )}

            {isError && (
              <div className="w-full min-h-25 flex items-center justify-center bg-red-50 p-4 rounded">
                <p className="text-red-600 text-sm">
                  {error instanceof Error
                    ? `Error: ${error.message}`
                    : "Terjadi kesalahan"}
                </p>
              </div>
            )}

            {!isLoading &&
              !isError &&
              transactions &&
              transactions.length == 0 && (
                <div className="w-full min-h-25 flex items-center justify-center bg-red-50 p-4 rounded">
                  <p className="text-[#1e1e1e] text-sm">Tidak ada transaksi</p>
                </div>
              )}

            {!isLoading &&
              !isError &&
              transactions &&
              transactions.map((item, index) => (
                <div
                  key={`${item.out_no} ${index}`}
                  className="rounded-full p-1.5 bg-[#f9f8fd] hover:bg-white hover:scale-105 transition-all cursor-pointer duration-200"
                >
                  <div className="flex items-center">
                    {/* Icon */}
                    <div className="mr-3">
                      <div
                        className="rounded-full w-12 h-12 flex items-center justify-center transition-colors"
                        style={{
                          backgroundColor:
                            iconBgColors[index % iconBgColors.length], // bergilir sesuai array
                        }}
                      >
                        <span
                          className="text-2xl font-bold"
                          style={{ color: item.iconColor }}
                        >
                          ⌘
                        </span>
                      </div>
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <p className="text-foreground font-medium">
                        {item.cust_name}
                      </p>
                      <p className="text-foreground font-light text-xs">
                        {formatTanggal(String(item.out_date))}
                      </p>
                    </div>

                    {/* Action Icon */}
                    <div className="ml-3">
                      <div className="rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-foreground text-xl font-bold">
                          ∘∘∘
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
