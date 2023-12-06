import Sequelize from 'sequelize';
import db from '../db/config.js';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
//import ArticleTags from './ArticleTags.js';
//import Tag from './Tags.js'; // Add missing import for Tag model

const Article = db.define('article', {
  articleId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  source: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: '',
  },
  tagNames: {
   type: Sequelize.ARRAY(Sequelize.STRING),
    allowNull: false,
    defaultValue: [],
    
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'userId',
    },
  },
  publishedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
});

export default Article;
