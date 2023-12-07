import { User, Article, Comments } from '../models/relacio.js';

// ALL COMMENTS BY ARTICLE ID
export const getAllCommentsForArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    // SEARCH ARTICLE BY ID
    const article = await Article.findOne({ where: { articleId } });
    if (!article) {
      return res.status(404).json({ message: 'No article with this id' });
    }

    // FIND ALL COMMENTS
    const comments = await Comments.findAll({ where: { articleId } });

    res.status(200).json({ comments, length: comments.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE NEW COMMENT
export const createComment = async (req, res) => {
  const { articleId } = req.params;
  const { content, userId } = req.body;

  try {
    const user = await User.findByPk(userId);
    // check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    // check if article exists
    const article = await Article.findOne({ where: { articleId } });
    if (!article) {
      return res.status(404).json({ message: 'No article with this id' });
    }

    // ADD COMMENT TO ARTICLE
    const newComment = await Comments.create({
      content,
      userId,
      articleId,
    });

    res.status(201).json({ message: 'Comment added to article', newComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* import { Article, Comments, User, CommentReply } from '../utils/init.js';

// ALL COMMENTS BY ARTICLE ID
export const getAllCommentsForArticle = async (req, res) => {
  const { articleId } = req.params;

  try {
    // SEARCH ARTICLE BY ID
    const article = await Article.findOne({ where: { articleId } });
    if (!article) {
      return res.status(404).json({ message: 'No article with this id' });
    }

    // FIND ALL COMMENTS
    const comments = await Comments.findAll({ where: { articleId } });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE NEW COMMENT
export const createComment = async (req, res) => {
  const { articleId } = req.params;
  const { content, userId } = req.body;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const article = await Article.findOne({ where: { articleId } });
    if (!article) {
      return res.status(404).json({ message: 'No article with this id' });
    }

    // ADD COMMENT TO ARTICLE
    const newComment = await Comments.create({
      content,
      userId,
      articleId,
    });

    res.status(201).json({ message: 'Comment added to article', newComment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// COMMENTS BY USER
export const getCommentsByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    const comments = await Comments.findAll({ where: { userId } });
    if (comments.length !== 0) {
      res.status(200).json({ comments, length: comments.length });
    } else {
      res
        .status(404)
        .json({ message: `No comments found from user: ${userId}` });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// EDIT COMMENT
export const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  try {
    const commentToEdit = await Comments.findByPk(commentId);
    if (!commentToEdit) {
      return res
        .status(404)
        .json({ message: `Comment not found with this id: ${commentId}` });
    }

    // SAVE PREVIUS COMMENT
    const previusComment = commentToEdit.content;

    // CHECK THE COMMENT
    if (content.length === 0) {
      return res.status(400).json({ message: 'Comment cannot be empty!' });
    }

    // UPDATE COMMENT
    commentToEdit.content = content;
    await commentToEdit.save();

    // RESPONSE
    res.status(200).json({
      message: 'Comment edited successfully',
      commentId,
      previusComment,
      editedComment: commentToEdit,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE COMMENT
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const commentToDelete = await Comments.findByPk(commentId);
    if (!commentToDelete) {
      return res
        .status(404)
        .json({ message: `Comment not found with this id: ${commentId}` });
    }

    await commentToDelete.destroy();

    res.status(200).json({ message: 'Comment Deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kommentre adott válasz létrehozása
export const createCommentReply = async (req, res) => {
  const { commentId } = req.params;
  const { content, userId } = req.body;

  try {
    // Ellenőrzés, hogy a felhasználó és a komment létezik-e
    const user = await User.findByPk(userId);
    const comment = await Comments.findByPk(commentId);

    if (!user || !comment) {
      return res.status(404).json({ message: 'User or comment not found!' });
    }

    // Válasz létrehozása
    const newReply = await CommentReply.create({
      content,
      userId,
      commentId,
    });

    res.status(201).json({ message: 'Reply added successfully', newReply });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Kommentekre adott válaszok lekérése
export const getRepliesForComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    // Ellenőrizd, hogy létezik-e az adott komment
    const comment = await Comments.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found!' });
    }

    // Lekérjük az adott kommentre adott válaszokat
    const replies = await CommentReply.findAll({ where: { commentId } });
    if (replies.length === 0) {
      return res
        .status(404)
        .json({ message: `No replies found for comment: ${commentId}` });
    }

    res.status(200).json({ replies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; */
