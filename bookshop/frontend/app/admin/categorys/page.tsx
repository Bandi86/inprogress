'use client'

import useCategoryStore from '@/store/categorieStore'
import { useEffect, useState } from 'react'
import SharedTable from '@/components/shared/Table'
import CreateCategoryForm from '@/components/admin/CreateCategoryForm'
import { fetchCategories } from '@/utils/fetch'

const page = () => {
  const { categories, setCategories } = useCategoryStore()

  const [text, setText] = useState('')
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    fetchCategories(setCategories)
  }, [refresh])

  return (
    <div className='flex flex-col gap-10 justify-center'>
      {categories.length === 0 && (
        <>
          <div className='text-center text-2xl text-gray-500 p-8'>
            No data in database
          </div>
          <CreateCategoryForm text={text} setText={setText} setRefresh={setRefresh} />
        </>
      )}
      {Array.isArray(categories) && categories.length > 0 && (
        <div className='flex gap-40 p-20'>
          <SharedTable
            data={categories as any[]}
            columns={['category_id', 'category_name', 'createdAt', 'updatedAt']}
            tableCaptionText='category in database'
            type='category'
            setRefresh={setRefresh}
          />
          <CreateCategoryForm text={text} setText={setText} setRefresh={setRefresh} />
        </div>
      )}
    </div>
  )
}

export default page
