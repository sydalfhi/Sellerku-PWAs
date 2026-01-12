
import { useQuery } from "@tanstack/react-query";
import { getCatalog } from "../service/catalog.service";
import type { CatalogItem, CatalogParams } from "@/types/catalog.type";


export const useCatalog = (params: CatalogParams) => {
  return useQuery<CatalogItem[]>({
    queryKey: ["catalog", params.email, params.cat_id, params.mtrl_name, params.mtrl_code, params.barcode],
    queryFn: () => getCatalog(params),
    enabled: !!params.email,
  });
};
