import express from 'express';
import { getAllTag } from '../controllers/tagController.js';
const router = express.Router();

router.get('/', getAllTag);

export default router;
