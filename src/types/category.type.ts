
export interface Category {
  cat_id: string;
  cat_name: string;
}

export interface GetCategoriesResponse {
  success: boolean;
  data: {
    category: Category[];
  };
}
