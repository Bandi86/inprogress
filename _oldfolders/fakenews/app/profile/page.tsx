import { getServerSideUser } from '@/lib/payload-utils';
import { cookies } from 'next/headers';


const page = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className='text-white flex flex-col p-10 justify-center  gap-6'>
      <h1>Profile page</h1>
      {user ? (
        <div>
          <h2>ID: {user.id}</h2>
          <h2>Nev: {user.name}</h2>
        </div>
      ) : (
        <h2>Not logged in</h2>
      )}
    </div>
  );
};

export default page;
