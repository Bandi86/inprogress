import Cart from '../../models/cart.js'

// create the cart for user

export const createCart = async (req, res) => {
  console.log(req.user)
  console.log(req.body)
  const { book } = req.body

  /*  const total_price = book.reduce((acc, book) => {
    return acc + book.price
  }, 0) */

  const cart = {
    book: {
      book_id: book.book_id,
      quantity: book.quantity,
    },
    total_price,
  }

  try {
    const newCart = await Cart.create({ user_id, cart })
    res.status(201).json({ newCart })
    if (req.user.cart) {
      // add the new items for the cart
      const updateCart = {
        ...cart,
        book: {
          book_id: book.book_id,
          quantity: book.quantity,
        },
        total_price: req.user.cart.total_price + total_price,
      }
      res.status(201).json({ updateCart })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}
