import Book from '../models/book.js' // Adjust the path to your Book model
import Category from '../models/category.js';
import User from '../models/user.js';
import Cart from '../models/cart.js';
import Favorite from '../models/favorites.js';



// Synchronize the models in the correct order
const synchronizeModels = async () => {
  try {
    await User.sync({ force: false });
    await Category.sync({ force: false });
    await Book.sync({ force: false });
    await Cart.sync({ force: false });
    await Favorite.sync({ force: false });

    // Kapcsolatok definiálása
    Book.belongsTo(Category, { foreignKey: 'category_id' });
    Category.hasMany(Book, { foreignKey: 'category_id' });

    Cart.belongsToMany(Book, { through: 'CartItems', foreignKey: 'cart_id' });
    Book.belongsToMany(Cart, { through: 'CartItems', foreignKey: 'book_id' });

    console.log('Tables synced successfully');
  } catch (error) {
    console.error('Error syncing tables:', error);
  }
};


// Export the function for external use
export default synchronizeModels;
