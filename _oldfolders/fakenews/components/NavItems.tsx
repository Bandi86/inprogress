import Link from 'next/link';

const NavItems = () => {
  return (
    <div className='flex flex-row gap-10 justify-between items-center'>
      <Link href='/'>
        <span>Home</span>
      </Link>
    </div>
  );
};

export default NavItems;
