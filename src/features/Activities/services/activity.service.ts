import axiosInstance from "@/api/axiosInstance"
import type { Activity, ActivityResponse } from "@/types/activity.types"

export const getActivities = async (
  status: 0 | 1
): Promise<Activity[]> => {
  const response = await axiosInstance.get<ActivityResponse>(
    `/trans?email=testingkasir@gmail.com&is_pending=${status}`
  )

  return response.data.data
}
