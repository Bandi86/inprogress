import User from '../models/Users.js';

export const profileRouter = async (req, res) => {
    const userId = req.params.id;
    

    try {
        // check id user id exists
        const user = await User.findByPk(userId);
       
        if (!user) {
          return res.status(404).json({ message: 'User not found!' });
        }
    
        // A felhasználó profiladatainak visszaadása
        res.status(200).json({
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
          // ... többi adat, amit vissza akarsz küldeni
        });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};
