'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl } from '@/lib/utils';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const newTag = () => {
  const [tag, setTag] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await axios
      .post(`${baseUrl}/tags`, { name: tag })
      .then((res) => {
        if (res.status === 201) {
          toast.success('Sikeres cimke feltoltes');
        }
      })
      .catch((error) => {
        toast.error('Hiba tortent a cimke feltoltese soran');
      });
  };

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
        <div className='grid gap-6'>
          <h2>uj cimke hozzaadasa</h2>
        </div>
        <form
          onSubmit={handleSubmit}
          className='flex flex-col gap-4 justify-center'
        >
          <Label htmlFor='name'>Cimke neve</Label>
          <Input
            type='text'
            name='name'
            id='name'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />

          <Button type='submit'>Cimke hozzaadasa</Button>
        </form>
      </div>
    </div>
  );
};

export default newTag;
