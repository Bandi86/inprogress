import { create } from 'zustand'
import { User } from './types/user'

export type UserStore = {
  user: User
  setUser: (user: User) => void
  clearUser: () => void
}

const useUserStore = create<UserStore>((set) => {
  // Felhasználói adatok betöltése a localStorage-ből az inicializálás során
  const storedUser = typeof localStorage !== 'undefined' ? localStorage.getItem('user') : null;
  const initialState = storedUser ? { user: JSON.parse(storedUser) } : { user: null };

  return {
    ...initialState,
    setUser: (user: User) => {
      set({ user });
      // Felhasználói adatok mentése a localStorage-be
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
    clearUser: () => {
      set({ user: null });
      // Felhasználói adatok törlése a localStorage-ből
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('user');
      }
      // remove cookie
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    },
  };
});

export default useUserStore
