// components/CatalogPage.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MockProducts } from "@/_mock/product";
import { Link } from "react-router-dom";

export default function CatalogBase() {
  const products = [...MockProducts, ...MockProducts, ...MockProducts];

  return (
    <div className="min-h-screen flex flex-col mb-40">
      {/* Main Content */}
      <section className="flex-1 flex flex-col px-4 pt-4 pb-24">
        {/* Search + Scan Button */}
        <div className="flex items-center gap-3 mb-6">
          {/* Search Input dengan Icon SVG */}
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#37393d]/60 pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            <Input
              type="text"
              placeholder="Cari produk atau nama..."
              className="pl-12 pr-5 h-12 bg-white  border border-[#efecff]
                     focus-visible:ring-2 focus-visible:ring-[#d7d0fe] 
                     focus-visible:ring-offset-2 focus-visible:border-[#d7d0fe]
                     text-base placeholder:text-[#37393d]/50
                     rounded-xl  transition-all duration-200"
            />
          </div>

          {/* Tombol Scan Barcode */}
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12  border
                   hover:bg-[#d7d0fe]/10 hover:border-[#d7d0fe] 
                   text-[#37393d] transition-all duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 7V5a2 2 0 0 1 2-2h2" />
              <path d="M17 3h2a2 2 0 0 1 2 2v2" />
              <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
              <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
              <path d="M7 12h1" />
              <path d="M9 12h2" />
              <path d="M12 12h1" />
              <path d="M14 12h2" />
              <path d="M17 12h1" />
              <path d="M5 8v8" />
              <path d="M19 8v8" />
              <path d="M8 5v14" />
              <path d="M16 5v14" />
            </svg>
          </Button>
        </div>

        {/* Kategori horizontal scroll */}
        <div className="mb-5 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {["Semua", "Burger", "Minuman", "Hot Dog", "Pizza", "Lainnya"].map(
              (cat, i) => (
                <button
                  key={cat}
                  className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    i == 0
                      ? "bg-[#37393d] text-white"
                      : "bg-white text-[#37393d] hover:bg-[#37393d]/10 border border-[#efecff]"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>
        </div>

        {/* List Produk Vertikal */}
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => {
            // Tentukan warna berdasarkan index
            let boxStyle = {
              backgroundColor: "#d7d0fe", // default ungu
              color: "#000", // default text color
              fontWeight: "bold",
              fontSize: "24px",
            };

            if (index % 3 === 1) {
              boxStyle = {
                backgroundColor: "#ffecba",
                color: "#000",
                fontWeight: "bold",
                fontSize: "24px",
              }; // kuning
            } else if (index % 3 === 2) {
              boxStyle = {
                backgroundColor: "#37393d",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "24px",
              }; // gelap, text putih
            }

            return (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-[#efecff] cursor-pointer flex  "
              >
                {/* Kotak di kiri dengan warna dinamis */}
                <div
                  className="w-12 font-semibold flex justify-center items-center"
                  style={boxStyle}
                >
                  ⌘
                </div>

                {/* Info produk */}
                <div className="p-4 flex-1 flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-[#1e1e1e] text-base leading-tight">
                        {product.cat_name}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {product.sell_price == 0
                          ? "Gratis"
                          : `Rp ${product.sell_price.toLocaleString("id-ID")}`}
                        <span className="text-xs text-gray-500 ml-1">
                          / {product.satuan}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <p className="text-xs text-green-600 font-medium">
                        Stok: {product.stock}
                      </p>
                      {product.qty > 0 && (
                        <span className="text-xs font-light text-[#f57772]">
                          habis
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom bar fixed */}
      {true && (
        <footer className="fixed bottom-18 left-0 right-0 bg-white border-t border-[#efecff] px-4 py-3 z-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Belanja</p>
              <p className="text-xl font-bold text-[#1e1e1e]">Rp 0</p>
            </div>
            <Link to="/cart">
              <Button className="bg-[#d7d0fe] hover:bg-[#c5befe] text-[#1e1e1e] font-semibold px-8 rounded-full">
                + Keranjang
              </Button>
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
}
