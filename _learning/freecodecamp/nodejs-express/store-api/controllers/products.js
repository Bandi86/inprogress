import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/custom-error.js";

const getAllProductsStatic = asyncWrapper(async (req, res) => {
  res.status(200).json({ msg: "products testing route" });
});

const getAllProducts = asyncWrapper(async (req, res) => {
  res.status(200).json({ msg: "products route" });
});

export { getAllProductsStatic, getAllProducts };
