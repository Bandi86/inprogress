import express from 'express';
import {
  getAllArticles,
  createArticle,
  getArticlesByUser,
  getArticleByTags,
  getArticleById,
  deleteArticle,
  editArticle,
} from '../controllers/articleController.js';
import { dislike, getArticleLikesByUser, likeArticle } from '../controllers/likeController.js';

const router = express.Router();

router.get('/', getAllArticles);
router.post('/', createArticle);
router.patch('/:articleId', editArticle)
router.delete('/:articleId', deleteArticle)
router.post('/:articleId/like', likeArticle);
router.delete('/:articleId/like', dislike)
router.get('/:articleId/like', getArticleLikesByUser)

router.get('/:articleId', getArticleById);
router.get('/user/:name', getArticlesByUser);
router.get('/tags/:tagName', getArticleByTags);


export default router;
