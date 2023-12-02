import {
  User,
  Tag,
  Article,
  Like,
  CommentReply,
  Comments,
} from '../utils/init.js';

const recreateDatabase = async () => {
  try {
    await User.sync({ force: true });
    await Tag.sync({ force: true });
    await Article.sync({ force: true });
    await Like.sync({ force: true });
    await CommentReply.sync({ force: true });
    await Comments.sync({ force: true });

    console.log('Az összes tábla sikeresen újra létrehozva!');
  } catch (error) {
    console.error('Hiba történt a táblák újra létrehozása közben:', error);
  }
};

recreateDatabase();

export default recreateDatabase;
