'use client'
import SearchBar from '@/components/Search'
import Sidebar from '@/components/admin/SideBar'
import useUserStore from '@/store'
import { useRouter } from 'next/navigation'

const adminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUserStore()

  const router = useRouter()
  if (!user || user.role !== 'admin') {
    router.push('/')
  }

  return (
    <>
      <div className='flex min-h-min w-full bg-gradient-to-r from-green-200 to-green-500 text-black'>
        <Sidebar />
        {children && (
          <div className='w-full p-10'>
            <SearchBar />
            {children}
            </div>
        )}
      </div>
    </>
  )
}

export default adminLayout
