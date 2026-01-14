import axiosInstance from "@/api/axiosInstance";
import type { GetRecentActivityResponse, Transaction } from "@/types/recentActivity.type";



export const getRecentActivity = async (
  email: string
): Promise<Transaction[]> => {
  try {
    const response = await axiosInstance.get<GetRecentActivityResponse>(
      `/trans/transnew?email=${email}`
    );

    if (response.data.success) {
      return response.data.data;
    }

    throw new Error("Gagal mengambil Data Transaksi");
  } catch (error) {
    console.error("getRecentActivity error:", error);
    throw error;
  }
};

