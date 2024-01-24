import { cartApi } from '@/constants/api'
import { Book } from '@/types/book'
import axios from 'axios'
//import { cookies } from 'next/headers'

const addToCart = async (book: Book) => {
 /*  const cookieStore = cookies()
  const token = cookieStore.get('jwt') */

  // get the full book from props what added the user to cart
  const res = await axios.post(cartApi, book)
  if (res.status === 200) {
    console.log('book added to cart')
  } else {
    console.log('error')
  }
}

export default addToCart
