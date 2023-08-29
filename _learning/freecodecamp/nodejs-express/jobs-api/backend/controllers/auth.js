import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadrequestError } from "../errors/index.js";
import bcrypt from "bcryptjs";

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const tempUser = { name, email, password: hashedPassword };

  if (!name || !email || !password) {
    throw new BadrequestError("Please provide a name, email, password");
  }
  
  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
});

const login = asyncHandler(async (req, res) => {
  res.send("login user");
});

export { register, login };
