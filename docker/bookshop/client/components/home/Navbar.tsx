'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import navLinks from '@/constants/navLinks'
import ProfileMenu from './ProfileMenu'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className='flex justify-between sm:px-8 px-4 py-2 z-10 w-full'>
      <Link href='/'>
        <span className='text-3xl font-bold font-heading'>
          Logo Here.
        </span>
      </Link>
      <ul className='flex-1 flex justify-center items-center gap-16 max-lg:hidden'>
        {navLinks.map(item => (
          <li key={item.label}>
            <a
              href={item.href}
              className='font-montserrat leading-normal text-lg text-slate-gray'
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
      <ProfileMenu
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />
    </nav>
  )
}

export default Navbar
