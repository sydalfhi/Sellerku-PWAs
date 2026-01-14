import { useQuery } from "@tanstack/react-query";
import { getActivityDetail } from "../services/activityDetail.service";



export const useActivityDetail = ({ email, outNo }: { email: string, outNo: string | undefined }) => {
    return useQuery({
        queryKey: ["activity_detail", email, outNo],
        queryFn: () => getActivityDetail({ email, outNo }),
    });
};
