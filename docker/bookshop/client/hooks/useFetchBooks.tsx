import { useQuery } from '@tanstack/react-query'
import fetchBooks from '@/services/fetchBooks'

export const useFetchBooks = () => {
  return useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  })
}
