import { create } from 'zustand';
import { Cart } from '@/types/cart';
import { Book } from '@/types/book';

// Define the interface of the Cart state
interface State {
  cart: Cart[]; 
  total_items: number;
  total_price: number;
}

// Define the interface of the actions that can be performed in the Cart
interface Actions {
  addToCart: (book: Book) => void;  
  removeFromCart: (book: Book) => void;
}

// Initialize a default state
const INITIAL_STATE: State = {
  cart: [],
  total_items: 0,
  total_price: 0,
};

// Create the store with Zustand, combining the status interface and actions
export const useCartStore = create<State & Actions>((set, get) => ({
  cart: INITIAL_STATE.cart,
  total_items: INITIAL_STATE.total_items,
  total_price: INITIAL_STATE.total_price,
  addToCart: (book: Book) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.cart_id === book.book_id);

    // If the item already exists in the Cart, increase its quantity
    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.cart_id === book.book_id ? { ...item, quantity: (item.quantity as number) + 1 } : item
      ) as Cart[]; // Cast updatedCart to Cart[] type

      set((state) => ({
        cart: updatedCart,
        total_items: state.total_items + 1,
        total_price: state.total_price + book.price,
      }));
    } else {
      const updatedCart = [...cart, { ...book, quantity: 1 }] as Cart[]; // Cast updatedCart to Cart[] type

      set((state) => ({
        cart: updatedCart,
        total_items: state.total_items + 1,
        total_price: state.total_price + book.price,
      }));
    }
  },
  removeFromCart: (book: Book) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.cart_id !== book.book_id),
      total_items: state.total_items - 1,
      total_price: state.total_price - book.price,
    }));
  },
}));

export default useCartStore;
