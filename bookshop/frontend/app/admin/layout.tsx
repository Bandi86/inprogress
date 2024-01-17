'use client'

import Sidebar from '@/components/admin/SideBar'
import { useRouter } from 'next/navigation'

const adminLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const user = localStorage.getItem('user') || ''
  const { role } = JSON.parse(user as string)
  return (
    <>
      { role && role === 'admin' ? (
        <div className='flex flex-row h-full bg-slate-800 text-white'>
          <Sidebar />
          {children && (
            <div className='flex flex-col w-full items-center justify-center'>
              {children}
            </div>
          )}
        </div>
      ) : (
        router.push('/')
      )}
    </>
  )
}

export default adminLayout
