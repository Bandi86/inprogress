'use client'
import useCategoryStore from '@/store/categorieStore'
import { Category } from '@/types/category'
import { fetchCategories } from '@/utils/fetch'
import Link from 'next/link'
import React, { useEffect } from 'react'

const BookCategorys = () => {
  const { categories, setCategories } = useCategoryStore()
  
  useEffect(() => {
    fetchCategories(setCategories)
  }, [])
  

  return (
    <div className='h-14 p-4 flex bg-gray-900 text-white justify-center'>
      <ul className='gap-10 flex pr-4 pl-4 justify-center items-center'>
        {Array.isArray(categories) &&
          categories.map((category: Category) => (
            <li key={category?.category_id}>
              {category && (
                <Link
                  className='hover:text-gray-200'
                  href={`/books/${category?.category_id}`}
                >
                  {category?.category_name}
                </Link>
              )}
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BookCategorys
