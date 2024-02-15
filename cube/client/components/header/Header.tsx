import Link from 'next/link'
import CategoryMenu from './CategoryMenu'
//import { dateAndNames } from '@/utils/dateAndNames'

const Header = () => {
  return (
    <header>
      <div className='bg-[#24252f] h-12 flex justify-around p-2 items-center'>
        <div></div>
        <div className='text-white flex gap-4'>
          <Link href='/login'>
            <span>Bejelentkezes</span>
          </Link>
          vagy
          <Link href='/register'>
            <span>Regisztracio</span>
          </Link>
        </div>
      </div>
      <nav className='flex justify-around items-center h-20 bg-slate-100 p-4'>
        <div>Logo</div>
        <div>Cube Gaming</div>
        <div>nap nevnap</div>
      </nav>
      <CategoryMenu />
    </header>
  )
}

export default Header
