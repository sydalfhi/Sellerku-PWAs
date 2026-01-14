import axiosInstance from "@/api/axiosInstance";
import type { GetRecentActivityResponse } from "@/types/recentActivity.type";



export const getRecentActivity = async (
  email: string
): Promise<[]> => {
  try {
    const response = await axiosInstance.get<GetRecentActivityResponse>(
      `/transnew/transnew`,
      {
        params: { email },
      }
    );

    if (response.data.success) {
      return response.data.data;
    }

    throw new Error("Gagal mengambil Data Transaksi");
  } catch (error) {
    console.error("getCategories error:", error);
    throw error;
  }
};
