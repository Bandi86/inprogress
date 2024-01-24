import express from 'express'
import { getCart } from '../controllers/cart/getCart.js'
import { createCart } from '../controllers/cart/createCart.js'
import { updateCart } from '../controllers/cart/updateCart.js'
import { deleteCart } from '../controllers/cart/deleteCart.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

router.get('/:cart_id', authenticate, getCart)
router.post('/', authenticate, createCart)
router.put('/:cart_id', authenticate, updateCart)
router.delete('/:cart_id', authenticate, deleteCart)

export default router