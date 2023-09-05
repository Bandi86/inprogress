import UserActivity from '../models/UserActivity.js';

// Az aktivitás middleware
const logUserActivity = async (req, res, next) => {
  try {
    // Gyűjtsd össze az aktivitás adatait a kérésből
    const userId = req.user.id; // Például az aktuális felhasználó azonosítója
    const activityType = 'modify'; // Például módosítás
    const purchaseAmount = req.body.purchaseAmount; // Például vásárlás összértéke
    const cartChanges = req.body.cartChanges; // Például kosár változásai

    // Rögzítsd az aktivitást az adatbázisban
    const activity = new UserActivity({
      userId,
      activityType,
      purchaseAmount,
      cartChanges,
    });
    await activity.save();

    // Folytasd a kérés feldolgozását
    next();
  } catch (error) {
    // Kezeld az esetleges hibákat
    console.error('Error logging user activity:', error);
    next(error);
  }
};

// A middleware utáni további útvonalak és vezérlők
// ...

export default logUserActivity;
