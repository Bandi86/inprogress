/* import { Article, Comments, User, Like } from '../utils/init.js';

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

    console.log(newLike);

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

// DISLIKE ARTICLE
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

// Create a like for a comment
export const likeComment = async (req, res) => {
  const { commentId } = req.params;
  const { userId } = req.body;

  try {
    // Check if the comment exists
    const comment = await Comments.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // check if comment has already been liked
    const existingLike = await Like.findOne({ where: { commentId, userId } });
    if (existingLike) {
      return res
        .status(400)
        .json({ message: 'User already liked this comment' });
    } else {
      // Create the like
      const newLike = await Like.create({
        commentId: commentId,
        userId: userId,
      });

      res.status(201).json({ message: 'Comment liked successfully', newLike });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get likes for a comment
export const getCommentLikes = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comments.findByPk(commentId, {
      include: [
        {
          model: Like,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // if comment has no like
    if (comment.likes.length === 0) {
      return res.status(404).json({ message: 'No likes for this comment' });
    } else {
      const likes = comment.Likes.map((like) => ({
        likeId: like.likeId,
        likedAt: like.likedAt,
        userName: like.User.name,
      }));

      const response = {
        likes: likes,
        commentId: comment.commentId,
        userId: comment.userId,
        numberOfLikes: likes.length,
      };

      return res.status(200).json(response);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a like for a comment
export const unlikeComment = async (req, res) => {
  const { commentId, likeId } = req.params;

  try {
    const comment = await Comments.findByPk(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    const like = await Like.findByPk(likeId);
    if (!like) {
      return res.status(404).json({ message: 'Like not found' });
    }

    await like.destroy();
    res.status(200).json({ message: 'Comment like removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */
