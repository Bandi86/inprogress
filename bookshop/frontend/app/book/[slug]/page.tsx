'use client'

import RenderBook from '@/components/RenderBook'
import useBookStore from '@/store/bookStore'
import { Book } from '@/types/book'
import { fetchBooks } from '@/utils/fetch'
import { useEffect, useState } from 'react'

export default function profilePage({ params }: { params: { slug: string } }) {
  const { books, setBooks } = useBookStore()

  useEffect(() => {
    fetchBooks(setBooks)
  }, [])

  const [actualBook, setActualBook] = useState<Book>()

  useEffect(() => {
    setActualBook(books.find((book) => book.book_id === params.slug))
  }, [books])

  return (
    <>
      <RenderBook book={actualBook} />
    </>
  )
}
