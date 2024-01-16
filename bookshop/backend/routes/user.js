import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
  logoutUser,
} from '../controllers/user.js'
import express from 'express'

const router = express.Router()

// CRUD Routes /users
router.get('/', getUsers) // /users
router.get('/:userId', getUser) // /users/:userId
router.get('/logout', logoutUser)
router.post('/', createUser) // /users
router.post('/login', loginUser) // /users/login
router.put('/:userId', updateUser) // /users/:userId
router.delete('/:userId', deleteUser) // /users/:userId

export default router
