'use client'

import axios from 'axios'
import useCategoryStore from '@/store/categorieStore'
import { useEffect, useState } from 'react'
import { categoriesApi } from '@/constants/api'
import SharedTable from '@/components/shared/Table'
import CreateCategoryForm from '@/components/admin/CreateCategoryForm'

const page = () => {
  const { categories, setCategories, clearCategories } = useCategoryStore()
  const [loading, setLoading] = useState(false)
  const [text, setText] = useState('')
  const [refresh, setRefresh] = useState(false)

useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true)
            const result = await axios.get(categoriesApi)
            setCategories(result.data.categories)
            
        } catch (error) {
            console.error('Error fetching categories:', error)
        } finally {
            setLoading(false)
        }
    }
    fetchData()
}, [refresh])

  return (
    <div>
      {loading && (
        <div className='text-center text-2xl text-gray-500 p-8'>Loading...</div>
      )}
      {!categories && (
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
          />
          <CreateCategoryForm text={text} setText={setText} setRefresh={setRefresh} />
        </div>
      )}
    </div>
  )
}

export default page
