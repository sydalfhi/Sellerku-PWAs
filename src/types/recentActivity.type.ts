// Tipe untuk detail setiap item di transaksi
export interface TransactionDetail {
    // isi sesuai data yang ada di details, contoh:
    item_name?: string;
    qty?: string;
    price?: string;
    // tambahkan properti lainnya sesuai API
}

// Tipe untuk satu transaksi
export interface Transaction {
    cust_id: string;
    cust_name: string;
    details: TransactionDetail[];
    discount_total: string;
    grand_total: string;
    is_pending: string;
    out_date: string;
    out_no: string;
    ppn: string;
    status: string;
    total_price: string;
    iconColor?: string
}

// Tipe response dari API
export interface GetRecentActivityResponse {
    success: boolean;
    data: Transaction[];
}
