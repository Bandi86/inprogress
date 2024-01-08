import asyncHandler from 'express-async-handler';
import { StatusCodes } from 'http-status-codes';
import notFound from '../middleware/not-found.js';
import Cart from '../models/Cart.js';
import Book from '../models/Books.js'

// GET CART
const getCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Ellenőrzés: Van-e kosár a felhasználónak
  const cart = await Cart.findOne({ user: userId }).populate('books.book');

  if (!cart) {
    throw new notFound('Cart not found');
  }

  let totalCartAmount = 0;

  // Érték számolás
  for (const item of cart.books) {
    const book = item.book;
    const quantity = item.quantity;
    totalCartAmount += book.price * quantity; 
  }

  res
    .status(StatusCodes.OK)
    .json({ cart, count: cart.length, totalCartAmount });
});

// CREATE CART
const createCart = asyncHandler(async (req, res) => {
  const { items, userId } = req.body;

  // Ellenőrzés: Van-e már kosár a felhasználónak
  let cart = await Cart.findOne({ userId });

  if (!cart) {
    // Ha nincs kosár, akkor létrehozunk egyet
    cart = new Cart({ userId, books: items });

    // Számold ki a kosár összértékét az új kosárhoz
    let totalCartAmount = 0;

    for (const item of items) {
      const book = await Book.findById(item.book);
      totalCartAmount += book.price * item.quantity;
    }

    cart.totalCartAmount = totalCartAmount;

    await cart.save();
  } else {
    // Ha már van kosár, akkor frissítjük az elemeket
    cart.books = items;

    // Számold újra a kosár összértékét a frissített könyvek alapján
    let totalCartAmount = 0;

    for (const item of items) {
      const book = await Book.findById(item.book);
      totalCartAmount += book.price * item.quantity;
    }

    cart.totalCartAmount = totalCartAmount;

    await cart.save();
  }

  res.status(StatusCodes.CREATED).json({ cart, count: cart.length, totalCartAmount });
});


// CART UPDATE
const updateCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { items } = req.body;

  // Ellenőrzés: Van-e kosara a felhasználónak
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new notFound('Cart not found');
  }

  // kosár összértékét az új elemek alapján
  let totalCartAmount = 0;
  const updatedItems = [];

  for (const newItem of items) {
    const existingItem = cart.items.find(item => item.book.toString() === newItem.book.toString());
    
    if (existingItem) {
      // Ha már van ilyen könyv a kosárban, növeld a darabszámot
      existingItem.quantity += 1;
    } else {
      // Ha nincs ilyen könyv a kosárban, adj hozzá új elemként
      cart.items.push(newItem);
    }

    // Frissítsd a kosár összértékét az új elem alapján
    const book = await Book.findById(newItem.book);
    totalCartAmount += book.price * newItem.quantity;

    updatedItems.push(existingItem || newItem);
  }

  // Tárold el a kosár összértékét
  cart.totalCartAmount = totalCartAmount;

  await cart.save();

  res.status(StatusCodes.OK).json({ cart, updatedItems, count: cart.length, totalCartAmount });
});


// DELETE CART
const deleteCart = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  // Ellenőrzés: Van-e kosár a felhasználónak
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new notFound('Cart not found');
  }

  // Töröljük a kosarat
  await cart.remove();

  res.status(StatusCodes.OK).json({ message: 'Cart deleted successfully' });
});

// DELETE ITEM FROM CART
const deleteItem = asyncHandler(async (req, res) => {
  const { userId, bookId } = req.params;

  // Ellenőrzés: Van-e kosár a felhasználónak
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new notFound('Cart not found');
  }

  // Az eltávolítandó könyv indexének megtalálása
  const bookIndex = cart.items.findIndex((item) => item.book.toString() === bookId);

  if (bookIndex === -1) {
    throw new notFound('Book not found in the cart');
  }

  // Könyv eltávolítása a kosárból vagy mennyiség csökkentése
  const bookItem = cart.items[bookIndex];
  
  if (bookItem.quantity > 1) {
    // Csökkentjük a könyv mennyiségét egy darabbal
    bookItem.quantity -= 1;
  } else {
    // Ha csak egy példány van belőle, akkor töröljük a kosárból
    cart.items.splice(bookIndex, 1);
  }

  // Számold újra a kosár összértékét a frissített könyvek alapján
  let totalCartAmount = 0;

  for (const item of cart.items) {
    const book = await Book.findById(item.book);
    totalCartAmount += book.price * item.quantity;
  }

  // Tárold el a kosár összértékét
  cart.totalCartAmount = totalCartAmount;

  await cart.save();

  res.status(StatusCodes.OK).json({cart, totalCartAmount});
});



export { getCart, createCart, updateCart, deleteCart, deleteItem };
