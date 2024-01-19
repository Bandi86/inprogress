import Category from '../models/category.js'

// all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll()
    res.status(200).json({ categories, length: categories.length })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// single category

// create category
export const createCategory = async (req, res) => {
  try {
    const { category_name } = req.body
    const category = await Category.create({ category_name })
    res.status(201).json({ category })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// update category

// delete category
