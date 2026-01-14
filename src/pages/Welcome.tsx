import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/home");
  };

  return (
    <div className="h-screen -mt-20 md:mt-0 overflow-hidden relative bg-linear-to-br from-[#efecfa] via-[#ffffff] to-[#d7d0fe]">
      {/* Background elements - lebih sederhana */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-linear-to-r from-[#d7d0fe] to-[#ffecba] opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-linear-to-r from-[#ffecba] to-[#efecfa] opacity-20 blur-3xl"></div>
      </div>

      <div className="relative  z-10 h-full flex items-center justify-center px-4">
        <div className="max-w-6xl w-full">
          {/* Konten utama - semua dalam satu layar */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left side - Teks dan tombol */}
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                <span className="block text-[#1e1e1e]">Solusi Kasir</span>
                <span className="block text-[#37393d] bg-clip-text">
                  Modern & Cepat
                </span>
              </h1>

              <p className="text-lg text-[#37393d] mb-6 leading-relaxed">
                <span className="font-semibold text-[#1e1e1e]">
                  Sellerku POS
                </span>{" "}
                adalah aplikasi kasir yang dirancang khusus untuk membantu Anda
                mengelola transaksi dengan mudah dan efisien.
              </p>

              {/* Tombol utama */}
              <button
                onClick={handleGetStarted}
                className="cursor-pointer group relative px-8 py-4 bg-[#37393d] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 w-full md:w-auto"
              >
                <span className="relative flex items-center justify-center text-white">
                  Mulai Menggunakan POS
                  <svg
                    className="w-5 h-5 ml-3 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    stroke="#fff"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>

              {/* Info tambahan kecil */}
              <div className="mt-6 flex items-center justify-center md:justify-start">
                <div className="w-8 h-8 rounded-full bg-[#efecfa] flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-[#37393d]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-[#37393d]">
                  <span className="font-semibold">Aman & Terpercaya</span> •
                  Digunakan 10.000+ bisnis
                </p>
              </div>
            </div>

            {/* Right side - Visual mockup */}
            <div className="lg:w-1/2 flex justify-center absolute -z-10 opacity-40 rotate-12 scale-125">
              <div className="relative w-full max-w-md">
                {/* Main mockup card */}
                <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-[#efecfa]">
                  {/* Header mockup */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-linear-to-r from-[#d7d0fe] to-[#ffecba]"></div>
                      <div className="ml-3">
                        <div className="w-20 h-3 bg-[#efecff] rounded-full"></div>
                        <div className="w-16 h-2 bg-[#efecff] rounded-full mt-1"></div>
                      </div>
                    </div>
                    <div className="w-12 h-6 bg-linear-to-r from-[#ffecba] to-[#ff7075] rounded-lg"></div>
                  </div>

                  {/* Transaction section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="w-24 h-4 bg-[#efecff] rounded-full"></div>
                      <div className="w-16 h-6 bg-[#d7d0fe] rounded-lg"></div>
                    </div>

                    {/* Product items */}
                    <div className="space-y-3 mb-6">
                      {[1, 2, 3].map((item) => (
                        <div
                          key={item}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-[#efecfa] rounded-lg"></div>
                            <div className="ml-3">
                              <div className="w-24 h-3 bg-[#efecff] rounded-full"></div>
                              <div className="w-16 h-2 bg-[#efecff] rounded-full mt-1"></div>
                            </div>
                          </div>
                          <div className="w-12 h-6 bg-[#ffecba] rounded-lg"></div>
                        </div>
                      ))}
                    </div>

                    {/* Total section */}
                    <div className="pt-4 border-t border-[#efecfa]">
                      <div className="flex justify-between items-center">
                        <div className="w-16 h-4 bg-[#37393d] rounded-full"></div>
                        <div className="w-20 h-6 bg-linear-to-r from-[#ff7075] to-[#d7d0fe] rounded-lg"></div>
                      </div>
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="h-10 bg-[#efecfa] rounded-lg"></div>
                    <div className="h-10 bg-linear-to-r from-[#d7d0fe] to-[#ff7075] rounded-lg"></div>
                  </div>
                </div>

                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-xl bg-linear-to-br from-[#ffecba] to-[#ffffff] opacity-80 shadow-lg rotate-6"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-linear-to-br from-[#d7d0fe] to-[#efecfa] opacity-70 shadow-lg -rotate-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
