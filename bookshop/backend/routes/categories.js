import express from 'express'
import { getAllCategories, createCategory } from '../controllers/categories.js'

const router = express.Router()

// CRUD Routes /categories

router.get('/', getAllCategories)
router.post('/', createCategory)

export default router