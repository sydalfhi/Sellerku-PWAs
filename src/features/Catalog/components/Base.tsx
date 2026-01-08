// components/CatalogPage.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MockProducts } from "@/_mock/product";

export default function CatalogBase() {
  const products = [...MockProducts, ...MockProducts, ...MockProducts];

  return (
    <div className="min-h-screen flex flex-col mb-40">
      {/* Main Content */}
      <section className="flex-1 flex flex-col px-4 pt-4 pb-24">
        {/* Search + Scan Button */}
        <div className="flex items-center gap-2 mb-5">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg">
              🔍
            </span>
            <Input
              placeholder="Cari..."
              className="pl-10 bg-white border-[#d7d0fe] focus-visible:ring-[#d7d0fe] focus-visible:ring-offset-1  h-11"
            />
          </div>
          <Button
            size="icon"
            variant="outline"
            className="h-11 w-11 p-0 rounded-full"
          >
            <span className="text-xl">📷</span>
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
            };

            if (index % 3 === 1) {
              boxStyle = { backgroundColor: "#ffecba", color: "#000" }; // kuning
            } else if (index % 3 === 2) {
              boxStyle = { backgroundColor: "#37393d", color: "#fff" }; // gelap, text putih
            }

            return (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden border border-[#efecff] cursor-pointer flex  "
              >
                {/* Kotak di kiri dengan warna dinamis */}
                <div
                  className="w-6 font-semibold flex justify-center items-center"
                  style={boxStyle}
                >
                  2
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
            <Button className="bg-[#d7d0fe] hover:bg-[#c5befe] text-[#1e1e1e] font-semibold px-8 rounded-full">
              + Tambah
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}
