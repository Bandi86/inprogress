import { fetchBooks, fetchCategories } from './fetch'
import useBookStore from '@/store/bookStore'
import useCategoryStore from '@/store/categorieStore'

export async function getServerSideProps() {
  const { books, setBooks } = useBookStore()
  const { categories, setCategories } = useCategoryStore()

  const initialBooks = await fetchBooks(setBooks)
  const initialCategories = await fetchCategories(setCategories)

  return {
    props: {
      initialBooks,
      initialCategories,
    },
  }
}
