import express from "express";
import {
  getAllCategorys,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categories.js"

const router = express.Router();

router.route("/").post(createCategory).get(getAllCategorys);
router
  .route("/:id")
  .get(getCategory)
  .patch(updateCategory)
  .patch(deleteCategory);

export default router;
