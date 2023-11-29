import Sequelize from 'sequelize';
import db from '../db/config.js';

const Category = db.define('category', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  // Egyéb tulajdonságok a kategóriához
});

export default Category;