'use client'

import useCategoryStore from '@/store/categorieStore'
import { useState } from 'react'
import SharedTable from '@/components/shared/Table'
import CreateCategoryForm from '@/components/admin/CreateCategoryForm'

const page = () => {
  const { categories } = useCategoryStore()
  const [text, setText] = useState('')

  return (
    <div>
      {!categories && (
        <>
          <div className='text-center text-2xl text-gray-500 p-8'>
            No data in database
          </div>
          <CreateCategoryForm text={text} setText={setText} />
        </>
      )}
      {Array.isArray(categories) && categories.length > 0 && (
        <div className='flex gap-40 p-20'>
          <SharedTable
            data={categories as any[]}
            columns={['category_id', 'category_name', 'createdAt', 'updatedAt']}
            tableCaptionText='category in database'
            type='category'
          />
          <CreateCategoryForm text={text} setText={setText} />
        </div>
      )}
    </div>
  )
}

export default page
