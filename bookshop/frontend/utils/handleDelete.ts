import { booksApi, categoriesApi } from '@/constants/api'
import axios from 'axios'

export type DeleteProps = {
  type: string
  id: string
  handleCloseModal: () => void
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const handleDelete =
  ({ type, id, handleCloseModal, setRefresh }: DeleteProps) =>
  async () => {
    if (type === 'books') {
      let book_id = id
      try {
        const res = await axios.delete(`${booksApi}/${book_id}`)
        if (res.status === 204) alert('Delete book successfully')
        handleCloseModal()
       setRefresh(true)
      } catch (error) {
        console.error('Error deleting book:', error)
      }
    }
    if (type === 'category') {
      let category_id = id
      try {
        const res = await axios.delete(`${categoriesApi}/${category_id}`)

        if (res.status === 204) alert('Delete book successfully')
        handleCloseModal()
        setRefresh(true)
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    }
  }

export default handleDelete
