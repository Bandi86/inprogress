'use client'

import useUserStore from '@/store'
import Link from 'next/link'
import AvatarMenu from './Avatar'
import RightMenu from './Sheet'

const Auth = () => {
  const { user } = useUserStore()

  return (
    <>
      {user ? (
        <div className='hidden xl:flex items-center space-x-5'>
          <RightMenu />

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
