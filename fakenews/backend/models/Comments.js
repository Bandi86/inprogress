import { DataTypes, Sequelize } from 'sequelize';
import db from '../db/config.js';


import { v4 as uuidv4 } from 'uuid';

const Comments = db.define('comments', {
  commentId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    allowNull: false,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'userId',
    },
  },
  articleId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'articles',
      key: 'articleId',
    },
  },
  commentedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  commentUpdatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
});



export default Comments;
