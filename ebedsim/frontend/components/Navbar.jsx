import React from 'react';

const Navbar = () => {
  return (
    <nav class='font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-black shadow sm:items-baseline w-full'>
      <div class='mb-2 sm:mb-0'>
        <a
          href='/'
          class='text-2xl no-underline text-grey-darkest hover:text-blue-dark'
        >
          Kezdolap
        </a>
      </div>
      <div>
        <a
          href='/ujebed'
          class='text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2'
        >
          uj ebed felvitele
        </a>

        <a
          href='/osszesebedlista'
          class='text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2'
        >
          osszes ebed listaja
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
