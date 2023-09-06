'use client';
import { useState, SyntheticEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signupSchema } from '../schema/signup';
import { apiUrls } from '../api/api';

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Page = () => {

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
            console.log("succes registration")
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
    <div>
      <h2 className='text-center'>Sign Up</h2>
      <form
        onSubmit={handleForm}
        className='flex flex-col items-center justify-center text-black gap-4 mt-10'
      >
        <label className='text-white'>Username</label>
        <input
          type='text'
          placeholder='Username'
          required
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
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
        <label className='text-white'>Confirm Password</label>
        <input
          type='password'
          placeholder='Confirm password'
          required
          onChange={(e) =>
            setFormState({ ...formState, confirmPassword: e.target.value })
          }
        />
        <button type='submit' className='border-white text-white'>Submit</button>
      </form>
    </div>
  );
};

export default Page;
