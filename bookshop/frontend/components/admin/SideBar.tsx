const Sidebar = () => {
  const menu = 'p-4 hover:bg-slate-100 hover:text-black'
  return (
    <div className='flex flex-row min-h-screen'>
      <div className='flex flex-col min-h-min font-bold text-center gap-6 w-60 border-r slate-200'>
        {/* dummy menu */}
        <div className='flex flex-col gap-12'>
          <h1 className="pt-4">Hello Admin</h1>
          <a href='#' className={menu}>
            Dashboard
          </a>
          <a href='admin/users' className={menu}>
            Users
          </a>
          <a href='#' className={menu}>
            Pages
          </a>
          <a href='#' className={menu}>
            Media
          </a>
          <a href='#' className={menu}>
            Users
          </a>
          <a href='#' className={menu}>
            Settings
          </a>
          <a href="/" className={menu}>User Home</a>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
