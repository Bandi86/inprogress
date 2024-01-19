import Book from '../models/book.js' // Adjust the path to your Book model
import Category from '../models/category.js';
import User from '../models/user.js';

// Define associations
Book.belongsTo(Category, { foreignKey: 'category_id' });

// Synchronize the models in the correct order
const synchronizeModels = async () => {
  try {
    await User.sync({ force: false }); // Synchronize the User model first
    await Category.sync({ force: false }); // Synchronize the Category model first
    await Book.sync({ force: false }); // Synchronize the Book model afterwards
    console.log('Tables synced successfully');
  } catch (error) {
    console.error('Error syncing tables:', error);
  }
};

// Export the function for external use
export default synchronizeModels;
