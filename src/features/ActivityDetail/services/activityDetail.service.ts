import axiosInstance from "@/api/axiosInstance";

export interface ActivityItem {
    barcode: string;
    mtrl_code: string;
    mtrl_name: string;
    mtrl_desc: string;
    satuan: string;
    qty: number;
    buy_price: number;
    sell_price: number;
    discount: number;
    subtotal: number;
}

export interface ActivityDetail {
    out_no: string;
    out_date: string;
    cust_id: string;
    cust_name: string;
    details: ActivityItem[];
    total_price: number;
    discount_total: number;
    ppn: number;
    grand_total: number;
    kembalian: number;
    totalbayar: number;
    is_pending: string;
    status?: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

export const getActivityDetail = async ({
    email,
    outNo
}: {
    email: string;
    outNo?: string;
}): Promise<ActivityDetail> => {
    const response = await axiosInstance.get<ApiResponse<ActivityDetail>>(
        "/trans/view-transaksi",
        {
            params: {
                email,
                out_no: outNo,
            },
        }
    );



    if (!response.data.success) {
        throw new Error("API returned an unsuccessful response");
    }

    const activity = response.data.data;

    // Konversi string ke number untuk field numerik
    const details = activity.details.map(item => ({
        ...item,
        qty: Number(item.qty),
        buy_price: Number(item.buy_price),
        sell_price: Number(item.sell_price),
        discount: Number(item.discount),
        subtotal: Number(item.subtotal)
    }));

    return {
        ...activity,
        details,
        total_price: Number(activity.total_price),
        discount_total: Number(activity.discount_total),
        ppn: Number(activity.ppn),
        grand_total: Number(activity.grand_total),
        kembalian: Number(activity.kembalian),
        totalbayar: Number(activity.totalbayar),
    };
};
