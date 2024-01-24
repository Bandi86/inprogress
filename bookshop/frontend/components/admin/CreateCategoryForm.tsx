import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { categoriesApi } from '@/constants/api'
import axios from 'axios'
import { Category } from '@/types/category'


type Props = {
  text: string
  setText: (text: string) => void
  rowData?: Category
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateCategoryForm: React.FC<Props> = ({
  text,
  setText,
  rowData,
  setShowModal,
  setRefresh,
}: Props) => {
  useEffect(() => {
    if (rowData) {
      setText(rowData.category_name)
    }
  }, [rowData])

 

  const handleSubmit = async () => {
    const data = {
      category_name: text,
    }
    try {
      if (rowData) {
        const res = await axios.put(
          `${categoriesApi}/${rowData.category_id}`,
          data
        )
        if (res.status === 201) {
          setText('')
          alert('Edit category successfully')
          if (setRefresh) setRefresh(true)
          if (setShowModal) {
            setShowModal(false)
          }
        }
        return
      }
      const res = await axios.post(categoriesApi, data)
      if (res.status === 201) {
        setText('')
        alert('Create category successfully')
        if (setRefresh) setRefresh(true)
        setRefresh(true)
      }
    } catch (error) {
      console.error('Error creating/editing category:', error)
    }
  }

  return (
    <div className='w-[10rem]'>
      <Label htmlFor='name'>Name</Label>
      <Input
        name='name'
        type='text'
        placeholder='name'
        className='mb-4'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button type='submit' onClick={handleSubmit}>
        {rowData ? 'Edit' : 'Create'}
      </Button>
    </div>
  )
}

export default CreateCategoryForm
