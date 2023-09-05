import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

const adminCheckMiddleware = async (req, res, next) => {
  const user = req.user; // A felhasználót tartalmazó token payload

  if (!user) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ error: "Unauthorized" });
  }

  if (user.role !== "admin") {
    return res
      .status(StatusCodes.FORBIDDEN)
      .json({ error: "No permission for this operation" });
  }

  next();
};

export default adminCheckMiddleware;
