import axiosInstance from "@/api/axiosInstance";
import type { Category, GetCategoriesResponse } from "@/types/category.type";


export const getCategories = async (
  email: string
): Promise<Category[]> => {
  try {
    const response = await axiosInstance.get<GetCategoriesResponse>(
      `/kasir/category`,
      {
        params: { email },
      }
    );

    if (response.data.success) {
      return response.data.data.category;
    }

    throw new Error("Gagal mengambil kategori");
  } catch (error) {
    console.error("getCategories error:", error);
    throw error;
  }
};
