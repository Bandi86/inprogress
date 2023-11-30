import express from 'express';
import {
  getQuestion,
  getQuestions,
  getQuestionsByCategory,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/questions.js';

const router = express.Router(); 

router.get('/', getQuestions);
router.get('/:questionId', getQuestion);
router.get('/:category', getQuestionsByCategory);
router.post('/', createQuestion);
router.put('/:questionId', updateQuestion);
router.delete('/:questionId', deleteQuestion);


export default router;
