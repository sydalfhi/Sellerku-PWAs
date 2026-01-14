import { useState } from "react";
import BarcodeScanner from "react-qr-barcode-scanner";
import { Result } from "@zxing/library";
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/api/axiosInstance";
import { useTransactionStore } from "@/features/Cart/store/transactionStore";
import { useShallow } from "zustand/shallow";
import type { CatalogItem } from "@/types/catalog.type";
import toast from "react-hot-toast";
import { getStoredUserData } from "@/utils/getStoredUser";

export default function BarcodeScanBase() {
  const [lastBarcode, setLastBarcode] = useState<string | null>(null);
  // Ambil seluruh user object
  const userData = getStoredUserData();
  const email = userData?.email || "";

  const [addToCart, _] = useTransactionStore(
    useShallow((state) => [state.addToCart, state.cart])
  );

  // Fungsi untuk menambahkan barang ke cart
  const handleAddToCart = (product: CatalogItem) => {
    addToCart(
      {
        mtrl_code: product.mtrl_code,
        mtrl_name: product.mtrl_name,
        cat_name: product.cat_name,
        sell_price: Number(product.sell_price),
        stock: Number(product.stock),
        satuan: product.satuan,
      },
      1
    );
  };

  // Hook untuk panggil API
  const scanMutation = useMutation({
    mutationFn: async (barcode: string) => {
      const response = await axiosInstance.get(
        `/kasir?email=${email}&mtrl_code=${barcode}`
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        const item: CatalogItem = data.data[0];

        // Tambahkan ke cart
        handleAddToCart(item);

        // Info alert
        toast.success("Berhasil menambahkan barang ke keranjang", {
          duration: 3000,
        });

        // MAINKAN SUARA BEEP
        const audio = new Audio("/sound/beep.mp3");
        audio.play().catch((err) => console.error("Audio play error:", err));
      } else {
        alert("Barcode tidak ditemukan di database");
      }
    },
    onError: (error) => {
      console.error("API Error:", error);
      alert("Terjadi error saat memanggil API");
    },
  });

  const handleUpdate = (err: unknown, result?: Result) => {
    if (err) {
      if ((err as any).name !== "NotFoundException2") {
        console.error(err);
      }
      return;
    }

    if (result) {
      const scannedText = (result as any).text ?? (result as any).getText?.();
      if (scannedText) {
        if (scannedText !== lastBarcode) {
          setLastBarcode(scannedText);
          scanMutation.mutate(scannedText); // panggil API

          // Reset lastBarcode setelah 1.5 detik
          setTimeout(() => {
            setLastBarcode(null);
          }, 1500); // 1500ms = 1.5 detik
        } else {
          console.warn(
            "Barcode sama dengan sebelumnya, tidak melakukan apa-apa"
          );
        }
      }
    }
  };

  return (
    <div className="relative w-full h-screen">
      <BarcodeScanner width="100%" height="100%" onUpdate={handleUpdate} />

      {/* Indikator frame scan */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[70vw] h-64 border-4 border-white rounded-lg relative">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-red-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-red-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-red-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-red-500"></div>
        </div>
      </div>
    </div>
  );
}
