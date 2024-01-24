import Comments from '../../models/comments.js'
import User from '../../models/user.js'

const getComment = async (req, res) => {
    const { book_id } = req.params
    try {
        const comments = await Comments.findAll({
            where: { book_id },
            attributes: ['comment_id', 'comment', 'user_id', 'book_id'],
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['username', 'email'],
                },
            ],
        })
        if (comments.length === 0) {
            return res.status(404).json({ message: 'No comments found!' })
        }
        res.status(200).json({ comments })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export default getComment