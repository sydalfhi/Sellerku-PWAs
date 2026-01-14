

import { useQuery } from "@tanstack/react-query";
import { getRecentActivity } from "../service/recentActivity.service";

export const useRecentActivity = (email: string) => {
    return useQuery({
        queryKey: ["categories", email],
        queryFn: () => getRecentActivity(email),
    });
};
