import { booksApi, categoriesApi } from '@/constants/api'
import axios from 'axios'
import { Book } from '@/types/book'
import { Category } from '@/types/category'
import { Cart } from '@/types/cart'
import { cartApi } from '@/constants/api'

const fetchBooks = async (setBooks: (books: Book[]) => void) => {
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

const fetchCategories = async (
  setCategories: (categories: Category[]) => void
) => {
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

const fetchCart = async (setCart: (cart: Cart[]) => void) => {
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

export { fetchBooks, fetchCategories, fetchCart }
