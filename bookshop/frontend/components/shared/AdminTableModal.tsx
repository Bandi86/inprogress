import { IoClose } from 'react-icons/io5'

interface AdminTableModalProps {
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  type: string
  rowData?: any
}

const AdminTableModal: React.FC<AdminTableModalProps> = ({
  showModal,
  type,
  setShowModal,
}) => {
  if (!showModal) {
    return null
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      <div className='bg-white w-full max-w-md mx-auto rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen'>
        <div className='flex items-center justify-between mb-4'>
          <div className='text-2xl font-medium text-gray-700'>Modal Title</div>
          <button onClick={handleCloseModal}>
            <IoClose className='text-2xl hover:text-gray-500 cursor-pointer' />
          </button>
        </div>
        <div>
          <p>Modal content goes here...</p>
        </div>
      </div>
    </div>
  )
}

export default AdminTableModal
