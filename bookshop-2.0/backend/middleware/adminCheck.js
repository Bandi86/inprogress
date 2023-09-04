import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

const adminCheckMiddleware = async (req, res, next) => {
  const { id } = req.user;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    if (user.role !== "admin") {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ error: "No permission for this operation" });
    }

    next();
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Server error" });
  }
};

export default adminCheckMiddleware;
