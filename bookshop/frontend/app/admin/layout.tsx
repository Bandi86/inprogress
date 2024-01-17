import Sidebar from '@/components/admin/SideBar'

const adminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='flex flex-row h-full bg-slate-800 text-white'>
      <Sidebar />
      {children && (
        <div className='flex flex-col w-full items-center justify-center'>
          {children}
        </div>
      )}
    </div>
  )
}

export default adminLayout
