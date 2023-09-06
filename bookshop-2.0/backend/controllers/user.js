import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import notFound from '../middleware/not-found.js';
import User from '../models/User.js';

// GET ALL USER
const getAllUser = asyncHandler(async (req, res) => {  
  const users = await User.find({}).sort('createdAt');
  if (!users) throw new notFound('no users found');
  res.status(StatusCodes.OK).json({ users, count: users.length });
});

// GET SINGLE USER
const getUser = asyncHandler(async (req, res) => {  
  const {
    params: { id: userId },
  } = req;

  const user = await User.findOne({
    _id: userId,
  });
  if (!user) throw new notFound(`No user with this id: ${userId}`);
  res.status(StatusCodes.OK).json({ user });
});

// UPDATE USER
/* const updateUser = asyncHandler(async(req,res) => {
    adminCheckMiddleware(req,res)
    const {params: {id: userId}} = req
    
    const user = await User.findOne({
        _id: userId
    })
    if (!user) throw new notFound(`No user with this id: ${userId}`)


}) */

// DELETE USER
const deleteUser = asyncHandler(async (req, res) => {  
  const {
    params: { id: userId },
  } = req;

  const user = await User.findOne({
    _id: userId,
  });
  if (!user) throw new notFound(`No user with this id: ${userId}`);

  const deletingUser = await User.findOneAndRemove(userId);
  if (deleteUser) return res.status(StatusCodes.NO_CONTENT);
  res.status(StatusCodes.OK).json('User is deleted');
});

export { getAllUser, getUser, deleteUser };
