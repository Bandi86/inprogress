'use client';

import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const SignUp = () => {
  const [user, setUser] = React.useState({
    email: '',
    password: '',
    username: '',
  });

  const onSignup = async () => {};

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>SignUp</h1>
      <label htmlFor='username'>username</label>
      <input
        type='text'
        value={user.username}
        id='username'
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        placeholder='username'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      />
      <label htmlFor='email'>email</label>
      <input
        type='email'
        value={user.email}
        id='email'
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder='email'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      />

      <label htmlFor='password'>password</label>
      <input
        type='password'
        value={user.password}
        id='password'
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder='password'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      />
      <button
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        onClick={onSignup}
      >
        Sign Up
      </button>
      <Link href='/login'>Visit login page</Link>
    </div>
  );
};

export default SignUp;
