import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../services/activity.service";


export const useActivity = (status : 0 | 1) => {
    return useQuery({
        queryKey: ["activities", status],
        queryFn: () => getActivities(status),
    });
};
