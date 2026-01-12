
export interface CatalogItem {
  mtrl_code: string;
  barcode: string;
  mtrl_hash: string;
  mtrl_name: string;
  mtrl_desc: string;
  perhitungan_stock: string;
  type_id: string;
  type_name: string;
  cat_id: string;
  cat_name: string;
  satuan: string;
  buy_price: string;
  sell_price: string;
  grosir_price: string;
  stock: string;
}

export interface GetCatalogResponse {
  success: boolean;
  data: CatalogItem[];
}

export interface CatalogParams {
  email: string;
  mtrl_code?: string;
  barcode?: string;
  mtrl_name?: string;
  cat_id?: string;
}
