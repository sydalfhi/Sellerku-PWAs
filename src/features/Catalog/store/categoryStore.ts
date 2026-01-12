import type { Category } from "@/types/category.type";
import { create } from "zustand";


interface CategoryState {
  selectedCategory: Category;
  setSelectedCategory: (category: Category) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  selectedCategory: {
    cat_id: "0",
    cat_name: "Semua",
  },
  setSelectedCategory: (category) =>
    set({ selectedCategory: category }),
}));
