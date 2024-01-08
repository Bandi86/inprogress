import Sequelize from 'sequelize';
import db from '../db/config.js';

const UserQuestion = db.define('user_question', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  // Egyéb tulajdonságok a kapcsoló táblához
});

export default UserQuestion;

// User modell kapcsolata Question modellal
User.belongsToMany(Question, { through: UserQuestion });

// Question modell kapcsolata Category modellal
Question.belongsTo(Category);
