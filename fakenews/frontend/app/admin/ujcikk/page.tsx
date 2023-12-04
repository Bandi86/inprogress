'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { baseUrl, cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { BaseSyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TSArticle, articleValidation } from '@/lib/articleValidation';
import { Tags, User } from '@/types/types';
import { toast } from 'sonner';
import { useUser } from '@/contexts/userContext';
import { SubmitHandler } from 'react-hook-form';

const page = () => {
  const [tags, setTags] = useState<Tags[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const { user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSArticle>({
    resolver: zodResolver(articleValidation),
  });

  useEffect(() => {
    axios.get(`${baseUrl}/tags`).then((res) => {
      setTags(res.data);
    });
  }, []);

  const handleChange = (e: BaseSyntheticEvent) => {
    const { name, checked } = e.target;

    if (checked) {
      setSelectedCategories([...selectedCategories, name]);
    } else {
      setSelectedCategories(selectedCategories.filter((item) => item !== name));
    }
  };

  const onSubmit = async (data: TSArticle) => {
    console.log('Az onSubmit függvény futott le.');
    
    
    let newData = { ...data };
  
    // Check if newTag exists and has a length greater than 2
    const exists = tags.find((tag) => tag.name === newTag);
  
    if (!exists && newTag && newTag.length > 2) {
      newData = {
        ...data,
        userId: user?.userId || '',
        tagList: [...data.tagList, newTag],
      };
    }
  
    axios.post(`${baseUrl}/articles`, newData, {withCredentials: true}).then((res) => {
      if (res.status === 201) {
        toast.success('Sikeres cikkfeltoltes');
      } else {
        toast.error('Hiba történt a feltoltes során');
      }
    });
  };

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='grid gap-6'>
          <h2>Uj cikk keszitese</h2>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
            <div className='grid gap-4 py-4'>
              <Label htmlFor='name'>Cim</Label>
              <Input
                {...register('title')}
                className={cn({
                  'focus-visible:ring-red-500': errors.title,
                })}
                placeholder='Cikk cime'
                type='text'
              />
              {errors?.title && (
                <p className='text-sm text-red-500'>
                  {errors?.title && errors.title.message}
                </p>
              )}

              <Label htmlFor='body'>Cikk tartalma</Label>
              <Input
                {...register('body')}
                className={cn({
                  'focus-visible:ring-red-500': errors.body,
                })}
                placeholder='Cikk tartalma'
                type='text'
              />
              {errors?.body && (
                <p className='text-sm text-red-500'>{errors.body.message}</p>
              )}
            </div>
            <div className='grid gap-4 py-4'>
              <Label htmlFor='description'>Cikk leirasa</Label>
              <Input
                {...register('description')}
                className={cn({
                  'focus-visible:ring-red-500': errors.description,
                })}
                placeholder='cikk leirasa'
                type='text'
              />
              {errors?.description && (
                <p className='text-sm text-red-500'>
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className='grid gap-4 py-4'>
              <Label htmlFor='image'>kep linkje</Label>
              <Input
                {...register('image')}
                className={cn({
                  'focus-visible:ring-red-500': errors.image,
                })}
                placeholder='kep linkje'
                type='text'
              />
              {errors?.image && (
                <p className='text-sm text-red-500'>{errors.image.message}</p>
              )}
            </div>
            <div className='grid gap-4 py-4'>
              <Label>Uj cimke hozzaadasa</Label>
              <Input
                type='text'
                placeholder='uj cimke neve'
                id='newTag'
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
              />
            </div>
            <div className='items-top flex space-x-2 gap-4 py-4 px-4'>
              {tags.length > 0 ? (
                tags.map((item) => (
                  <div key={item.tagId}>
                    <Checkbox
                      id={item.tagId}
                      name={item.name}
                      onChange={(e) => handleChange(e)}
                      className=''
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

            <Button type='submit'>Cikk bekuldese</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
