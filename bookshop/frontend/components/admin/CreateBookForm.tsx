import React, { SetStateAction } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '../ui/textarea'
import { Category } from '@/types/category'
import axios from 'axios'
import { booksApi } from '@/constants/api'
import { Book } from '@/types/book'
import { handleSuccess } from '@/utils/adminHandleSuccess'

interface CreateBookFormProps {
  categories: Category[] | null
  options: string
  rowData?: Book
  setShowModal?: (value: SetStateAction<boolean>) => void
}

const CreateBookForm = ({
  categories,
  options,
  rowData,
  setShowModal,
}: CreateBookFormProps) => {
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const data = Object.fromEntries(formData)
    if (Object.keys(data).length === 0) {
      return // Do not make the axios post request if form data is empty
    }
    try {
      if (options === 'new') {
        const response = await axios.post(booksApi, data)
        if (response.status !== 201) {
          throw new Error('Error while creating the book.')
        } else {
          if (setShowModal) {
            handleSuccess(setShowModal)
          }
        }
      } else if (options === 'edit') {
        const response = await axios.put(
          `${booksApi}/${rowData?.book_id}`,
          data
        )
        if (response.status !== 200) {
          throw new Error('Error while editing the book.')
        } else {
          if (setShowModal) {
            handleSuccess(setShowModal)
          }
        }
      }
    } catch (error) {
      console.error('Error creating/editing book:', error)
    }
  }

  // if wee have rowdata place the values in the form fields
  if (rowData) {
    return (
      <div className='flex justify-center pl-4'>
        <form onSubmit={handleSubmitForm} className='flex flex-col gap-4'>
          <Label htmlFor='title'>Title</Label>
          <Input
            type='text'
            name='title'
            id='title'
            defaultValue={rowData.title}
          />
          <Label htmlFor='author'>Author</Label>
          <Input
            type='text'
            name='author'
            id='author'
            defaultValue={rowData.author}
          />
          <Label htmlFor='description'>Description</Label>
          <Textarea
            name='description'
            id='description'
            cols={20}
            rows={5}
            defaultValue={rowData.description}
          />
          <Label htmlFor='category'>Category</Label>
          <Select name='category'>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Select a category' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categories ? (
                  categories.map((item) => (
                    <SelectItem key={item.category_id} value={item.category_id}>
                      {item.category_name}
                    </SelectItem>
                  ))
                ) : (
                  <span>No category available</span>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Label htmlFor='price'>Price</Label>
          <Input
            type='number'
            name='price'
            id='price'
            defaultValue={rowData.price}
          />
          <Label htmlFor='isbn'>ISBN Code</Label>
          <Input
            type='text'
            name='isbn'
            id='isbn'
            defaultValue={rowData.isbn}
          />
          <Label htmlFor='cover'>Cover</Label>
          <Input
            type='text'
            name='image'
            id='image'
            defaultValue={rowData.image}
          />
          <Label htmlFor='stock'>Stock</Label>
          <Input
            type='number'
            name='quantity'
            id='quantity'
            defaultValue={rowData.quantity}
          />
          <Label htmlFor='published_date'>Published Date</Label>
          <Input
            type='date'
            name='published_date'
            id='published_date'
            defaultValue={rowData.published_date}
          />

          <Button type='submit'>Edit Book</Button>
        </form>
      </div>
    )
  }

  return (
    <div className='flex justify-center pl-4'>
      <form onSubmit={handleSubmitForm} className='flex flex-col gap-4'>
        <Label htmlFor='title'>Title</Label>
        <Input type='text' name='title' id='title' />
        <Label htmlFor='author'>Author</Label>
        <Input type='text' name='author' id='author' />
        <Label htmlFor='description'>Description</Label>
        <Textarea name='description' id='description' cols={20} rows={5} />
        <Label htmlFor='category'>Category</Label>
        <Select name='category'>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories ? (
                categories.map((item) => (
                  <SelectItem key={item.category_id} value={item.category_id}>
                    {item.category_name}
                  </SelectItem>
                ))
              ) : (
                <span>No category available</span>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Label htmlFor='price'>Price</Label>
        <Input type='number' name='price' id='price' />
        <Label htmlFor='isbn'>ISBN Code</Label>
        <Input type='text' name='isbn' id='isbn' />
        <Label htmlFor='cover'>Cover</Label>
        <Input type='text' name='image' id='image' />
        <Label htmlFor='stock'>Stock</Label>
        <Input type='number' name='quantity' id='quantity' />
        <Label htmlFor='published_date'>Published Date</Label>
        <Input type='date' name='published_date' id='published_date' />

        <Button type='submit'>
          {options === 'new' ? 'Create Book' : 'Edit Book'}
        </Button>
      </form>
    </div>
  )
}

export default CreateBookForm
