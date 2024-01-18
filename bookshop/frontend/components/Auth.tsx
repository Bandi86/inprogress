"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import AvatarMenu from './Avatar'
import useUserStore from '@/store'
//import { User } from '@/types/user'

const Auth = () => {
  const { user } = useUserStore()

  return (
    <>
      {user ? (
        <div className='hidden xl:flex items-center space-x-5'>
          <Link className='hover:text-gray-200' href='#'>
            {/* ... user icon ... */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
              />
            </svg>
          </Link>
          <Link className='flex items-center hover:text-gray-200' href='#'>
            {/* ... notification icon ... */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z'
              />
            </svg>
            <span className='flex absolute -mt-7 ml-5'>
              <span className='animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75'></span>
              <span className='relative inline-flex rounded-full h-3 w-3 bg-pink-500'></span>
            </span>
          </Link>
          <Link
            className='flex items-center hover:text-gray-200'
            href={`/profile/${user.id.toString()}`}
          >
            <AvatarMenu />
          </Link>
        </div>
      ) : (
        <div className='flex flex-row items-center gap-6'>
          <Link href='/register'>Register</Link>
          <Link href='/login'>Login</Link>
        </div>
      )}
    </>
  )
}

export default Auth
