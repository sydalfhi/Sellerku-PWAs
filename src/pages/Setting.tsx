// components/SettingsPage.tsx

import Tabbar from "@/components/fragments/Tabbar";
import { Link } from "react-router-dom";

export default function SettingsPage() {
  return (
    <div className="min-h-screen  relative">
      <Tabbar />
      {/* Main Content */}
      <main className="flex-1 px-4 pt-6">
        <div className="max-w-md mx-auto space-y-3">
          {/* Menu Items */}
          <div className="bg-white rounded-2xl overflow-hidden border border-[#efecff]">
            <button className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-[#f9f8fd] transition-colors border-b border-[#efecff]">
              <div>
                <p className="font-medium text-[#1e1e1e]">Akun</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  Ubah nama, email, nomor telepon
                </p>
              </div>
              <span className="text-[#d7d0fe] text-xl">›</span>
            </button>

            <button className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-[#f9f8fd] transition-colors border-b border-[#efecff]">
              <div>
                <p className="font-medium text-[#1e1e1e]">Keamanan Akun</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  Kata sandi, PIN, login biometrik
                </p>
              </div>
              <span className="text-[#d7d0fe] text-xl">›</span>
            </button>

            <button className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-[#f9f8fd] transition-colors border-b border-[#efecff]">
              <div>
                <p className="font-medium text-[#1e1e1e]">Pusat Bantuan</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  FAQ, hubungi support, panduan
                </p>
              </div>
              <span className="text-[#d7d0fe] text-xl">›</span>
            </button>

            <button className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-[#f9f8fd] transition-colors border-b border-[#efecff]">
              <div>
                <p className="font-medium text-[#1e1e1e]">Versi Aplikasi</p>
                <p className="text-sm text-gray-600 mt-0.5">
                  Versi 1.2.3 (Build 20250108) • Terakhir diperbarui 8 Januari
                  2026
                </p>
              </div>
              <span className="text-[#d7d0fe] text-xl">›</span>
            </button>

            <button className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-[#f9f8fd] transition-colors">
              <div>
                <p className="font-medium text-[#1e1e1e]">
                  Install App ke Layar Utama
                </p>
                <p className="text-sm text-gray-600 mt-0.5">
                  Tambahkan ke home screen untuk akses cepat
                </p>
              </div>
              <span className="text-[#d7d0fe] text-xl">›</span>
            </button>
          </div>

          {/* Tombol Logout */}
          <div className="pt-4">
            <Link to="/">
              <button className="w-full bg-white text-red-600 font-medium py-4 rounded-2xl border border-red-100 hover:bg-red-50 transition-colors">
                Keluar dari Akun
              </button>
            </Link>
          </div>

          {/* Info tambahan kecil di bawah */}
          <p className="text-center text-xs text-gray-500 mt-6">
            © 2026 Kasir App • Semua hak cipta dilindungi
          </p>
        </div>
      </main>

      {/* Optional: Bottom safe area untuk mobile */}
      <div className="h-6 bg-transparent" />
    </div>
  );
}
