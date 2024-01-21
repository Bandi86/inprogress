import React, { useEffect } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { categoriesApi } from '@/constants/api';
import axios from 'axios';
import { Category } from '@/types/category';

type Props = {
  text: string;
  setText: (text: string) => void;
  setRefresh: (refresh: boolean) => void;
  rowData?: Category;
};

const CreateCategoryForm = ({ text, setText, setRefresh, rowData }: Props) => {
  useEffect(() => {
    if (rowData) {
      setText(rowData.category_name);
    }
  }, [rowData]);

  const handleSubmit = async () => {
    const data = {
      category_name: text,
    };
    try {
      if (rowData) {
        const res = await axios.put(`${categoriesApi}/${rowData.category_id}`, data);
        if (res.status === 201) {
          setText('');
          alert('Edit category successfully');
          setRefresh(true);
        }
        return;
      }
      const res = await axios.post(categoriesApi, data);
      if (res.status === 201) {
        setText('');
        alert('Create category successfully');
        setRefresh(true);
      }
    } catch (error) {
      console.error('Error creating/editing category:', error);
    }
  };

  return (
    <div>
      <Label htmlFor='name'>Name</Label>
      <Input
        name='name'
        type='text'
        placeholder='name'
        className='w-full mb-4'
        value={text}
        onChange={(e) => setText(e.target.value)}
        
      />
      <Button type='submit' onClick={handleSubmit}>
        {rowData ? 'Edit' : 'Create'}
      </Button>
    </div>
  );
};

export default CreateCategoryForm;

