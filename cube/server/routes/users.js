import express from 'express'
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  register,
  login,
  logoutUser,
} from '../controllers/users.js'

const router = express.Router()

// Users CRUD
router.get('/', getUsers) // all user
router.get('/userId', getUserById) // one user
router.put('/userId', updateUser) // update user
router.delete('/userId', deleteUser) // delete user

// auth
router.get('/logout', logoutUser) // logout
router.post('/register', register) // register
router.post('/login', login) // login

export default router
