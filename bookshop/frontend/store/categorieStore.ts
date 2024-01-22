import { Category } from '@/types/category'
import { create } from 'zustand'

type CategoryStore = {
  categories: Category[];
  setCategories: (categories: Category[]) => void;
};

const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  setCategories: (categories) => set({ categories }),
}));

export default useCategoryStore