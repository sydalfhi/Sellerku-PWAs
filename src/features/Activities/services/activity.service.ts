import axiosInstance from "@/api/axiosInstance"
import type { Activity, ActivityResponse } from "@/types/activity.types"

export const getActivities = async (
  { email, status }: { email: string, status: 0 | 1 }
): Promise<Activity[]> => {
  try {
    const response = await axiosInstance.get<ActivityResponse>(
      `/trans?email=${email}&is_pending=${status}`
    )

    // Cek apakah success dan ada data
    if (response.data.success && response.data.data) {
      return response.data.data
    }

    // Jika tidak success atau data kosong, return array kosong
    return []
  } catch (error: any) {
    // Handle error response (404, dll)
    if (error.response?.data?.metadata?.code === 404) {
      return [] // Return empty array untuk data tidak ditemukan
    }

    throw error
  }
}