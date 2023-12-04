import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types/types';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useUser } from '@/contexts/userContext';

type AvatarProps = {
  user: User;
};

const AvatarComponent: React.FC<AvatarProps> = ({ user }) => {
  const router = useRouter();
  const { setUser } = useUser();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Ide írd meg a kijelentkezés logikáját
    axios
      .get('http://localhost:8000/logout', { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          localStorage.removeItem('user');
          setUser(null);
          router.push('/');
          toast.success('Sikeres kijelentkezes');
        } else {
          toast('hiba tortent kijelentkezeskor');
        }
      });
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
            <Link
              href={`/profile/${user.userId}`}
              className='hover:text-blue-500'
            >
              Profile
            </Link>
            <button onClick={handleLogout} className='hover:text-blue-500'>
              Logout
            </button>
            {/* További menüpontok */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarComponent;
