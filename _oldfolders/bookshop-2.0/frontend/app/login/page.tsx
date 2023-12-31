'use client';

import { useState, SyntheticEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { loginSchema } from '../schema/login';
import { apiUrls, useAxios } from '../api/api';

interface FormState {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const validatedData: FormState = loginSchema.parse(formState);

      if (validatedData) {
        const res = await useAxios('POST', apiUrls.loginAPI, validatedData);
        if (res && res.status === 200) {
          localStorage.setItem('user', JSON.stringify(res.data.user));
          if (res.data.user.role === 'admin') {
            router.push('/admin');
          } 
        }
      } else {
        throw new Error('Invalid form data');
      }
    } catch (error: any) {
      console.error('Validation error:', error.message);
    }
  };

  return (
    <>
      <h2 className='text-center text-2xl font-semibold mb-4'>Login</h2>
      <form
        onSubmit={handleForm}
        className='grid grid-cols-1 gap-4 max-w-sm mx-auto'
      >
        <div className='flex flex-col gap-4'>
          <Label htmlFor='email' className='text-white'>
            Email
          </Label>
          <Input
            type='email'
            id='email'
            placeholder='Email'
            required
            autoComplete='true'
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            className='px-3 py-2 bg-gray-900 border rounded-md focus:outline-none focus:border-indigo-500 text-white'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <Label htmlFor='password' className='text-white'>
            Password
          </Label>
          <Input
            type='password'
            placeholder='Password'
            required
            autoComplete='true'
            value={formState.password}
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
            className='px-3 py-2 bg-gray-900 border rounded-md focus:outline-none focus:border-indigo-500 text-white'
          />
        </div>

        <Button
          type='submit'
          className='px-4 py-2 bg-indigo-500 border rounded-md hover:bg-indigo-600 text-white'
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default Login;
