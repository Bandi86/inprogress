import Book from '../../models/book.js';
import { Op } from 'sequelize';

export const searchBookByParams = async (req, res) => {
  try {
    const { title, author, description, isbn, quantity, published_date, page, limit, sort } = req.query;

    // Check if at least one search parameter is provided
    if (!(title || author || description || isbn || quantity || published_date)) {
      return res.status(400).json({ message: 'At least one search parameter is required' });
    }

    const searchConditions = {};

    if (title) {
      searchConditions.title = {
        [Op.like]: `%${title}%`,
      };
    }

    if (author) {
      searchConditions.author = {
        [Op.like]: `%${author}%`,
      };
    }

    if (description) {
      searchConditions.description = {
        [Op.like]: `%${description}%`,
      };
    }

    if (isbn) {
      searchConditions.isbn = {
        [Op.like]: `%${isbn}%`,
      };
    }

    if (quantity) {
      searchConditions.quantity = {
        [Op.like]: `%${quantity}%`,
      };
    }

    // Query the database with pagination and sorting options
    const options = {
      where: searchConditions,
      offset: (page - 1) * limit,
      limit: limit,
      order: sort ? [[sort, 'ASC']] : undefined,
    };

    const { rows: books, count } = await Book.findAndCountAll(options);

    if (count === 0) {
      return res.status(404).json({ message: 'No books found with the given search parameters' });
    }

    res.status(200).json({ books, totalCount: count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while processing the request' });
  }
};


