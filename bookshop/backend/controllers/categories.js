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
    // check if category already exists
    const categoryExists = await Category.findOne({
      where: { category_name },
    })
    if (categoryExists) {
      return res.status(400).json({ error: 'Category already exists' })
    } else {
      const category = await Category.create({ category_name })
      res.status(201).json({ category })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// update category

// delete category
export const deleteCategory = async (req, res) => {
  try {
    const { category_id } = req.params
    console.log(req.params);
    const category = await Category.findOne({ where: { category_id } })
    if (category) {
      await category.destroy()
      res.status(204).json({ message: 'Category deleted' })
    } else {
      res.status(404).json({ error: 'Category not found' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
