import { DataTypes } from 'sequelize'
import db from '../db/config.js'
import Book from './book.js'

const Comments = db.define('comments', {
  comment_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Book,
      key: 'book_id',
    },
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
