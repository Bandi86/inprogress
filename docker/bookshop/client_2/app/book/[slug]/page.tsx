import RenderBook from '@/components/home/BookList'
import { Book } from '@/types/book'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function page({ params }: { params: { slug: string } }) {
  const [book, setBook] = useState<Book>()

  useEffect(() => {
    axios.get(`http://localhost:3000/api/book/${params.slug}`).then((res) => setBook(res.data))
  }, [book])

  return (
    <>
      <RenderBook book={book} />
    </>
  )
}
