import { DataTypes } from 'sequelize'
import Sequelize from 'sequelize'
import db from '../db/config.js'

const Book = db.define('book', {
  book_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Please enter a title',
    },
  },
  author: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Please enter an author',
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: {
      args: false,
      msg: 'Pease input a description',
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
    }
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Pease input an ISBN',
    },
   /*  validate: {
      isISBN: {
        args: true,
        msg: 'Please enter a valid ISBN',
      },
    }, */
  },
  published_date: {
    type: DataTypes.DATE,
    allowNull: {
      args: false,
      msg: 'Pease input a published date',
    },
    validate: {
      isDate: {
        args: true,
        msg: 'Please enter a valid date',
      },
    },
  },
  createdAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
  updatedAt: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
  },
})

export default Book
