import User from '../models/Users.js';
import Tag from '../models/Tags.js';
import Article from '../models/Articles.js';
import Like from '../models/Like.js';

const recreateDatabase = async () => {
  try {
    await User.sync({ force: true });
    await Tag.sync({ force: true });
    await Article.sync({ force: true });    
    await Like.sync({ force: true });
    console.log('Az összes tábla sikeresen újra létrehozva!');
  } catch (error) {
    console.error('Hiba történt a táblák újra létrehozása közben:', error);
  }
};

recreateDatabase();

export default recreateDatabase;
