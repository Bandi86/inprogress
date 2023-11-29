import Category from '../models/category.js';

//get all categorys
export const getCategorys = async (req, res) => {
  try {
    const categorys = await Category.findAll();
    res.status(200).json(categorys);
  } catch (error) {
    console.log(error);
  }
};

//get catogory by id
export const getCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found!' });
    }
    res.status(200).json(category);
  } catch (error) {
    console.log(error);
  }
};

//create category
export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({
      name: name,
    });
    res.status(201).json(category);
  } catch (error) {
    console.log(error);
  }
};

//update category
export const updateCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found!' });
    }
    const updatedCategory = await category.update({
      name: name,
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log(error);
  }
};

//delete category
export const deleteCategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Category not found!' });
    }
    await category.destroy();
    res.status(204).json({ message: 'Category deleted!' });
  } catch (error) {
    console.log(error);
  }
};
