import UserActivity from '../models/UserActivity.js';

// Példa adat létrehozásra
const createActivity = async (
  userId,
  activityType,
  purchaseAmount,
  cartChanges
) => {
  const activity = new UserActivity({
    userId,
    activityType,
    purchaseAmount,
    cartChanges,
  });
  await activity.save();
};

export { createActivity };

// Használd így:
// Lekérdezés
//createActivity(userId, 'query');
// Módosítás
//createActivity(userId, 'modify', null, cartChangesArray);
// Vásárlás
//createActivity(userId, 'purchase', purchaseAmount);
