import { create } from 'zustand'
import { User } from './types/user'

export type UserStore = {
    user: User;
    setUser: (user: User) => void;
    clearUser: () => void;
  };

const useUserStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    clearUser: () => set({ user: null }),

}))

export default useUserStore
