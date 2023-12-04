'use client';

import Navbar from '@/components/Navbar';
import { useUser } from '@/contexts/userContext';

export default function Home() {
  const { user } = useUser();

  return (
    <>
      {user !== null &&
      Object.keys(user).length !== 0 &&
      user.role === 'user' ? (
        <Navbar />
      ) : null}

      <h2>Hello</h2>
    </>
  );
}
