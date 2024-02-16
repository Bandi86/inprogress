import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import bcrypt from 'bcrypt'

const saltRounds = 10

// all user
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await User.findAll()
  res.status(200).json(users)
})

// one user
export const getUserById = asyncHandler(async (req, res, next) => {})

// update user
export const updateUser = asyncHandler(async (req, res, next) => {})

export const deleteUser = asyncHandler(async (req, res, next) => {})

// register
export const register = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body

  // Check if the user already exists in the database
  const existingUser = await User.findOne({ where: { email: email } })
  if (existingUser) {
    return res
      .status(409)
      .json({ message: 'This email is used try another one' })
  }

  // Check the username in the database
  const existingUsername = await User.findOne({
    where: { username: username },
  })

  if (existingUsername) {
    return res.status(409).json({
      message: 'This username is already used try another one',
    })
  }

  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  })

  user.password = undefined
  res.status(201).json(user)
})

// login
export const login = asyncHandler(async (req, res, next) => {})

// logout
export const logoutUser = asyncHandler(async (req, res, next) => {})
