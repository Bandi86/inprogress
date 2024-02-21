import asyncHandler from 'express-async-handler'
import User from '../models/user.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'

const saltRounds = 10

// all user
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll()
  res.status(200).json(users)
})

// one user
export const getUserById = asyncHandler(async (req, res) => {})

// update user
export const updateUser = asyncHandler(async (req, res) => {})

export const deleteUser = asyncHandler(async (req, res) => {})

// register
export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  // Check if the user already exists in the database
  const existingUser = await User.findOne({ where: { email: email } })
  if (existingUser) {
    return res.status(409).json({ message: 'This email is used try another one' })
  }

  // Check the username in the database
  const existingUsername = await User.findOne({
    where: { username: username }
  })

  if (existingUsername) {
    return res.status(409).json({
      message: 'This username is already used try another one'
    })
  }

  const salt = await bcrypt.genSalt(saltRounds)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = await User.create({
    username,
    email,
    password: hashedPassword
  })

  user.password = undefined
  res.status(201).json(user)
})

// login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) return res.status(400).json({ error: 'Please fill all fields.' })

  // check if user exists
  const user = await User.findOne({ email })

  if (!user) return res.status(401).json({ error: 'email or password wrong' })

  // compare password
  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) return res.status(401).json({ error: 'email or password wrong' })

  // check if user already has a token
  if (req.cookies && req.cookies.token) {
    jwt.verify(req.cookies.token, process.env.JWT_SECRET)
    return res.status(400).json({ error: 'user already logged in' })
  }

  // generate token
  generateToken(res, user._id, user.isAdmin)

  // update lastLogin_at in db
  user.lastLogin_at = new Date()
  await user.save()

  user.password = undefined

  res.status(200).json(user)
})

// logout
export const logoutUser = asyncHandler(async (req, res) => {})
