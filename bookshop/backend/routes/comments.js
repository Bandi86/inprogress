import express from 'express'
import allComments from '../controllers/comments/allComments.js'
import getComment from '../controllers/comments/getComment.js'
import createComment from '../controllers/comments/createComment.js'
import deleteComment from '../controllers/comments/deleteComment.js'
import updateComment from '../controllers/comments/updateComment.js'


const router = express.Router()

router.get('/', allComments)
router.get('/:comment_id', getComment)
router.post('/', createComment)
router.delete('/:comment_id', deleteComment)
router.put('/:comment_id', updateComment)

export default router