import Sequelize from 'sequelize';
import db from '../db/config.js';
import User from './Users.js';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

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
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  source: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  url: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  publishedAt: {
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

Article.belongsTo(User, {
  foreignKey: {
    name: 'userId',
    type: DataTypes.UUID,
  },
});




export default Article;
