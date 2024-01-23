import express from 'express'

const router = express.Router()

router.get('/', allComments)
router.get('/:comment_id', getComment)
router.post('/', createComment)
router.delete('/:comment_id', deleteComment)
router.put('/:comment_id', updateComment)

export default router