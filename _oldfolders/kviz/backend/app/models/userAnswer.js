import db from "../db/config.js";
import { Sequelize } from "sequelize";
import User from "./user.js";
import Questions from "./questions.js";

const UserAnswer = db.define('user_answer', {
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
    selectedOptionIndex: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    // Egyéb tulajdonságok az adott felhasználói válaszhoz
  });
  
  UserAnswer.belongsTo(User, { foreignKey: 'userId' });
  UserAnswer.belongsTo(Questions, { foreignKey: 'questionId' });
  
  export default UserAnswer;
  