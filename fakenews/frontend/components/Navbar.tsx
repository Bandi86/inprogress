'use client';
import { useState } from 'react';
import Link from 'next/link';
import AvatarComponent from '@/components/Avatar';
import { useUser } from '@/contexts/userContext';
import { categories } from '@/lib/category';

const Navbar = () => {
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='flex justify-between items-center px-10 py-5 bg-gray-800 text-white'>
      <Link href='/'>
        <h1 className='cursor-pointer'>Fake News Portal</h1>
      </Link>
      <div className='hidden md:flex'>
        <ul className='flex flex-row gap-10'>
          {categories.map((category) => (
            <li key={category}>
              <Link href={`/pages/category/${category}`}>{category}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className='md:hidden'>
        <button onClick={handleMenuToggle}>
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16m-7 6h7'
            />
          </svg>
        </button>
        {isOpen && (
          <div className='absolute top-16 right-0 bg-gray-800 text-white py-2 px-4'>
            <ul className='flex flex-col gap-2'>
              {categories.map((category) => (
                <li key={category}>
                  <Link href={`/pages/category/${category}`}>{category}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className='hidden md:flex gap-4'>
        {user !== null && Object.keys(user).length !== 0 ? (
          <AvatarComponent user={user} />
        ) : (
          <div className='flex gap-10'>
            <Link href='/bejelentkezes'>Bejelentkezés</Link>
            <Link href='/regisztracio'>Regisztráció</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
