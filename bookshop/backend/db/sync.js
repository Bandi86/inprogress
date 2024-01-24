import db from './config.js'
import User from '../models/user.js'
import Book from '../models/book.js' // Adjust the path to your Book model
import Category from '../models/category.js'
import Cart from '../models/cart.js'
import Favorite from '../models/favorites.js'
import Comments from '../models/comments.js'

// Synchronize the models in the correct order
const synchronizeModels = async () => {
  try {
    /* await db.sync({ force: false }) */
    await User.sync({ force: false })
    await Category.sync({ force: false })
    await Book.sync({ force: false }) 
    await Cart.sync({ force: false })
    await Favorite.sync({ force: false })
    await Comments.sync({ force: false })


    // Kapcsolatok definiálása
    User.hasMany(Comments, { foreignKey: 'user_id' })
    User.hasOne(Cart, { foreignKey: 'user_id' })
    User.hasMany(Favorite, { foreignKey: 'user_id' })

    Category.hasMany(Book, { foreignKey: 'category_id' })

    Book.belongsTo(Category, { foreignKey: 'category_id' })
    Book.hasMany(Comments, { foreignKey: 'book_id' })
    Book.belongsToMany(Cart, { through: 'cart_id' })
    Book.belongsToMany(Favorite, { through: 'favorite_id' })

    Comments.belongsTo(User, { foreignKey: 'user_id' })
    Comments.belongsTo(Book, { foreignKey: 'book_id' })


    Cart.belongsTo(User, { foreignKey: 'user_id' })
    Cart.hasMany(Book, { foreignKey: 'cart_id' })

    Favorite.belongsTo(User, { foreignKey: 'user_id' })
    Favorite.hasMany(Book, { foreignKey: 'favorite_id' })

    console.log('Tables synced successfully')
  } catch (error) {
    console.error('Error syncing tables:', error)
  }
}

// Export the function for external use
export default synchronizeModels
