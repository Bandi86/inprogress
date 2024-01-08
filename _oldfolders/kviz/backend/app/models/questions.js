import Sequelize from 'sequelize';
import db from '../db/config.js';
import Category from './category.js';

const Questions = db.define('question', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  questionText: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  options: {
    type: Sequelize.JSONB, // Opcionális: JSONB lehet a válaszok tárolására
    allowNull: false,
  },
  correctOptionIndex: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  categoryId: {
    // A kategória azonosítója
    type: Sequelize.INTEGER, // vagy akár STRING is, ha így van definiálva a Category-nál
    allowNull: false,
    references: {
      // Definiáljuk a külső kulcsot
      model: Category,
      key: 'id',
    },
  },
  difficulty: {
    type: Sequelize.ENUM('easy', 'medium', 'hard'),
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

Questions.belongsTo(Category, { foreignKey: 'categoryId' });

export default Questions;
