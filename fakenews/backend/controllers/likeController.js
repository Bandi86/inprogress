import Article from '../models/Articles.js';
import User from '../models/Users.js';
import Like from '../models/Like.js';

// Cikk lajkolása
export const likeArticle = async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.body;

  try {
    // Ellenőrizzük, hogy a cikk és a felhasználó létezik-e
    const article = await Article.findOne({ where: { articleId } });
    const user = await User.findOne({ where: { userId } });

    if (!article || !user) {
      return res.status(404).json({ message: 'Article or user not found' });
    }

    // Ellenőrizzük, hogy a felhasználó már lájkolta-e a cikket
    const existingLike = await Like.findOne({ where: { userId, articleId } });

    if (existingLike) {
      return res
        .status(400)
        .json({ message: 'User already liked this article' });
    }

    // Hozzáadjuk a lajkot a Like táblához
    const newLike = await Like.create({ userId, articleId });

    res.status(201).json({ message: 'Article liked successfully', newLike });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cikk lajkjainak lekérdezése userre nezve
export const getArticleLikesByUser = async (req, res) => {
  const { articleId } = req.params;

  try {
    const likes = await Like.findAll({
      where: { articleId },
      include: [
        {
          model: User,
          attributes: ['userId', 'name'],
        },
      ],
    });

    if (likes.length > 0) {
      res.status(200).json({ likes });
    } else {
      res.status(404).json({ message: 'User has not liked any post' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DISLIKE
export const dislike = async (req, res) => {
  const { articleId } = req.params;
  const { userId } = req.body;

  try {
    // Ellenőrizzük, hogy a cikk és a felhasználó létezik-e
    const article = await Article.findOne({ where: { articleId } });
    const user = await User.findOne({ where: { userId } });

    if (!article || !user) {
      return res.status(404).json({ message: 'Article or user not found' });
    }

    // Keresd meg és töröld azt a like-ot, amelyet a felhasználó adott az adott cikkhez
    const likeToDelete = await Like.findOne({ where: { userId, articleId } });

    if (!likeToDelete) {
      return res.status(404).json({ message: 'Like not found' });
    }

    await likeToDelete.destroy();

    res.status(200).json({ message: 'Article disliked successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
