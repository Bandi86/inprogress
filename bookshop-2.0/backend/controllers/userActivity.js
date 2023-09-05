import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import notFound from '../middleware/not-found.js';
import UserActivity from '../models/UserActivity.js';
import { createActivity } from '../fn/user-activity.js';

const getUserActivity = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Ellenőrzés: Van-e felhasználói aktivitás az adott felhasználónak
  const activities = await UserActivity.find({ userId });

  res.status(StatusCodes.OK).json(activities);
});

export default getUserActivity;
