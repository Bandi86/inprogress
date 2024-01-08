import mongoose from "mongoose";

const UserActivitySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  activityType: {
    type: String,
    enum: ['query', 'modify', 'purchase'],
    required: true,
  },
  activityTime: {
    type: Date,
    default: Date.now,
  },
  purchaseAmount: Number, // Vásárlás összértéke (opcionális)
  cartChanges: Array, // Kosár változásai (opcionális)
});

const UserActivity = mongoose.model('UserActivity', UserActivitySchema)

export default UserActivity