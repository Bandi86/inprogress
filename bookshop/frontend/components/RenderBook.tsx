'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { booksApi } from '@/constants/api'
import { Book } from '@/types/book'
import Image from 'next/image'
import { Button } from './ui/button'
import { GrFavorite } from 'react-icons/gr'
import Link from 'next/link'

interface Props {
  options?: {
    title: string
    howmuch?: number
    popular?: boolean
    new?: boolean
    discount?: boolean
    rating?: boolean
  }
}

const RenderBook = ({ options }: Props) => {
  const [data, setData] = useState<Book[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(booksApi)
        setData(response.data.books)
      } catch (error: any) {
        console.log(error)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  const handleProps = () => {
    if (options?.howmuch) {
      return data.slice(0, options.howmuch)
    }

    return data
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
                  <Button type='submit'>Add to Cart</Button>
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
