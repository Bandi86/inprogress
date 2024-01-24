import { IoClose } from 'react-icons/io5'
import CreateBookForm from '../admin/CreateBookForm'
import Image from 'next/image'
import useCategoryStore from '@/store/categorieStore'
import CreateCategoryForm from '../admin/CreateCategoryForm'
import { Button } from '../ui/button'
import handleDelete from '@/utils/handleDelete'

interface AdminTableModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  type: string
  rowData?: any
  selectedIcon: string
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const AdminTableModal: React.FC<AdminTableModalProps> = ({
  showModal,
  setShowModal,
  rowData,
  type,
  selectedIcon,
  setRefresh
}) => {
  if (!showModal) {
    return null
  }

  const { categories } = useCategoryStore()

  const newForm = selectedIcon === 'new'
  const editForm = selectedIcon === 'edit'
  const deleteItem = selectedIcon === 'delete'

  const options = newForm ? 'new' : editForm ? 'edit' : ''

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
            {type === 'category' && selectedIcon === 'edit'
              ? 'Edit Category'
              : ''}
            {type === 'category' && selectedIcon === 'delete'
              ? 'Delete Category'
              : ''}
          </div>
          <button onClick={handleCloseModal}>
            <IoClose className='text-2xl hover:text-gray-500 cursor-pointer' />
          </button>
        </div>
        <div>
          {type === 'book' &&
          (selectedIcon === 'new' || selectedIcon === 'edit') ? (
            <CreateBookForm
              categories={
                Array.isArray(categories) && categories.length > 0
                  ? categories
                  : null
              }
              options={options}
              rowData={options === 'edit' ? rowData : undefined}
              setShowModal={setShowModal}
            />
          ) : (
            ''
          )}
          {type === 'category' && selectedIcon === 'edit' ? (
            <CreateCategoryForm
              text={rowData.category_name}
              setText={() => {}}
              rowData={rowData}
              setShowModal={setShowModal}
              setRefresh={setRefresh}
            />
          ) : (
            ''
          )}
          {type === 'category' && deleteItem ? ( <>
              <div>Are you sure you want to delete this category?</div>
              <Button onClick={handleDelete({type: type, id: rowData.category_id, handleCloseModal, setRefresh})}>Yes</Button>
              <Button onClick={handleCloseModal}>No</Button>
            </>) : ''}

          {type === 'book' && deleteItem ? (
            <>
              <div>Are you sure you want to delete this book?</div>
              <Button onClick={handleDelete({type: type, id: rowData.category_id, handleCloseModal, setRefresh})}>Yes</Button>
              <Button onClick={handleCloseModal}>No</Button>
            </>
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
                  <Image
                    src={rowData.image}
                    width={200}
                    height={300}
                    alt='book cover'
                  />
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
