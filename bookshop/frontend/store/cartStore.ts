import { create } from 'zustand'
import { Cart } from '@/types/cart'


export type CartStore = {
  cartItems: Cart[]
  setCart: (cartItems: Cart[]) => void
}

const useCartStore = create<CartStore>((set) => {
  return {
    cartItems: [],
    setCart: (cartItems: Cart[]) => {
      set({ cartItems })
    },
  }
})

export default useCartStore
