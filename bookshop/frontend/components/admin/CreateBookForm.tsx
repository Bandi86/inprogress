import React from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '../ui/textarea'
import { Category } from '@/types/category'
import axios from 'axios'
import { booksApi } from '@/constants/api'
import { useState } from 'react'


interface CreateBookFormProps {
  categories: Category[]
  loading: boolean
}



const CreateBookForm = ({categories, loading}: CreateBookFormProps) => {
  
  const [prevFormData, setPrevFormData] = useState({})
  
  const handleSubmitForm = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    
    const data = Object.fromEntries(formData)
    setPrevFormData(formData);
    const post = await axios.post(booksApi, data)
    console.log(post)
  
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
        <Select>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a category' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {categories && !loading ? (
                categories.map((category) => (
                  <SelectItem key={category.category_id} value={category.category_id}>
                    {category.category_name}
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
        {
          loading ? <Button disabled>Loading...</Button> : <Button type='submit'>Create Book</Button>
        }
        
      </form>
    </div>
  );
}

export default CreateBookForm
