import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @ desc Auth user/set token
// route POST/api/users/auth
// @acces Public

// VALIDATION

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @ desc Register user
// route POST/api/users
// @acces Public

//Register user

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.status(200).json({ message: "Register User" });
});

// @ desc Logout user
// route POST/api/users/logout
// @acces Public

//Logout user

const logoutUser = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Logout User" });
});

// @ desc get User Profile
// route GET api/users/profile
// @acces Private

const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get User Profile" });
});

// @ desc Update User Profile
// route PUTH api/users/profile
// @acces Private

const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update User Profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
