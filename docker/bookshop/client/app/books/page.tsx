import BookList from '@/components/home/BookList'
import Error from '@/components/home/Error'
import Loading from '@/components/home/Loading'
import { useFetchBooks } from '@/hooks/useFetchBooks'

export default function BooksPage() {
  const { data: books, isFetching, error } = useFetchBooks()

  return (
    <div>
      <h1>Books</h1>
      {isFetching && <Loading />}
      {error && <Error />}
      {books && <BookList books={books} />}
    </div>
  )
}
