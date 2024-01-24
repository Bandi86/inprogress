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
})

export default Favorite
