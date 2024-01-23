import express from 'express'
import { getCart } from '../controllers/cart/getCart.js'
import { createCart } from '../controllers/cart/createCart.js'
import { updateCart } from '../controllers/cart/updateCart.js'
import { deleteCart } from '../controllers/cart/deleteCart.js'

const router = express.Router()

router.get('/:cart_id', getCart)
router.post('/', createCart)
router.put('/:cart_id', updateCart)
router.delete('/:cart_id', deleteCart)

export default router