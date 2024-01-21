import { Category } from '@/types/category'
import { create } from 'zustand'

export type CategoryStore = {
  categories: Category | null
  setCategories: (categories: Category) => void
  clearCategories: () => void | null
}

const useCategoryStore = create<CategoryStore>((set) => {
  return {
    categories: null as Category | null, 
    setCategories: (categories: Category | null) => {
      set({ categories });
    },
    clearCategories: () => {
      set({ categories: null });
    },
  }
})

export default useCategoryStore