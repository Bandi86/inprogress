import React, { useState } from 'react';
import { User } from '../App';
import Game from './game/Game';

type Props = {
  user: User | null;
};

const Home: React.FC<Props> = ({ user }) => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <section className='flex flex-col items-center justify-center'>
      {!gameStarted && (
        <div className='py-20 mx-auto text-center flex flex-col items-center max-w-3xl'>
          {user ? (
            <h1>Hello, {user.name}</h1>
          ) : (
            <h1>
              Hello, Vendégfelhasználó ha szeretnéd, hogy a játékaid rögzítésre
              kerüljenek, jelentkezz be.
            </h1>
          )}
        </div>
      )}
      <div>
        {!gameStarted && (
          <button
            onClick={handleStartGame}
            className='bg-blue-500 rounded-md h-14 p-4 items-center font-semibold text-white hover:bg-blue-600'
          >
            Játék Megkezdése
          </button>
        )}
      </div>
      {gameStarted && <Game userId={user?.id ? user.id : null} />}
    </section>
  );
};

export default Home;
