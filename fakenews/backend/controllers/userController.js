import { User } from '../utils/init.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

const saltRounds = 10; // Konstans a salt rounds-hoz

// ALL USER
export const allUser = async (req, res, next) => {
  try {
    const users = await User.findAll();
    // give data back without password
    {
      users.map((user) => {
        delete user.dataValues.password;
        return user;
      });
    }

    res.status(200).json({ users: users, length: users.length });
    console.log(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// USER BY ID
export const getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    // give data back without the password
    delete user.dataValues.password;
    res.status(200).json({ user: user });
  } catch (error) {
    console.log(error);
  }
};

// CREATE USER
export const createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    // check email exits
    const userEmailExits = await User.findOne({ where: { email: email } });
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    if (userEmailExits) {
      return res.status(409).json({ message: 'User already exists!' });
    }
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });
    // give object back without password
    delete user.dataValues.password;
    res.status(201).json({ message: 'User created successfully!', user: user });
    console.log('user created', user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE USER PUT
export const updateUser = async (req, res, next) => {
  const userId = req.params.id;

  const updatedName = req.body.name;
  const updatedEmail = req.body.email;

  try {
    if (!updatedName && !updatedEmail) {
      return res.status(400).json({ message: 'No data provided!' });
    }

    const updatedUser = await User.findByPk(userId);

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found!' });
    } else {
      updatedUser.name = updatedName;
      updatedUser.email = updatedEmail;
      await updatedUser.save();
      // give object back without password
      delete updatedUser.dataValues.password;
      res
        .status(200)
        .json({ message: 'User updated successfully!', user: updatedUser });
    }
  } catch (error) {
    console.log(error);
  }
};

// UPDATE USER PATCH
export const updateUserEmail = async (req, res, next) => {
  const userId = req.params.id;
  const updatedEmail = req.body.email;
  try {
    const updatedUser = await User.findByPk(userId);
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found!' });
    } else {
      updatedUser.email = updatedEmail;
      await updatedUser.save();
      // give object back without password
      delete updatedUser.dataValues.password;
      res.status(200).json({
        message: 'User email updated successfully!',
        user: updatedUser,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
  const userId = req.params.id;

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

// LOGIN USER
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'No data provided!' });
  }

  try {
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials!' });
    }
    const token = generateToken(res, user.userId);

    delete user.dataValues.password;
    res.status(200).json({
      message: `Logged in successfully!`,
      token: token,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGOUT USER
export const logoutUser = async (req, res, next) => {
  res.cookie('jwt', '', { httpOnly: true, expires: new Date(0) });
  res.status(200).json({ message: 'Logged out successfully!' });
};
