import {
  IoIosHome,
  IoIosPeople,
  IoIosBook,
  IoIosApps,
  IoIosPerson,
  IoIosBusiness,
  IoIosStar,
  IoIosChatboxes,
  IoIosStats,
} from 'react-icons/io';
import { SlLogout } from 'react-icons/sl';
import Link from 'next/link';
import logout from '../fn/logout';

const Menu = () => {
  const iconStyle = 'text-2xl mr-2';
  const divStyle = 'flex flex-row h-14 gap-10 items-center hover:bg-red-600';

  return (
    <div className='flex flex-col p-4 gap-8'>
      <Link href='/admin'>
        <div className={divStyle}>
          <span>
            <IoIosHome className={iconStyle} />
          </span>
          <span>Home</span>
        </div>
      </Link>
      <Link href='/admin/users'>
        <div className={divStyle}>
          <span>
            <IoIosPeople className={iconStyle} />
          </span>
          <span>Users</span>
        </div>
      </Link>
      <Link href='/admin/books'>
        <div className={divStyle}>
          <span>
            <IoIosBook className={iconStyle} />
          </span>
          <span>Books</span>
        </div>
      </Link>
      <Link href='/admin/categories'>
        <div className={divStyle}>
          <span>
            <IoIosApps className={iconStyle} />
          </span>
          <span>Categories</span>
        </div>
      </Link>
      <Link href='/admin/author'>
        <div className={divStyle}>
          <span>
            <IoIosPerson className={iconStyle} />
          </span>
          <span>Author</span>
        </div>
      </Link>
      <Link href='/admin/publisher'>
        <div className={divStyle}>
          <span>
            <IoIosBusiness className={iconStyle} />
          </span>
          <span>Publisher</span>
        </div>
      </Link>
      <Link href='/admin/ratings'>
        <div className={divStyle}>
          <span>
            <IoIosStar className={iconStyle} />
          </span>
          <span>Ratings</span>
        </div>
      </Link>
      <Link href='/admin/comments'>
        <div className={divStyle}>
          <span>
            <IoIosChatboxes className={iconStyle} />
          </span>
          <span>Comments</span>
        </div>
      </Link>
      <Link href='/admin/statistics'>
        <div className={divStyle}>
          <span>
            <IoIosStats className={iconStyle} />
          </span>
          <span>Statistics</span>
        </div>
      </Link>      
        <div className={divStyle}>
          <span>
            <SlLogout className={iconStyle} />
          </span>
          <span onClick={logout}>Logout</span>
        </div>      
    </div>
  );
};

export default Menu;
