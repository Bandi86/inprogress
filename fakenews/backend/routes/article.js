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
/* import {
  dislike,
  getArticleLikesByUser,
  likeArticle,
} from '../controllers/likeController.js';
import {
  getAllCommentsForArticle,
  createComment,
  getCommentsByUser,
  editComment,
  deleteComment,
} from '../controllers/commentsController.js'; */

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
router.get('/tags/:tagName', getArticleByTags);

/* // Komment végpontok
router.get('/:articleId/comments', getAllCommentsForArticle);
router.post('/:articleId/comments', createComment);
router.get('/user/:userId/comments', getCommentsByUser);
router.put('/comments/:commentId', editComment);
router.delete('/comments/:commentId', deleteComment); */

export default router;
