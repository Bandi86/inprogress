import Link from 'next/link';

const AdminNavBar = () => {
  return (
    <nav className='flex justify-evenly items-center px-10 py-5 bg-gray-800 text-white'>
      <div className='hidden md:flex'>
        <ul className='flex flex-row gap-10'>
          <li>
            <Link href='/admin/ujcikk'>Uj cikk</Link>
          </li>

          <li>
            <Link href='/admin/ujcimke'>uj cimke</Link>
          </li>
          <li>
            <Link href='/admin/felhasznalok'>Felhasznalok listaja</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default AdminNavBar;
