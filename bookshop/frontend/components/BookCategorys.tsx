import React from 'react'

const BookCategorys = () => {
  const categories = [
    'drama',
    'fiction',
    'romance',
    'thriller',
    'horror',
    'mystery',
    'fantasy',
    'comedy',
    'action',
    'adventure',
    'crime',
    'science fiction',
    'biography',
    'history',
    'poetry',
    'self help',
    'others',
  ]

  return (
    <div className='h-14 p-4 flex bg-gray-900 text-white justify-center'>
      <ul className='gap-10 flex pr-4 pl-4 justify-center items-center'>
        {categories.map((category) => (
          <li key={category}>
            <a className='hover:text-gray-200' href='#'>
              {category}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BookCategorys
