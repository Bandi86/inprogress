'use client'
import CreateBookForm from '@/components/admin/CreateBookForm'
import { useEffect, useState } from 'react'
import { Category } from '@/types/category'
import { Book } from '@/types/book'
import axios from 'axios'
import { booksApi, categoriesApi } from '@/constants/api'
import SharedTable from '@/components/shared/Table'

const page = () => {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true)
        const res = await axios.get(categoriesApi)

        if (res.status !== 200) {
          throw new Error('Error while fetching data')
        } else {
          setCategories(res.data.categories)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    const fetchBooks = async () => {
      try {
        setLoading(true)
        const res = await axios.get(booksApi)

        if (res.status !== 200) {
          throw new Error('Error while fetching data')
        } else {
          setBooks(res.data.books)
          setLoading(false)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchCategories()
    fetchBooks()
  }, [loading])

  loading && <h1>Loading...</h1>

  return (
    <>
      {books.length !== 0 ? (
        <SharedTable
          data={books}
          columns={[
            'book_id',
            'title',
            'author',
            'price',
            'quantity',
            'published_date',
            'createdAt',
            'updatedAt',
          ]}
          tableCaptionText='Book in database'
          type={'book'}
        />
      ) : (
        <div className='flex p-6 '>
          <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
            <h2 className='text-center p-6'>No books in the database</h2>
            <p>Try to add your first Book here</p>
            <CreateBookForm categories={categories} loading={loading} options='new' />
          </div>
        </div>
      )}
    </>
  )
}

export default page
