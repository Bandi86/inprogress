//import Article from '../models/Articles.js';
//import Tag from '../models/Tags.js';
//import ArticleTags from '../models/ArticleTags.js';
//import Comments from '../models/Comments.js';
//import Like from '../models/Like.js';
//import User from '../models/Users.js';
//import { CommentLikes } from '../models/Like.js';
//import CommentReply from '../models/CommentReply.js';

const initializeModels = () => {
  /* const userId = 'userId';
  // User model
  User.hasMany(Article, {
    foreignKey: 'userId',
  }); */

  

  // Articles model
//  Article.belongsToMany(Tag, { through: ArticleTags, foreignKey: 'articleId' });

  /* Article.belongsTo(User, {
    foreignKey: 'userId',
    indexes: [
      {
        fields: [userId],
      },
    ],
  }); */

  // Tags model
  //Tag.belongsToMany(Article, { through: ArticleTags, foreignKey: 'tagId' });

  // Comments model

  // Like model

  // CommentLikes model

  // CommentReply model
};

//initializeModels();

//export { Article, Tag, ArticleTags, Comments, User, Like, CommentLikes, CommentReply };
