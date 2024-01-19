import { Book } from '@/types/book'
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'

interface DataOfBooksProps {
    books: Book[]
    loading: boolean
    
}

const DataOfBooks = ({books, loading}: DataOfBooksProps) => {

    console.log(books);
    

  return (
    <section className='w-full h-screen'>
      <h1 className='text-center font-semibold p-10'>Books</h1>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books && !loading ? books?.map((book: Book) => (
                <TableRow key={book?.book_id}>
                  <TableCell className='font-medium'>{book?.book_id}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.category_id}</TableCell>
                  <TableCell>{book.createdAt}</TableCell>
                  <TableCell>{book.updatedAt}</TableCell>
                  <TableCell>{book.description}</TableCell>
                  <TableCell>{book.isbn}</TableCell>
                  <TableCell>{book.published_date}</TableCell>
                  <TableCell>{book.quantity}</TableCell>
                  <TableCell>{book.title}</TableCell>
                </TableRow>
              )) : <span>No book avaiable</span>}
          </TableBody>          
        </Table>
      </div>
    </section>
  )
}

export default DataOfBooks