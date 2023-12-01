import { DataTypes, Sequelize } from 'sequelize';
import db from '../db/config.js';
import Article from './Articles.js';
import User from './Users.js';
//import { v4 as uuidv4 } from 'uuid';

const Like = db.define('like', {
    likeId: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    likedAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      allowNull: false,
    },
    numberOfLikes: {
        type: Sequelize.INTEGER,
        defaultValue: 0, // Kezdetben a like-ok száma 0
      },
  });
  
  // Asszociációk
  Like.belongsTo(User, { foreignKey: 'userId' });
  Like.belongsTo(Article, { foreignKey: 'articleId' });
  
  // Az Article és User modellek közötti kapcsolatok
  Article.hasMany(Like);
  User.hasMany(Like);
  
  export default Like;
