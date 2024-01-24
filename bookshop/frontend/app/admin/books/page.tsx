'use client'

import CreateBookForm from '@/components/admin/CreateBookForm'
import SharedTable from '@/components/shared/Table'
import useBookStore from '@/store/bookStore'
import useCategoryStore from '@/store/categorieStore'
import { fetchBooks, fetchCategories } from '@/utils/fetch'
import { useEffect } from 'react'

const page = () => {
  const { books, setBooks } = useBookStore()
  const { categories, setCategories } = useCategoryStore()

  useEffect(() => {
    fetchBooks(setBooks)
    fetchCategories(setCategories)
  }, [])

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
        <div className='flex p-6 justify-center items-center '>
          <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
            <h2 className='text-center p-6'>No books in the database</h2>
            <p>Try to add your first Book here</p>
            {Array.isArray(categories) && categories.length > 0 && (
              <CreateBookForm categories={categories} options='first' />
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default page
