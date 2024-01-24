import { DataTypes } from 'sequelize'
import db from '../db/config.js'
import User from './user.js'

const Cart = db.define('cart', {
  cart_id: {
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
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: {
        args: true,
        msg: 'Please enter a valid total price',
      },
    },
  },
  total_items: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        args: true,
        msg: 'Please enter a valid total items',
      },
    },
  },
  is_checked_out: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  date_checked_out: {
    type: DataTypes.DATE,
    allowNull: true,
  },
 
})

export default Cart
