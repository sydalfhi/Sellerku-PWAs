// pages/NotFound.tsx
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/home", { replace: true }); // ← ini kuncinya
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Container utama */}
      <div className="max-w-md w-full space-y-8">
        {/* Animasi / Ilustrasi sederhana */}
        <div className="relative">
          <h1 className="text-[150px] md:text-[200px] font-extrabold text-[#d7d0fe]/70 leading-none select-none">
            404
          </h1>

          {/* Overlay teks */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-5xl md:text-7xl font-bold text-[#1e1e1e] mb-2">
                Oops!
              </h2>
              <p className="text-xl md:text-2xl text-[#37393d] font-medium">
                Halaman tidak ditemukan
              </p>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        <p className="text-lg text-gray-600 max-w-lg mx-auto">
          Maaf, halaman yang Anda tuju tidak tersedia atau telah dipindahkan.
        </p>

        {/* Tombol Kembali */}
        <div className="pt-6">
          <Button
            onClick={handleBack}
            className="
              inline-flex items-center justify-center
              px-8 py-4 bg-[#37393d] hover:bg-[#c5befe]
              text-white font-semibold text-lg
              rounded-full shadow-md hover:shadow-lg
              transition-all duration-300 transform hover:scale-105
              focus:outline-none focus:ring-4 focus:ring-[#d7d0fe]/40
            "
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="#fff"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Kembali ke Beranda
          </Button>
        </div>

        {/* Elemen dekoratif kecil */}
        <div className="pt-10 opacity-50">
          <p className="text-sm text-gray-500">Error 404 • Sellerku Pos</p>
        </div>
      </div>
    </div>
  );
}
