import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import NavItems from "./NavItems";
import { getServerSideUser } from '@/lib/payload-utils';
import { cookies } from 'next/headers';
import { buttonVariants } from './ui/button';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {

    const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className='bg-white sticky z-50 top-0 inset-x-0 h-16'>
      <header className='relative bg-black text-white'>
        <MaxWidthWrapper>
            <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
                {/* Todo Mobile view */}
                <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                 {/* logo */}
                </Link>
              </div>
              <div className="">

                <NavItems />
              </div>
              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                {user ? null : (
                    <Link
                      href='/bejelentkezes'
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      Bejelentkezes
                    </Link>
                  )}
                   {user ? null : (
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    ></span>
                  )}
                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href='/sign-up'
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      Create Account
                    </Link>
                  )}
                  {user ? (
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    ></span>
                  ) : null}
                  {user ? null : (
                    <div className='flex lg:ml-6'>
                      <span
                        className='h-6 w-px bg-gray-200'
                        aria-hidden='true'
                      ></span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
