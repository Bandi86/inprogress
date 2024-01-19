import Link from "next/link"

const Sidebar = () => {
  const menu = 'p-4 hover:bg-slate-100 hover:text-black'
  return (
    <div className='flex flex-row min-h-screen'>
      <div className='flex flex-col min-h-min font-bold text-center gap-6 w-60 border-r slate-200'>
        {/* dummy menu */}
        <div className='flex flex-col gap-12'>
          <h1 className="pt-4">Hello Admin</h1>
          <Link href='/admin' className={menu}>
            Dashboard
          </Link>
          <Link href='admin/users' className={menu}>
            Users
          </Link>
          <Link href='/admin/books' className={menu}>
            Books
          </Link>
          <Link href='#' className={menu}>
            Media
          </Link>          
          <Link href='#' className={menu}>
            Settings
          </Link>
          <Link href="/" className={menu}>User Home</Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
