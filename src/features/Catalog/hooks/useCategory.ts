

import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../service/category.service";


export const useCategory = (email: string) => {
    return useQuery({
        queryKey: ["categories", email],
        queryFn: () => getCategories(email),
    });
};
