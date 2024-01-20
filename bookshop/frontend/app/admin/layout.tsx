'use client'
import SearchBar from '@/components/Search'
import Sidebar from '@/components/admin/SideBar'
import useUserStore from '@/store'
import { useRouter } from 'next/navigation'

const adminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore()

  const router = useRouter()
  if (user && user.role !== 'admin') {
    router.push('/')
  }

  return (
    <>
      <div className='flex flex-row min-h-min w-screen bg-gradient-to-r from-green-200 to-green-500 text-black'>
        <Sidebar />
        {children && <div className='flex flex-col w-auto pt-6'>
          <SearchBar />
          {children}
          </div>}
      </div>
    </>
  )
}

export default adminLayout
