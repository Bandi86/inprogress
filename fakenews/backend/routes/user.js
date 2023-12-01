import express from 'express';
import { allUser, getUser, createUser, updateUser, deleteUser, updateUserEmail } from '../controllers/userController.js';

const router = express.Router();

router.get('/', allUser)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.patch('/:id', updateUserEmail)
router.delete('/:id', deleteUser)


export default router;