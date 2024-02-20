import Sequelize from 'sequelize'
import { DataTypes } from 'sequelize'
import db from '../../../bookshop/backend/db/config.js'

const User = db.define('user', {
  user_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Please enter your username',
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Please enter your email address',
    },
    unique: {
      args: true,
      msg: 'Email already exists',
    },
    validate: {
      isEmail: {
        args: true,
        msg: 'Please enter a valid email address',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Please enter a password',
    },
    validate: {
      isNotShort: value => {
        if (value.length < 6) {
          throw new Error('Password should be at least 6 characters')
        }
      },
    },
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user',
    validate: {
      isIn: [['user', 'admin']],
    },
  },
  lastLogin_at: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: null,
  },
})

export default User
