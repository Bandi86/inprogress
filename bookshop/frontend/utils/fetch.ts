import { booksApi, cartApi, categoriesApi } from '@/constants/api'
import axios from 'axios'
import { Book } from '@/types/book'
import { Category } from '@/types/category'
import { Cart } from '@/types/cart'

export const rootFetch = async ({
  setBooks,
  setCategories,
  setCart,
}: {
  setBooks: (books: Book[]) => void
  setCategories: (categories: Category[]) => void
  setCart: (cart: Cart[]) => void
}) => {
  const fetchBooks = async () => {
    try {
      console.log('Fetching books...')
      const res = await axios.get(booksApi)

      if (res.status !== 200) {
        throw new Error('Error while fetching books')
      } else {
        setBooks(res.data.books)
        console.log('Books fetched successfully:', res.data.books)
      }
    } catch (error) {
      console.error('Error fetching books:', error)
    }
  }

  const fetchCategories = async () => {
    try {
      console.log('Fetching categories...')
      const res = await axios.get(categoriesApi)
      console.log('Response from categories API:', res)

      if (res.status !== 200) {
        throw new Error('Error while fetching categories')
      } else {
        setCategories(res.data.categories)
        console.log('Categories fetched successfully:', res.data.categories)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  // fetch cart
  const fetchCart = async () => {
    try {
      console.log('Fetching cart...')
      const res = await axios.get(cartApi)
      console.log('Response from cart API:', res)

      if (res.status !== 200) {
        throw new Error('Error while fetching cart')
      } else {
        setCart(res.data.cart)
        console.log('Cart fetched successfully:', res.data.cart)
      }
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  try {
    await Promise.all([fetchBooks(), fetchCategories(), fetchCart()])
    console.log('Data fetching completed successfully')
  } catch (error) {
    console.error('Error during data fetching:', error)
  }
}
