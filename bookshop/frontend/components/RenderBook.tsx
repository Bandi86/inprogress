"use client"

import { booksApi } from '@/constants/api'
import { Book } from '@/types/book'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Props {
  options?: {
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
        console.log(response.data.books)

        setData(response.data as Book[])
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

  if (options) {
    handleProps()
  }

  return (
    <div>
      <h1>Book</h1>
      {!loading ? (
        <div>
          {data.length !==0 &&
            (data as Book[]).map((item: Book) => (
              <div key={item.book_id}>
                <h1>{item.title}</h1>
                <p>{item.description}</p>
                <img src={item.image} alt={item.title} />
              </div>
            ))}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

export default RenderBook
