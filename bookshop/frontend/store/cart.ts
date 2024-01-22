import { create } from 'zustand'
import { Cart } from '@/types/cart';

type CartStore = {
  cart: Cart[];
  setCart: (cart: Cart[]) => void;
};

const useCartStore = create<CartStore>((set) => ({
  cart: [],
  setCart: (cart) => set({ cart }),
}));

export default useCartStore