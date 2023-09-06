import React from 'react';
import { IoMdHome } from 'react-icons/io';
import { searchInput } from '../styles/search-input';
import Link from 'next/link';

const NavBar = () => {
  return (
    <nav className='flex justify-evenly items-center py-4'>
      <div className='flex justify-evenly items-center gap-10'>
        <Link href='/'>
          <span className='flex flex-row gap-4 items-center'>
            <IoMdHome className='text-2xl' />
            Home
          </span>
        </Link>
        <Link href="/books"><span>Books</span></Link>
        <span>About</span>
      </div>
      <div className='flex gap-8 items-center'>
        <Link href="login"><span>Login</span></Link>
        <Link href="signup"><span>Signup</span></Link>
        <span className='flex items-center gap text-lg'>
          <span>{searchInput}</span>
        </span>
      </div>
    </nav>
  );
};

export default NavBar;
