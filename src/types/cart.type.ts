export type CartItem = {
  mtrl_code: string;
  mtrl_name?: string;
  cat_name: string;
  sell_price: number | string; // terima string
  qty: number;
  discountType: "percent" | "amount" | null;
  discountValue: number;
  subtotal: number;
  satuan: string;
  stock?: number;
};