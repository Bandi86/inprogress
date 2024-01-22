import { booksApi, categoriesApi } from '@/constants/api'
import axios from 'axios'
import { Book } from '@/types/book'
import { Category } from '@/types/category'



export const rootFetch = async ({ setBooks, setCategories }: { setBooks: (books: Book[]) => void, setCategories: (categories: Category[]) => void }) => {
    const fetchBooks = async () => {
      try {
        console.log('Fetching books...');
        const res = await axios.get(booksApi)
  
        if (res.status !== 200) {
          throw new Error('Error while fetching books');
        } else {
          setBooks(res.data.books);
          console.log('Books fetched successfully:', res.data.books);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    }
  
    const fetchCategories = async () => {
      try {
        console.log('Fetching categories...');
        const res = await axios.get(categoriesApi);
        console.log('Response from categories API:', res);
  
        if (res.status !== 200) {
          throw new Error('Error while fetching categories');
        } else {
          setCategories(res.data.categories);
          console.log('Categories fetched successfully:', res.data.categories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
  
    try {
      await Promise.all([fetchBooks(), fetchCategories()]);
      console.log('Data fetching completed successfully');
    } catch (error) {
      console.error('Error during data fetching:', error);
    }
  }
  
