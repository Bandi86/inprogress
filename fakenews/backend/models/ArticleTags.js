/* import { DataTypes, Sequelize } from 'sequelize';
import db from '../db/config.js';

const ArticleTags = db.define('article_tags', {
  articleId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'articles',
      key: 'articleId',
    },
  },
  tagId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'tag',
      key: 'tagId',
    },
  },
});

export default ArticleTags;
 */