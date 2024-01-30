import axios from 'axios'
import { Book } from '@/types/book'

const fetchBooks = async (): Promise<Book[]> => {
  const res = await axios.get('http://localhost:8000/api/books')
  const data = res.data
  return data as Book[]
}

export default fetchBooks
