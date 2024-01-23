'use client'
import { useState } from 'react'
import { Book } from '@/types/book'
import Image from 'next/image'
import { Button } from './ui/button'
import { GrFavorite } from 'react-icons/gr'
import Link from 'next/link'
import useBookStore from '@/store/bookStore'
import useCartStore from '@/store/cartStore'
import { rootFetch } from '@/utils/fetch'

interface Props {
  options?: {
    title: string
    howmuch?: number
    popular?: boolean
    new?: boolean
    discount?: boolean
    rating?: boolean
  }
  book?: Book
}

const RenderBook = ({ options, book }: Props) => {
  const [loading, setLoading] = useState<boolean>(false)

  const { books } = useBookStore()
  const {cart} = useCartStore()

  const addToCart = (book: Book) => {
    try {
      rootFetch({
        setCart: useCartStore.getState().setCart,
        cart: cart,
        book: book,
      })
      alert('Book added to cart')
    } catch (error) {
      
    }  
  }

  const handleProps = () => {
    if (options?.howmuch) {
      return books.slice(0, options.howmuch)
    }

    return books
  }

  // 1 book should be rendered to book page

  if (book && !options) {
    return (
      <div className='max-w-5xl mx-auto p-8'>
        <div className='bg-white flex flex-row rounded shadow'>
          <Image
            src={book.image}
            width={150}
            height={150}
            alt={book.title}
            className='rounded-l'
          />
          <div className='flex flex-col items-center w-[10rem] p-4 gap-4'>
            <h2 className='text-xl font-bold mb-2'>Title: {book.title}</h2>
            <Link href={`/author/${book.author}`}>
              <p className='text-gray-600'>Author: {book.author}</p>
            </Link>
            <p className='text-gray-600'>Price: {book.price}</p>
            <GrFavorite />
            <Button type='submit' onClick={() => addToCart(book)}>Add to Cart</Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className='max-w-5xl mx-auto p-8'>
      <h1 className='text-3xl font-bold mb-4'>{options?.title ?? ''}</h1>
      {!loading ? (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {handleProps().length !== 0 ? (
            handleProps().map((item: Book) => (
              <div
                key={item.book_id}
                className='bg-white flex flex-row rounded shadow'
              >
                <Link href={`/book/${item.book_id}`}>
                  <Image
                    src={item.image}
                    width={150}
                    height={150}
                    alt={item.title}
                    className='rounded-l'
                  />
                </Link>
                <div className='flex flex-col items-center w-[10rem] p-4 gap-4'>
                  <h2 className='text-xl font-bold mb-2'>
                    Title: {item.title}
                  </h2>
                  <Link href={`/author/${item.author}`}>
                    <p className='text-gray-600'>Author: {item.author}</p>
                  </Link>
                  <p className='text-gray-600'>Price: {item.price}</p>
                  <GrFavorite />
                  <Button type='submit' onClick={() => addToCart(item)}>Add to Cart</Button>
                </div>
              </div>
            ))
          ) : (
            <div className='text-gray-600'>No books found.</div>
          )}
        </div>
      ) : (
        <div className='text-gray-600'>Loading...</div>
      )}
    </div>
  )
}

export default RenderBook
