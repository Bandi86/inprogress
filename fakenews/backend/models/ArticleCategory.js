import db from '../db/config.js';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

const ArticleCategory = db.define('articleCategory', {
  articleCategoryId: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    allowNull: false,
    primaryKey: true,
  },
});

export default ArticleCategory;