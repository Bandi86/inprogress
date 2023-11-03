'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Home() {
  const [generaltHet, setGeneraltHet] = useState([]);
  const [ebedlist, setEbedlist] = useState([]);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/ebeds').then((response) => {
      const formattedData = response.data.map((item) => {
        return {
          ...item,
          created_at: new Date(item.created_at).toLocaleString(),
        };
      });

      setEbedlist(formattedData);
    });
  }, []);

  function etelGeneralas() {
    // a fetchelt adatbol generalni 7 levest es 7 foetelt ami az elmult 14napban nem fordult elo
  }

  function generaltHetNapjai() {
  // aznap csekkolasa ezutan az elozo 7 nap datumanak elmentese egy valtozoba

  }
 

  return (
    <main>
      <h1>Hello</h1>
      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                elozo 7 nap
              </th>
              <th scope='col' className='px-6 py-3'>
                nev
              </th>
              <th scope='col' className='px-6 py-3'>
                leves
              </th>
              <th scope='col' className='px-6 py-3'>
                foetel
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                kovetkezo 7 nap
              </th>
              <th scope='col' className='px-6 py-3'>
                nev
              </th>
              <th scope='col' className='px-6 py-3'>
                leves
              </th>
              <th scope='col' className='px-6 py-3'>
                foetel
              </th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </main>
  );
}
