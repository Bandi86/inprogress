import React from 'react';
import Link from 'next/link';
import { IoIosHome } from 'react-icons/io';
import { adminSidebarLi } from '../styles/customStyles';

const Sidebar = () => {
  return (
    <div className='flex flex-row min-h-screen'>
      <div className='flex flex-col min-h-min font-bold text-center bg-black text-yellow-500 gap-6 w-60'>
        <ul className='flex flex-col p-4 gap-8  '>
          <Link href='/admin'>
            <li>Bookshop Admin</li>
            <li className={adminSidebarLi}>
              <IoIosHome />
              Home
            </li>
          </Link>
          <Link href='/admin/users'>
            <li>Users</li>
          </Link>
          <Link href='/admin/books'>
            <li>Books</li>
          </Link>
          <Link href='/admin/categories'>
            <li>Categories</li>
          </Link>
          <Link href='/admin/author'>
            <li>Author</li>
          </Link>
          <Link href='/admin/publisher'>
            <li>Publisher</li>
          </Link>
          <Link href='/admin/ratings'>
            <li>Ratings</li>
          </Link>
          <Link href='/admin/comments'>
            <li>Comments</li>
          </Link>
          <Link href='/admin/statistic'>
            <li>Statistic</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
