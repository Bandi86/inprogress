'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';

const page = () => {
  const [ebedlist, setEbedlist] = useState([]);

  console.log(ebedlist);

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

  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              id
            </th>
            <th scope='col' className='px-6 py-3'>
              nev
            </th>
            <th scope='col' className='px-6 py-3'>
              tipus
            </th>
            <th scope='col' className='px-6 py-3'>
              letrehozva
            </th>
          </tr>
        </thead>
        <tbody>
          {ebedlist.map((ebed) => (
            <tr
              key={ebed.id}
              className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
            >
              <td
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
              >
                {ebed.id}
              </td>
              <td className='px-6 py-4'>{ebed.name}</td>
              <td className='px-6 py-4'>{ebed.type}</td>
              <td className='px-6 py-4'>{ebed.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default page;
