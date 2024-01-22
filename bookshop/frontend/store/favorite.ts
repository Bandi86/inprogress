import { create } from 'zustand'
import { Favorite } from '@/types/favorite';

type FavoriteStore = {
  favorites: Favorite[];
  setFavorites: (favorites: Favorite[]) => void;
};

const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: [],
  setFavorites: (favorites) => set({ favorites }),
}));

export default useFavoriteStore



