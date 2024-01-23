export type Cart = {
  cart_id: string
  user_id: string
  total_price: number
  total_items: number
  quantity: number
  is_checked_out: boolean
  date_checked_out: Date
  createdAt: Date
  updatedAt: Date
}
