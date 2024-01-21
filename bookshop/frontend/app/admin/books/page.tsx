'use client'
import CreateBookForm from '@/components/admin/CreateBookForm'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { booksApi, categoriesApi } from '@/constants/api'
import SharedTable from '@/components/shared/Table'
import useBookStore from '@/store/bookStore'
import useCategoryStore from '@/store/categorieStore'

const page = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [refreshBooks, setRefreshBooks] = useState<boolean>(false)

  const { books, setBooks } = useBookStore()
  const { categories, setCategories } = useCategoryStore()

  
  

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
  }, [refreshBooks])

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
            {Array.isArray(categories) && categories.length > 0 && (
              <CreateBookForm
                categories={categories}
                loading={loading}
                options='new'
                setRefReshBooks={setRefreshBooks}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default page
