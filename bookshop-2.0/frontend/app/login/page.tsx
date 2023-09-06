'use client';
import { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { loginSchema } from '../schema/login';
import { apiUrls } from '../api/api';

interface FormState {
  email: string;
  password: string;
}

const page = () => {
  const router = useRouter();

  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      const validatedData = loginSchema.parse(formState);
      if (validatedData) {
        const res = await axios.post(apiUrls.loginAPI, validatedData);
        if (res.status === 200) {
          if (res.data.user.role === 'admin') {
            router.push('/admin');
          } else {
            router.push('/');
            console.log('succes login');
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
    <div>
      <h2 className='text-center'>Sign Up</h2>
      <form
        onSubmit={handleForm}
        className='flex flex-col items-center justify-center text-black gap-4 mt-10'
      >
        <label className='text-white'>Email</label>
        <input
          type='email'
          placeholder='Email adress'
          required
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
        />
        <label className='text-white'>Password</label>
        <input
          type='password'
          placeholder='Password'
          required
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
        />

        <button type='submit' className='border-white text-white'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default page;
