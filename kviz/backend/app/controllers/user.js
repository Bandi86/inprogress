import User from '../models/user.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

// CRUD Controllers

const saltRounds = 10; // Konstans a salt rounds-hoz

//get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users: users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//get user by id
export const getUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
  }
};

//create user
export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    res.status(201).json({ message: 'User created successfully!', user: user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//login user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Ellenőrizzük az adatbázist a felhasználó e-mail címére
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Jelszó ellenőrzése a bcrypt segítségével
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Ha a felhasználó azonosítása sikeres, generáljunk JWT tokent és állítsunk be sütit
    generateToken(res, user.id);

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

//update user
export const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;

  try {
    const updatedUser = await User.findByPk(userId);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found!' });
    } else {
      updatedUser.name = updatedName;
      updatedUser.email = updatedEmail;
      await updatedUser.save();
      res
        .status(200)
        .json({ message: 'User updated successfully!', user: updatedUser });
    }
  } catch (error) {
    console.log(error);
  }
};

//delete user
export const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const deletedUser = await User.findByPk(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found!' });
    } else {
      await deletedUser.destroy();
      res.status(200).json({ message: 'User deleted successfully!' });
    }
  } catch (error) {
    console.log(error);
  }
};
