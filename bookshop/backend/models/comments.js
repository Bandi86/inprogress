import { DataTypes } from 'sequelize'
import db from '../db/config.js'
import Book from './book.js'
import User from './user.js'


const Comments = db.define('comments', {
  comment_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User, // Reference to the User model
      key: 'user_id',
    },
  },
 /*  book_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Book, // Reference to the Book model
      key: 'book_id',
    },
  }, */
  comment: {
    type: DataTypes.TEXT,
    allowNull: {
      args: false,
      msg: 'Please enter a title',
    },
  },
})

export default Comments
