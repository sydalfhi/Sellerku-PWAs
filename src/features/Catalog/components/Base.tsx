import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/formatCurrency";
import {
  useTransactionStore,
  selectCartTotal,
} from "@/features/Cart/store/transactionStore";
import { useShallow } from "zustand/shallow";
import { useCategory } from "../hooks/useCategory";
import { useCategoryStore } from "../store/categoryStore";
import { useEffect, useState } from "react";
import { useCatalog } from "../hooks/useCatalog";
import type { CatalogItem } from "@/types/catalog.type";
import LoadingSpinner from "@/components/fragments/LoadingSpinner";

export default function CatalogPage() {
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");
  const email = "ytumbalkasir@gmail.com";

  // Category Store
  const { selectedCategory, setSelectedCategory } = useCategoryStore();

  const { data: categoriesData = [], isLoading: isCategoryLoading } =
    useCategory(email);

  const categories = [{ cat_id: "0", cat_name: "Semua" }, ...categoriesData];

  // Catalog
  const { data: catalogsData = [], isLoading: isCatalogLoading } = useCatalog({
    email,
    cat_id: selectedCategory.cat_id,
    mtrl_name: debouncedValue,
  });

  const products: CatalogItem[] = catalogsData;

  // Transaction Store - ambil addToCart dan cart
  const [addToCart, cart] = useTransactionStore(
    useShallow((state) => [state.addToCart, state.cart])
  );

  // Atau gunakan selector untuk performa lebih baik
  const totalBelanja = useTransactionStore(selectCartTotal);

  // Set default category
  useEffect(() => {
    setSelectedCategory({ cat_id: "0", cat_name: "Semua" });
  }, [setSelectedCategory]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  // Handler untuk add to cart
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
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Cari produk atau nama..."
              className="pl-12 pr-5 h-12 bg-white  border border-[#efecff]
                     focus-visible:ring-2 focus-visible:ring-[#d7d0fe] 
                     focus-visible:ring-offset-2 focus-visible:border-[#d7d0fe]
                     text-base placeholder:text-[#37393d]/50
                     rounded-xl  transition-all duration-200"
            />
          </div>

          {/* Tombol Scan Barcode */}
          <Link
            to="/barcode-scan"
            className="flex h-12 w-12  border border-[#efecff] items-center justify-center rounded-lg"
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
          </Link>
        </div>

        {isCategoryLoading && <LoadingSpinner />}

        {/* Kategori horizontal scroll */}
        <div className="mb-5 overflow-x-auto pb-2 no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {!isCategoryLoading &&
              categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory.cat_id === cat.cat_id
                      ? "bg-[#37393d] text-white"
                      : "bg-white text-[#37393d] hover:bg-[#37393d]/10 border border-[#efecff]"
                  }`}
                >
                  {cat.cat_name}
                </button>
              ))}
          </div>
        </div>

        {isCatalogLoading ? (
          <div className="flex justify-center items-center h-[50vh] ">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-2 font-medium">Loading...</p>
            </div>
          </div>
        ) : (
          <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
            {products &&
              products.map((product, index) => {
                // Tentukan warna berdasarkan index
                let boxStyle = {
                  backgroundColor: "#d7d0fe",
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "24px",
                };

                if (index % 3 === 1) {
                  boxStyle = {
                    backgroundColor: "#ffecba",
                    color: "#000",
                    fontWeight: "bold",
                    fontSize: "24px",
                  };
                } else if (index % 3 === 2) {
                  boxStyle = {
                    backgroundColor: "#37393d",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "24px",
                  };
                }

                return (
                  <div
                    key={product.mtrl_code}
                    className="bg-white rounded-xl overflow-hidden border border-[#efecff] cursor-pointer flex hover:shadow-md transition"
                    onClick={() => handleAddToCart(product)}
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
                            {product.mtrl_name}
                          </h3>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {product.cat_name}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {product.sell_price === "0"
                              ? "Gratis"
                              : `${formatCurrency(product.sell_price)}`}
                            <span className="text-xs text-gray-500 ml-1">
                              / {product.satuan}
                            </span>
                          </p>
                        </div>

                        <div className="flex flex-col items-end gap-1 shrink-0">
                          <p
                            className={`text-xs font-medium ${
                              Number(product.stock) > 0
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            Stok: {product.stock}
                          </p>
                          {Number(product.stock) === 0 && (
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
        )}
      </section>

      {/* Bottom bar jika ada barang di keranjang */}
      {cart.length > 0 && (
        <footer className="fixed md:w-[80vw] lg:w-[70vw] mx-auto bottom-18 left-0 right-0 bg-white border-t border-[#efecff] px-4 py-3 z-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Belanja</p>
              <p className="text-xl font-bold text-[#1e1e1e]">
                {formatCurrency(String(totalBelanja))}
              </p>
            </div>
            <Link to="/cart">
              <Button className="bg-[#d7d0fe] hover:bg-[#c5befe] text-[#1e1e1e] font-semibold px-8 rounded-full">
                + Keranjang ({cart.length})
              </Button>
            </Link>
          </div>
        </footer>
      )}
    </div>
  );
}
