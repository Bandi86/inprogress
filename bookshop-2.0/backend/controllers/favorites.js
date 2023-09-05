import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { BadrequestError } from "../errors/bad-request.js";
import notFound from "../middleware/not-found.js";
import adminCheckMiddleware from "../middleware/adminCheck.js";
import Favorites from "../models/Favorites.js";

// GET ALL FAVORITES
const getAllFavorites = asyncHandler(async (req, res) => {
  adminCheckMiddleware(req, res, async () => {
    // Keresési szűrők beolvasása a kérésből (pl. felhasználó azonosítója, könyv azonosítója stb.)
    const { userId, bookId } = req.query;
    // Alap lekérdezés: Minden kedvenc
    const query = {};

    // Szűrés felhasználó szerint, ha meg van adva userId
    if (userId) {
      query.user = userId;
    }

    // Szűrés könyv szerint, ha meg van adva bookId
    if (bookId) {
      query.books = { $in: [bookId] };
    }

    const favorites = await Favorites.find(query).sort("createdAt");

    if (!favorites || favorites.length === 0) {
      throw new notFound("You do not have favorites yet");
    }

    res.status(StatusCodes.OK).json({ favorites, count: favorites.length });
    /*  const favorites = await Favorites.find({}).sort("createdAt");
    if (!favorites) throw new notFound("you not have favorites yet");
    res.status(StatusCodes.OK).json({ favorites, count: favorites.length }); */
  });
});

// ADD FAVORITES
const addFavorites = asyncHandler(async (req, res) => {
  adminCheckMiddleware(req, res, async () => {
    const newFavorites = new Favorites(req.body);
    await newFavorites.save();
    res.status(StatusCodes.CREATED).json(newFavorites);
  });
});

// DELETE FAVORITE
const deleteFavorites = asyncHandler(async (req, res) => {
  adminCheckMiddleware(req, res, async () => {
    const {
      params: { id: bookId },
    } = req;
    const favorite = await Favorites.findOneAndDelete({ _id: bookId });
    if (!favorite) throw notFound(`No favorite found with this id: ${bookId}`);
  });
  res.status(StatusCodes.OK).json({ message: "Favorite deleted successfully" });
});

export {getAllFavorites, addFavorites, deleteFavorites}