import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import Tabbar from "@/components/fragments/Tabbar";
export default function SettingsPage() {
  const [showModal, setShowModal] = useState(false);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // hapus user & isAuthenticated
    navigate("/auth/login", { replace: true });
  };

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
            <button
              onClick={() => setShowModal(true)}
              className="w-full bg-white text-red-600 font-medium py-4 rounded-2xl border border-red-100 hover:bg-red-50 transition-colors"
            >
              Keluar dari Akun
            </button>
          </div>

          {/* Info tambahan kecil di bawah */}
          <p className="text-center text-xs text-gray-500 mt-6">
            © 2026 Kasir App • Semua hak cipta dilindungi
          </p>
        </div>
      </main>

      {/* Modal Konfirmasi Logout */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-999">
          <div className="bg-white rounded-xl p-6 w-80 text-center space-y-4">
            <p className="text-gray-900 font-medium text-lg">
              Apakah Anda yakin ingin keluar?
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                Keluar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Optional: Bottom safe area untuk mobile */}
      <div className="h-6 bg-transparent" />
    </div>
  );
}
