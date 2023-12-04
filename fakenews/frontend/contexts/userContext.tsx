"use client"
import { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/types';

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Ez a hatás csak egyszer fog lefutni a komponens életciklusa során,
  // és beállítja a felhasználót a localStorage-ból, ha van ott ilyen adat
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    setUser(storedUser);
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};