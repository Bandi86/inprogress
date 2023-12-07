'use client';
import React, { useState, useEffect } from 'react';
import { Tags } from '@/types/types';
import axios from 'axios';
import { baseUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/contexts/userContext';
import { Category } from '@/types/types';

const createArticle = () => {
  const { user } = useUser();
  const [tags, setTags] = useState<Tags[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [data, setData] = useState({
    title: '',
    body: '',
    description: '',
    image: '',
    tags: [],
  });
  

  // download tags from the backend
  useEffect(() => {
    axios.get(`${baseUrl}/tags`).then((res) => {
      setTags(res.data);
    });
    axios.get(`${baseUrl}/categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    const isChecked = e.target.checked;
    const tagName = e.target.name;
    const categoryName = e.target.name;

    if (type === 'tag') {
      if (isChecked) {
        setSelectedTags([...selectedTags, tagName]);
      } else {
        setSelectedTags(selectedTags.filter((tag) => tag !== tagName));
      }
    } else if (type === 'category') {
      if (isChecked) {
        setSelectedCategory(categoryName);
      } 
      
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newData = {
      ...data,
      userId: user?.userId || '',
      tags: selectedTags,
      category: selectedCategory,
    };

    const res = await axios
      .post(`${baseUrl}/articles`, newData)
      .then((res) => {
        if (res.status === 201) {
          toast.success('Sikeres cikk feltoltes');
         
        }
      })
      .catch((err) => {
        toast.error('Hiba tortent a cikk feltoltese soran');
      })
      .finally(() => {
        setData({
          title: '',
          body: '',
          description: '',
          image: '',
          tags: [],
        });
        setSelectedTags([]);
        setSelectedCategory('');
      });
  };

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='grid gap-6'>
          <h2>Uj cikk keszitese</h2>
        </div>
        <form onSubmit={handleSubmit} className='space-y-8'>
          <div className='grid gap-4 py-4'>
            <Label htmlFor='name'>Cim</Label>
            <Input
              type='text'
              name='name'
              id='name'
              placeholder='Cim'
              onChange={(e) => setData({ ...data, title: e.target.value })}
            />
          </div>
          <div className='grid gap-4 py-4'>
            <Label htmlFor='body'>Cikk tartalma</Label>
            <Textarea
              name='body'
              id='body'
              onChange={(e) => setData({ ...data, body: e.target.value })}
            ></Textarea>
          </div>
          <div className='grid gap-4 py-4'>
            <Label htmlFor='description'>Leiras</Label>
            <Input
              type='text'
              name='description'
              id='description'
              placeholder='leiras'
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </div>
          <div className='grid gap-4 py-4'>
            <Label htmlFor='image'>Kep linkje</Label>
            <Input
              type='text'
              name='image'
              id='image'
              placeholder='kep linkje'
              onChange={(e) => setData({ ...data, image: e.target.value })}
            />
          </div>
          <div className='items-top flex space-x-2 gap-4 py-4 px-4'>
            <Label htmlFor='tags'>Cimkek</Label>
            {tags.length > 0 ? (
              tags.map((item) => (
                <div key={item.tagId}>
                  <input
                    type='checkbox'
                    id={item.tagId}
                    name={item.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, 'tag')
                    }
                  />
                  <div className='grid gap-1.5 leading-none'>
                    <label
                      htmlFor={item.tagId}
                      className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                      {item.name}
                    </label>
                  </div>
                </div>
              ))
            ) : (
              <h2>jelenleg nincs kategoria</h2>
            )}
          </div>
          <div className='items-top flex space-x-2 gap-4 py-4 px-4'>
            <Label htmlFor='categories'>Kategoriak</Label>
            {categories.map((category) => (
              <div key={category.categoryId}>
                <input
                  type='checkbox'
                  id={category.categoryId}
                  name={category.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, 'category')
                  }
                />
                <div className='grid gap-1.5 leading-none'>
                  <label
                    htmlFor={category.categoryId}
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                  >
                    {category.name}
                  </label>
                </div>
              </div>
            ))}
          </div>
          <Button>Cikk bekuldese</Button>
        </form>
      </div>
    </div>
  );
};

export default createArticle;
