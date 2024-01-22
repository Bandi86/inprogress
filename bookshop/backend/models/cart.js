import { DataTypes } from 'sequelize'
import Sequelize from 'sequelize'
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
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: {
      args: false,
      msg: 'Pease input a quantity',
    },
    validate: {
      isInt: {
        args: true,
        msg: 'Please enter a valid quantity',
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
  is_checked_out: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  date_checked_out: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  cart_created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  cart_updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
})

export default Cart
