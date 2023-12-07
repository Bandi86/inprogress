import express from 'express';
import {
  getAllArticles,
  createArticle,
  getArticlesByUser,
  getArticleByTags,
  getArticleById,
  deleteArticle,
  editArticle,
  getArticleByCategory
} from '../controllers/articleController.js';
import { getAllCommentsForArticle, createComment } from '../controllers/commentsController.js';


const router = express.Router();

router.get('/', getAllArticles);
router.post('/', createArticle);
router.patch('/:articleId', editArticle);
router.delete('/:articleId', deleteArticle);
/* router.post('/:articleId/like', likeArticle);
router.delete('/:articleId/like', dislike);
router.get('/:articleId/like', getArticleLikesByUser); */

router.get('/:articleId', getArticleById);
router.get('/user/:name', getArticlesByUser);
router.get('/category/:categoryName', getArticleByCategory); 

router.get('/tags/:tagName', getArticleByTags);

// Komment végpontok
router.get('/:articleId/comments', getAllCommentsForArticle);
router.post('/:articleId/comments', createComment);

/* // Komment végpontok
router.post('/:articleId/comments', createComment);
router.get('/user/:userId/comments', getCommentsByUser);
router.put('/comments/:commentId', editComment);
router.delete('/comments/:commentId', deleteComment); */

export default router;
