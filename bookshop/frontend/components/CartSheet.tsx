import React from 'react'
import useCartStore from '@/store/cartStore'
import { Cart } from '@/types/cart';

const CartSheet = () => {

  const cart = useCartStore(state => state.cart) as Cart[]

  console.log(cart);
  

  return (
    <div className='max-w-5xl mx-auto p-8'>
      <div className='bg-white flex flex-row rounded shadow'>
        <div className='flex flex-col w-1/2 p-8'>
          <h1 className='text-2xl font-bold'>{cart[0].book.title}</h1>
          <p className='text-gray-400 text-sm'>{cart[0].book.author}</p>
          <p className='text-gray-400 text-sm'>{cart[0].book.price}</p>
          
        </div>
        
      </div>
    </div>

  )

}
export default CartSheet