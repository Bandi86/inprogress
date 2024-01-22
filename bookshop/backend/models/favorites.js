import { DataTypes } from 'sequelize'
import db from '../db/config.js'
import Book from './book.js'
import User from './user.js'

const Favorite = db.define('favorite', {
  favorite_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  book_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Book, // Reference to the Book model
      key: 'book_id',
    },
    validate: {
      notNull: {
        args: true,
        msg: 'Please enter a book',
      },
    },
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: User, // Reference to the User model
      key: 'user_id',
    },
    validate: {
      notNull: {
        args: true,
        msg: 'Please enter a user',
      },
    },
  },
  createad_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
})

export default Favorite
