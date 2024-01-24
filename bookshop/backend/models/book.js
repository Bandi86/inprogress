import { DataTypes } from 'sequelize'
import db from '../db/config.js'
import Category from './category.js'
import Comments from './comments.js'
import Cart from './cart.js'
import Favorite from './favorites.js'

const Book = db.define('book', {
  book_id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Category, // Reference to the Category model
      key: 'category_id',
    },
    validate: {
      notNull: {
        args: true,
        msg: 'Please enter a category',
      },
    },
  },
  comment_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Comments,
      key: 'comment_id',
    },
   
  },
  cart_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Cart,
      key: 'cart_id',
    },
   
  },
  favorite_id: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: Favorite,
      key: 'favorite_id',
    },
   
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
    },
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Pease input an ISBN',
    },
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: {
      args: false,
      msg: 'Pease input a price',
    },
    validate: {
      isFloat: {
        args: true,
        msg: 'Please enter a valid price',
      },
    },
  },
  image: {
    type: DataTypes.STRING,
    allowNull: {
      args: false,
      msg: 'Pease input an image',
    },
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
})

export default Book
