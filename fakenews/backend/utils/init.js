import Article from '../models/Articles.js';
import Tag from '../models/Tags.js';
import Comments from '../models/Comments.js';
import Like from '../models/Like.js';
import User from '../models/Users.js';
import { CommentLikes } from '../models/Like.js';
import CommentReply from '../models/CommentReply.js';


const initializeModels = () => {
  const userId = 'userId';
  // User model
  User.hasMany(Article, {
    foreignKey: 'userId',
  });
  User.hasMany(CommentReply, {
    foreignKey: 'userId',
  });
  User.hasMany(CommentLikes, {
    foreignKey: 'userId',
  });
  User.hasMany(Like, {
    foreignKey: 'userId',
  });

  // Articles model
  Article.belongsToMany(Tag, { through: 'articleTag' });

  Article.belongsTo(User, {
    foreignKey: 'userId',
    indexes: [
      {
        fields: [userId],
      },
    ],
  });
  Article.hasMany(Tag, {
    foreignKey: 'articleId',
  });
  Article.hasMany(Comments, {
    foreignKey: 'articleId',
  });
  Article.hasMany(Like, {
    foreignKey: 'articleId',
  });

  // Tags model
  Tag.belongsTo(Article, {
    foreignKey: 'articleId',
  });

  // Comments model
  Comments.belongsTo(User, {
    foreignKey: 'userId',
  });
  Comments.belongsTo(Article, {
    foreignKey: 'articleId',
    as: 'article',
  });
  Comments.hasMany(CommentReply, {
    foreignKey: 'commentId',
  });
  Comments.hasMany(Like);
  Comments.hasMany(CommentLikes, {
    foreignKey: 'commentId',
  });
  


  // Like model
  Like.belongsTo(User, {
    foreignKey: 'userId',
  });
  Like.belongsTo(Article, {
    foreignKey: 'articleId',
  });
  Like.belongsTo(Comments, {
    foreignKey: 'commentId',
  });
  Like.belongsTo(CommentReply, {
    foreignKey: 'replyId',
  });
  Like.belongsTo(CommentLikes, {
    foreignKey: 'likeId',
  });

  // CommentLikes model
  CommentLikes.belongsTo(User, {
    foreignKey: 'userId',
  });
  CommentLikes.belongsTo(Comments, {
    foreignKey: 'commentId',
  });
  CommentLikes.belongsTo(Comments);



  // CommentReply model
};

initializeModels();

export { Article, Tag, Comments, User, Like, CommentLikes, CommentReply };
