'use client';
import React, { useState } from 'react';
import axios from 'axios';

const EbedFelvitel = () => {
  const [selectedType, setSelectedType] = useState('');
  const [name, setName] = useState('');

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://127.0.0.1:8000/ebeds', { name: name, type: selectedType })
      .then((response) => {
        alert('Request was successful:', response.data);
        // You can perform any additional actions on a successful response here
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error(
            'Server responded with status code:',
            error.response.status
          );
          console.error('Server response data:', error.response.data);
        } else if (error.request) {
          // The request was made, but there was no response (e.g., server is not running)
          console.error('No response received. Request failed:', error.request);
        } else {
          // Something happened in setting up the request that triggered an error
          console.error('Error in request setup:', error.message);
        }
      });
  };

  return (
    <div>
      <h1>Új ebéd felvitele</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-6'>
          <label
            htmlFor='name'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Nev
          </label>
          <input
            type='text'
            id='name'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='leves vagy foetel neve'
            required
            onChange={(event) => setName(event.target.value)}
          />
        </div>

        <div className='mb-6'>
          <div className='flex items-start'>
            <input
              id='leves'
              type='checkbox'
              value='leves'
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
              onChange={handleTypeChange}
              checked={selectedType === 'leves'}
            />
            <label
              htmlFor='leves'
              className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              Leves
            </label>
          </div>

          <div className='flex items-start'>
            <input
              id='foetel'
              type='checkbox'
              value='foetel'
              className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800'
              onChange={handleTypeChange}
              checked={selectedType === 'foetel'}
            />
            <label
              htmlFor='foetel'
              className='ml-2 text-sm font-medium text-gray-900 dark:text-gray-300'
            >
              foetel
            </label>
          </div>
        </div>
        <button
          type='submit'
          className='text-white bg-blue-700 hover-bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover-bg-blue-700 dark:focus:ring-blue-800'
        >
          Bekuldes
        </button>
      </form>
    </div>
  );
};

export default EbedFelvitel;
