import { User } from '../App';

type Props = {
  user: User | null;
};

const Home: React.FC<Props> = ({ user }) => {
  return (
    <section className='flex flex-col items-center justify-center'>
      <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
        {user ? (
          <h1>Hello, {user.name}</h1>
        ) : (
          <h1>
            Hello, Vendégfelhasználó ha szeretned hogy a jatekaid rogzitesre
            keruljenek jelentkezz be.
          </h1>
        )}
      </div>
    </section>
  );
};

export default Home;
