'use client';
import { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { signupSchema } from '../schema/signup';
import { apiUrls } from '../api/api';

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const validatedData = signupSchema.parse(formState);
      if (validatedData) {
        if (formState.password == formState.confirmPassword) {
          const res = await axios.post(apiUrls.signupAPI, validatedData);
          if (res.status === 201) {
            console.log('succes registration');
            router.push('/login');
          }
        } else {
          throw new Error('passwords not match');
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
      <h2 className='text-center text-2xl font-semibold mb-4'>Sign Up</h2>
      <form
        onSubmit={handleForm}
        className='grid grid-cols-1 gap-4 max-w-sm mx-auto'
      >
        <div className="flex flex-col gap-4">
          <Label htmlFor='username' className='text-white'>Username</Label>
          <Input
            type='text'
            id='name'
            placeholder='Username'
            required
            autoComplete='true'
            onChange={(e) => setFormState({ ...formState, name: e.target.value })}
            className='px-3 py-2 bg-gray-900 border rounded-md focus:outline-none focus:border-indigo-500 text-white'
          />
        </div>
  
        <div className="flex flex-col gap-4">
          <Label htmlFor='email' className='text-white'>Email</Label>
          <Input
            type='email'
            id='email'
            placeholder='Email'
            required
            autoComplete='true'
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            className='px-3 py-2 bg-gray-900 border rounded-md focus:outline-none focus:border-indigo-500 text-white'
          />
        </div>
  
        <div className="flex flex-col gap-4">
          <Label htmlFor='password' className='text-white'>Password</Label>
          <Input
            type='password'
            placeholder='Password'
            required
            autoComplete='true'
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
            className='px-3 py-2 bg-gray-900 border rounded-md focus:outline-none focus:border-indigo-500 text-white'
          />
        </div>
  
        <div className="flex flex-col gap-4">
          <Label htmlFor='confirmPassword' className='text-white'>Confirm Password</Label>
          <Input
            type='password'
            placeholder='Confirm Password'
            required
            autoComplete='true'
            onChange={(e) =>
              setFormState({ ...formState, confirmPassword: e.target.value })
            }
            className='px-3 py-2 bg-gray-900 border rounded-md focus:outline-none focus:border-indigo-500 text-white'
          />
        </div>
  
        <Button type='submit' className='px-4 py-2 bg-indigo-500 border rounded-md hover:bg-indigo-600 text-white'>
          Submit
        </Button>
      </form>
    </>
  );
  
};

export default SignUp;
