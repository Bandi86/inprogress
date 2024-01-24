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
import authenticate from '../middleware/auth.js'

const router = express.Router()

// CRUD Routes /users
router.get('/', authenticate, getUsers) // /users
router.get('/:userId', authenticate, getUser) // /users/:userId
router.get('/logout', authenticate, logoutUser)
router.post('/', createUser) // /users
router.post('/login', loginUser) // /users/login
router.put('/:userId', authenticate, updateUser) // /users/:userId
router.delete('/:userId', authenticate, deleteUser) // /users/:userId

export default router
