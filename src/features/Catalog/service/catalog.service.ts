
import axiosInstance from "@/api/axiosInstance";
import type { CatalogItem, CatalogParams, GetCatalogResponse } from "@/types/catalog.type";


export const getCatalog = async (
  params: CatalogParams
): Promise<CatalogItem[]> => {
  try {
    const response = await axiosInstance.get<GetCatalogResponse>(
      "/kasir",
      {
        params,
      }
    );

    if (response.data.success) {
      return response.data.data;
    }

    throw new Error("Gagal mengambil katalog");
  } catch (error) {
    console.error("getCatalog error:", error);
    throw error;
  }
};
