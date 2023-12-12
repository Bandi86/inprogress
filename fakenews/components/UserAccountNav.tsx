'use client';
import { User } from '@/payload-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

const UserAccountNav = ({ user }: { user: User }) => {
  // using useauth hook to logout user
  const { signOut } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className='flex items-center gap-4'>
      <span className='text-white'>Szia {user.name}</span>
      <div
        className='relative'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Avatar>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
        {isMenuOpen && (
          <div
            className='absolute right-0 top-full bg-gray-800 text-white shadow-lg p-4 rounded-md flex flex-col gap-4'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href='/profile' className='hover:text-blue-500'>
              Profil
            </Link>
            <button className='hover:text-blue-500' onClick={signOut}>
              Kijelentkezes
            </button>
            {/* További menüpontok */}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAccountNav;
