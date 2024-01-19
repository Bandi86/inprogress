import { DataTypes } from 'sequelize'
import db from '../db/config.js'
import Sequelize from 'sequelize'


const Category = db.define('category', {
  category_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  category_name: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Please enter a category name',
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  },
  

})


export default Category
