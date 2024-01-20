import { IoClose } from 'react-icons/io5'
import CreateBookForm from '../admin/CreateBookForm'
import { useEffect, useState } from 'react'
import { Category } from '@/types/category'
import axios from 'axios'
import { categoriesApi } from '@/constants/api'
import Image from 'next/image'

interface AdminTableModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  type: string
  rowData?: any
  selectedIcon: string
}

const AdminTableModal: React.FC<AdminTableModalProps> = ({
  showModal,
  setShowModal,
  rowData,
  type,
  selectedIcon,
}) => {
  if (!showModal) {
    return null
  }

  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true)
      const res = await axios.get(categoriesApi)
     

      const data = await res.data.categories
      setCategories(data)
      setLoading(false)
    }
    fetchCategories()
  }, [])

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen'>
        <div className='flex items-center justify-between mb-4'>
          <div className='text-xl text-center font-medium text-gray-700'>
            {type === 'book' && selectedIcon === 'new' ? 'Create Book' : ''}
            {type === 'book' && selectedIcon === 'edit' ? 'Edit Book' : ''}
            {type === 'book' && selectedIcon === 'delete' ? 'Delete Book' : ''}
            {type === 'book' && selectedIcon === 'profile' ? 'View Book' : ''}
          </div>
          <button onClick={handleCloseModal}>
            <IoClose className='text-2xl hover:text-gray-500 cursor-pointer' />
          </button>
        </div>
        <div>
          {type === 'book' &&
          (selectedIcon === 'new' || selectedIcon === 'edit') ? (
            <CreateBookForm categories={categories} loading={loading} />
          ) : (
            ''
          )}
          {type === 'book' && selectedIcon === 'delete' ? (
            <div>Are you sure you want to delete this book?</div>
          ) : (
            ''
          )}
          {type === 'book' && selectedIcon === 'profile' ? (
            <div>
              {rowData ? (
                <div>
                  <div>Title: {rowData.title}</div>
                  <div>Author: {rowData.author}</div>
                  <div>Description: {rowData.description}</div>
                  <div>Price: {rowData.price}</div>
                  <div>Quantity: {rowData.quantity}</div>
                  <div>Published Date: {rowData.published_date}</div>
                  <div>Created At: {rowData.createdAt}</div>
                  <div>Updated At: {rowData.updatedAt}</div>
                  <Image src={rowData.image} width={200} height={300} alt="book cover" />
                </div>
              ) : (
                <h2>no data</h2>
              )}
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminTableModal
