// Like-ok számának lekérdezése egy adott cikkhez
import Like from "../models/Like.js";

export const getNumberOfLikesForArticle = async (articleId) => {
  try {
    const numberOfLikes = await Like.count({ where: { articleId } });
    return numberOfLikes;
  } catch (error) {
    throw new Error(error.message);
  }
};
