import { useQuery } from "@tanstack/react-query";
import { getActivityDetail } from "../services/activityDetail.service";



export const useActivityDetail = (outNo: string) => {
    return useQuery({
        queryKey: ["activity_detail", outNo],
        queryFn: () => getActivityDetail(outNo),
    });
};
