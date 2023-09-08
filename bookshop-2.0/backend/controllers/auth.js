import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';
import { BadrequestError, UnauthenticatedError } from '../errors/index.js';
import generateToken from '../utils/generateToken.js';

const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new BadrequestError('Please provide a name, email, password');
  }

  const userExits = await User.findOne({ email });

  if (userExits) {
    res.status(StatusCodes.BAD_REQUEST);
    throw new BadrequestError('User Already Exists');
  }

  const user = await User.create({ ...req.body });
  if (user) {
    const newUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
    generateToken(res, user._id);
    res.status(StatusCodes.CREATED).json({ newUser });
  } else {
    res.status(StatusCodes.BAD_REQUEST);
    throw new BadrequestError('Invalid user data');
  }  
  console.log(`registration succes, ${user}`);
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new BadrequestError('Please provide email and password'));
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials');
  }

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials');
  } else {
    generateToken(res, user._id);
    res
      .status(StatusCodes.OK)
      .json({
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },        
      });
  }  
  console.log(`login success, name: ${user.name} email: ${user.email}`);
});

const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(StatusCodes.OK).json({ message: 'User logged out' });
});

export { register, login, logout };
