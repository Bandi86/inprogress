import { DataTypes } from 'sequelize'
import db from '../db/config.js'


const Comments = db.define('comments', {
  comment_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  }, 
  comment: {
    type: DataTypes.TEXT,
    allowNull: {
      args: false,
      msg: 'Please enter a title',
    },
  },
})

export default Comments
