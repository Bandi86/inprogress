'use client'
import CreateBookForm from '@/components/admin/CreateBookForm'
import { useEffect, useState } from 'react'
import { Category } from '@/types/category'
import { Book } from '@/types/book'
import axios from 'axios'
import { booksApi, categoriesApi } from '@/constants/api'
import DataOfBooks from '@/components/admin/DataOfBooks'

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
  }, [])

  return (
    <div className='h-screen w-full flex flex-row'>
      <div className='w-2/6 flex flex-col items-center p-4'>
        <h1 className='font-semibold'>Create Book</h1>
        <CreateBookForm categories={categories} loading={loading} />
      </div>
      <div className='w-4/6 flex flex-col items-center p-4'>
        <h1 className='font-semibold'>Data of Books in database</h1>
        <DataOfBooks books={books} loading={loading} />
      </div>
    </div>
  )
}

export default page
