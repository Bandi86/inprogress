import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import Category from "../models/Categories.js";
import notFound from "../middleware/not-found.js";
import { BadrequestError } from "../errors/bad-request.js";
import adminCheckMiddleware from "../middleware/adminCheck.js";

// GET ALL CATEGORIES
const getAllCategorys = asyncHandler(async (req, res) => {
  const categories = await Category.find({ isDeleted: false });
  if (!categories) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "failed to fetch categories" });
  } else
    res.status(StatusCodes.OK).json({ categories, count: categories.length });
});

// GET SINGLE CATEGORIE
const getCategory = asyncHandler(async (req, res) => {
  const {
    params: { id: categorieId },
  } = req;
  const singleCategorie = await Category.findOne({
    _id: categorieId,
  });
  if (!singleCategorie)
    throw new notFound(`No categorie with this id: ${categorieId}`);
  res.status(StatusCodes.OK).json({ singleCategorie });
});

// CREATE CATEGORIE
const createCategory = asyncHandler(async (req, res) => {
  adminCheckMiddleware(req, res, async () => {
    const newCategorie = new Category(req.body);
    await newCategorie.save();
    res.status(StatusCodes.CREATED).json(newCategorie);
  });
});

// UPDATE CATEGORY
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Az admin jogosultság ellenőrzése az adminCheckMiddleware segítségével
  // Ha a felhasználó nem admin, akkor a middleware hibaüzenetet küld vissza
  // Ha admin, folytatja a kódot
  adminCheckMiddleware(req, res, async () => {
    // Check if category exists
    const idExists = await Category.findById(id);
    if (!idExists) {
      throw new notFound(`No category with id: ${id}`);
    }

    // update category in db
    const category = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );
    if (!category) {
      throw new BadrequestError("Category update failed");
    }

    res.status(StatusCodes.OK).json({ category });
  });
});

// DELETE CATEGORY
const deleteCategory = asyncHandler(async (req, res) => {
  const {
    params: { id: categoryId },
  } = req;

  // Az admin jogosultság ellenőrzése az adminCheckMiddleware segítségével
  // Ha a felhasználó nem admin, akkor a middleware hibaüzenetet küld vissza
  // Ha admin, folytatja a kódot
  adminCheckMiddleware(req, res, async () => {
    const category = await Category.findOne({
      _id: categoryId,
    });

    if (!category) {
      throw new notFound(`No category with id: ${categoryId}`);
    }

    // patch Category argument isDeleted to true
    const isDeleted = true;
    const deletingCategory = await Category.findByIdAndUpdate(
      categoryId,
      { isDeleted },
      { new: true }
    );

    if (!deletingCategory) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: "Category deletion failed" });
    }

    res.status(StatusCodes.OK).json({ message: "Category is deleted" });
  });
});

export {
  getAllCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
