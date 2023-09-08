import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  // Check header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ error: "Authentication invalid" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);    
    
    const user = await User.findById(payload.id).select("-password");

    if (!user) {
      return res.status(401).json({ error: "Authentication invalid" });
    }

    req.user = user;

    // Ellenőrizd az admin jogosultságot
    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ error: "No permission for this operation" });
    }

  } catch (error) {
    return res.status(401).json({ error: "Authentication invalid" });
  }
  next();
};

export default authMiddleware;


