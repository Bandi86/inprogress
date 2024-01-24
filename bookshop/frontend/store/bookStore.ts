import { create } from 'zustand'
import { Book } from '../types/book'

export type BookStore = {
  books: Book[]
  setBooks: (books: Book[]) => void
  clearBooks: () => void
 
}

const useBookStore = create<BookStore>((set) => {
  return {
    books: [],
    setBooks: (books: Book[]) => {
      set({ books })
    },
    clearBooks: () => {
      set({ books: [] })
    },   
  }
})

export default useBookStore
