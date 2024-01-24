import { Book } from './book'

export type Cart = {
  books: Book[]
  cart_id: string
  user_id: string
  quantity: number
  total_price: number
  total_items: number
  is_checked_out: boolean
  date_checked_out: Date
  createdAt: Date
  updatedAt: Date
}
