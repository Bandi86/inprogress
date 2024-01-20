'use client'
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
      <div className='flex flex-row h-full w-full bg-zinc-500 text-black'>
        <Sidebar />
        {children && <div className='flex flex-col w-full'>{children}</div>}
      </div>
    </>
  )
}

export default adminLayout
