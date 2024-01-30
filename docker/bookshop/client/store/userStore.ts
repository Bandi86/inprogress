import { create } from 'zustand'
import { User } from '@/types/user'

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

const useUserStore = create<UserStore>((set) => {
  const storedUser =
    typeof localStorage !== 'undefined' ? localStorage.getItem('user') : null
  const initialState = storedUser
    ? { user: JSON.parse(storedUser) }
    : { user: null }

  return {
    ...initialState,
    setUser: (user: User) => {
      set({ user })

      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user))
      }
    },
    clearUser: () => {
      set({ user: null })

      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('user')
      }
      // remove cookie
      document.cookie = 'jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    },
  }
})

export default useUserStore
