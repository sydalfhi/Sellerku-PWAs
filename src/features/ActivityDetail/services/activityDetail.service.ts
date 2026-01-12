import axiosInstance from "@/api/axiosInstance";


export interface ActivityDetail {
    out_no: string;
    out_date: string;
    cust_id: string;
    cust_name: string;
    total_price: string;
    items: { name: string; qty: number; price: number }[]; // contoh detail barang
    // tambahkan field lain sesuai response API
}

interface ApiResponse<T> {
    data: T;
}

export const getActivityDetail = async (

    out_no: string
): Promise<ActivityDetail> => {
    const response = await axiosInstance.get<ApiResponse<ActivityDetail>>(
        "/trans",
        {
            params: {
                email: "testingkasir@gmail.com",
                out_no: out_no,
            },
        }
    );

    const activity = response.data?.data;

    if (!activity || typeof activity !== "object") {
        throw new Error("Invalid API response: data is not an object");
    }

    return activity;
};
