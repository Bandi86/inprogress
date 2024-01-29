import { Book } from '@/types/book'
import React from 'react'
import BookCard from './BookCard'

interface BookListProps {
  books: Book[]
}

const BookList = ({ books }: BookListProps) => {
  return (
    <div>
      {books.map((book: Book) => (
        <BookCard key={book.bookId} book={book} />
      ))}
    </div>
  )
}

export default BookList
