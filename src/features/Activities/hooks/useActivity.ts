import { useQuery } from "@tanstack/react-query";
import { getActivities } from "../services/activity.service";

export const useActivity = ({ email, status }: { email: string, status: 0 | 1 }) => {
    return useQuery({
        queryKey: ["activities", status, email],
        queryFn: () => getActivities({ email, status }),
    });
};
