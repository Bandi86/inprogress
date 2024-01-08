import express from 'express';
import {
  getCart,
  createCart,
  updateCart,
  deleteCart,
  deleteItem,
} from '../controllers/cart.js';

const router = express.Router();

router.get('/:userId', getCart);
router.post('/:userId', createCart);
router.put('/:userId', updateCart);
router.delete('/userId/items/:bookId', deleteItem);
router.delete('/:userId', deleteCart);

export default router;
