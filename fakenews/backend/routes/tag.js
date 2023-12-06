import express from 'express';
import { getAllTag, createTag } from '../controllers/tagController.js';
const router = express.Router();

router.get('/', getAllTag);
router.post('/', createTag);

export default router;
