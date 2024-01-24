import express from 'express'
import { getAllCategories, createCategory, deleteCategory } from '../controllers/categories.js'
import authenticate from '../middleware/auth.js'

const router = express.Router()

// CRUD Routes /categories

router.get('/', getAllCategories)
router.post('/', authenticate, createCategory)
router.delete('/:category_id', authenticate, deleteCategory)

export default router