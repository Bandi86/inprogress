// custom hook to check if user is authenticated or not

import useUserStore from '@/store'
import { useEffect } from 'react'

export default function useAuth() {
  const { user, setUser } = useUserStore()

  useEffect(() => {
    if (user === null) {
      const data = localStorage.getItem('user')
      if (data) {
        const parsed = JSON.parse(data)
        setUser(parsed)
      }
    }
  }, [user])
}
