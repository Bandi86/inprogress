import React from 'react'
import { Book } from '@/types/book'

interface BookCardProps {
  book: Book
}

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div key={book.bookId}>
      <h2>{book.title}</h2>
      <p>{book.description}</p>
    </div>
  )
}

export default BookCard
