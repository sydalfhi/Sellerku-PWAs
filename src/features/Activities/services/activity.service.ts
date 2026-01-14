import axiosInstance from "@/api/axiosInstance"
import type { Activity, ActivityResponse } from "@/types/activity.types"

export const getActivities = async (
  { email, status }: { email: string, status: 0 | 1 }
): Promise<Activity[]> => {
  try {
    const response = await axiosInstance.get<ActivityResponse>(
      `/trans?email=${email}&is_pending=${status}`
    )

    if (response.data.success && response.data.data) {
      return response.data.data
    }


    return []
  } catch (error: any) {

    if (error.response?.data?.metadata?.code === 404) {
      return []
    }

    throw error
  }
}