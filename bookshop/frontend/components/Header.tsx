'use client'

import Searchbar from '@/components/Search'
import BookCategorys from './BookCategorys'
import Link from 'next/link'
import Auth from './Auth'

const Header = () => {
  return (
    <div className='flex flex-col'>
      <nav className='flex justify-between items-center bg-gray-900 text-white w-screen border-b-2'>
        <div className='px-5 xl:px-12 py-6 flex w-full'>
          <Link className='text-3xl font-bold font-heading' href='#'>
            Logo Here.
          </Link>
          <ul className='hidden items-center md:flex px-4 mx-auto font-semibold font-heading space-x-12'>
            <li>
              <Link className='hover:text-gray-200' href='#'>
                Home
              </Link>
            </li>
            <li>
              <Link className='hover:text-gray-200' href='#'>
                Category
              </Link>
            </li>
            <li>
              <Link className='hover:text-gray-200' href='#'>
                Collections
              </Link>
            </li>
            <li>
              <Link className='hover:text-gray-200' href='#'>
                Contact Us
              </Link>
            </li>
          </ul>
          <div className='flex gap-6'>
            <Searchbar />

            <Auth />
          </div>
        </div>
      </nav>
      <BookCategorys />
    </div>
  )
}

export default Header
