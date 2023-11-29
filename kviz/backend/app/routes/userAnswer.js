import express from 'express';
import { saveUserAnswer, getAnswers, getUserAnswersForQuestion } from '../controllers/userAnswer.js';

const router = express.Router();

router.get('/', saveUserAnswer)
router.get('/:questionId', getAnswers)
router.get('/:questionId/user', getUserAnswersForQuestion)


export default router
