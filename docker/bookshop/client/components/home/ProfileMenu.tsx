import Link from 'next/link'
import { RxHamburgerMenu } from 'react-icons/rx'
import useUserStore from '@/store/userStore'
import { Avatar } from './Avatar'
import { FaHeart } from 'react-icons/fa'
import { FaShoppingCart } from 'react-icons/fa'

type Props = {
  isMenuOpen: boolean
  setIsMenuOpen: (isMenuOpen: boolean) => void
}

const ProfileMenu = ({ isMenuOpen, setIsMenuOpen }: Props) => {
  const { user } = useUserStore()

  return (
    <div>
      {!user ? (
        <div className='flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24'>
          <Link href='/login'>Sign in</Link>
          <span>/</span>
          <Link href='/register'>Sign up</Link>
        </div>
      ) : (
        <div className='flex gap-10 justify-between items-center text-2xl'>
          <FaHeart />
          <FaShoppingCart />
          <Avatar user={user} />
        </div>
      )}

      {isMenuOpen && (
        <div>
          <div className='flex gap-2 text-lg leading-normal font-medium font-montserrat max-lg:hidden wide:mr-24'>
            <Link href='/login'>Sign in</Link>
            <span>/</span>
            <Link href='/register'>Sign up</Link>
          </div>
          <div
            className='hidden max-lg:block cursor-pointer'
            onClick={() => {
              setIsMenuOpen(!isMenuOpen)
            }}
          >
            <RxHamburgerMenu className='text-4xl' />
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileMenu
