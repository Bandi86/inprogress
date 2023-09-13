'use client';

import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const LoginPage = () => {

  const [user, setUser] = React.useState({
    email: '',
    password: '',
  });
  
  const onLogin = async () => {};
  
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Login</h1>
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
        onClick={onLogin}
      >
        Login
      </button>
      <Link href='/signup'>Visit Sign up page</Link>
    </div>
  );
};

export default LoginPage;
