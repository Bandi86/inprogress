import User from '../models/user.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'

// CRUD Controllers

const saltRounds = 10 // Konstans a salt rounds-hoz

// get all user
export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll()
    const dataSendBack = users.map((user) => {
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
        currentLoginDuration: user.currentLoginDuration,
      }
    })

    res.status(200).json({ users: dataSendBack })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// get user by id
export const getUser = async (req, res) => {
  const userId = req.params.userId
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: 'User not found!' })
    }
    const dataSendBack = {
      id: user.id,
      username: user.username,
      email: user.email,
      created: user.createdAt,
      updated: user.updatedAt,
      lastLoginAt: user.lastLoginAt,
      currentLoginDuration: user.currentLoginDuration,
    }
    res.status(200).json({ user: dataSendBack })
  } catch (error) {
    console.log(error)
  }
}

// create user
export const createUser = async (req, res) => {
  const { username, email, password } = req.body

  try {
    // Check if the user already exists in the database
    const existingUser = await User.findOne({ where: { email: email } })
    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'This email is used try another one' })
    }

    // Check the username in the database
    const existingUsername = await User.findOne({
      where: { username: username },
    })
    if (existingUsername) {
      return res
        .status(409)
        .json({ message: 'This username is already used try another one' })
    }

    const salt = await bcrypt.genSalt(saltRounds)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    })
    const dataSendBack = {
      id: user.id,
      username: user.username,
      email: user.email,
      created: user.createdAt,
      updated: user.updatedAt,
    }
    res
      .status(201)
      .json({ message: 'User created successfully!', user: dataSendBack })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    
    // Check the user in the database with email
    const user = await User.findOne({ where: { email } })
    const {id} = user
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }
    
    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password)
    
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    // check if user already logged in or not
    if (req.user) {
      return res.status(409).json({ message: 'User already logged in' })
    }
    
    // Megjegyzés: Itt már bejelentkezett a felhasználó, így frissíthetjük a belépési adatokat.
    const currentLoginTime = new Date()
    const lastLoginTime = user.lastLoginAt || currentLoginTime
    const loginDuration = user.currentLoginDuration || 0

    // Számoljuk az eltelt időt az előző belépés óta
    const elapsedTime = currentLoginTime - lastLoginTime
    const updatedLoginDuration = loginDuration + elapsedTime

    // Frissítsük a felhasználó rekordját az új belépési adatokkal
    await user.update({
      lastLoginAt: currentLoginTime,
      currentLoginDuration: updatedLoginDuration,
    })

    // Generate and send token in response
    generateToken(res, id)
    
    // data back to frontend
    const dataSendBack = {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      created: user.createdAt,
      updated: user.updatedAt,
      lastLoginAt: currentLoginTime,
      currentLoginDuration: updatedLoginDuration,
    }
    res.status(200).json({ message: 'Login successful', user: dataSendBack })
  } catch (error) {
    // Log the error for debugging
    console.error('Login error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// update user
export const updateUser = async (req, res) => {
  const userId = req.params.userId
  const updatedName = req.body.username
  const updatedEmail = req.body.email

  try {
    const updatedUser = await User.findByPk(userId)

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found!' })
    }

    // Validate input data
    if (!updatedName || !updatedEmail) {
      return res
        .status(400)
        .json({ message: 'Name and email are required for update' })
    }

    // Update user properties
    updatedUser.username = updatedName
    updatedUser.email = updatedEmail
    updatedUser.updatedAt = new Date()

    // Save changes to the database
    await updatedUser.save()

    // Send a response with the updated user information
    res.status(200).json({
      message: 'User updated successfully!',
      user: {
        username: updatedUser.username,
        email: updatedUser.email,
        updatedAt: updatedUser.updatedAt,
      },
    })
  } catch (error) {
    // Log the error for debugging
    console.error('Update user error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

// delete user
export const deleteUser = async (req, res) => {
  const userId = req.params.userId

  try {
    const deletedUser = await User.findByPk(userId)
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found!' })
    } else {
      await deletedUser.destroy()
      res.status(200).json({ message: 'User deleted successfully!' })
    }
  } catch (error) {
    console.log(error)
  }
}

// logout user
export const logoutUser = async (req, res) => {
  try {
    console.log('Logout request received:', req.user)

    // Ellenőrizze, hogy a felhasználó be van-e jelentkezve, ha igen, akkor kezelje a kijelentkezést
    if (req.user) {
      const currentLogoutTime = new Date()
      const lastLoginTime = req.user.lastLoginAt || currentLogoutTime
      const loginDuration = req.user.currentLoginDuration || 0

      // Számoljuk az eltelt időt az utolsó belépés óta
      const elapsedTime = currentLogoutTime - lastLoginTime
      const updatedLoginDuration = loginDuration + elapsedTime

      console.log('Updating user record:', {
        lastLoginAt: null,
        currentLoginDuration: updatedLoginDuration,
      })

      // Frissítsük a felhasználó rekordját az új kijelentkezési adatokkal
      await req.user.update({
        lastLoginAt: null, // A felhasználó kijelentkezett, tehát az utolsó belépési időt lezárjuk
        currentLoginDuration: updatedLoginDuration,
      })
    }

    // Törölje a JWT-t a sütiből vagy az Authorization fejlécből
    res.clearCookie('jwt')
    // Vagy az Authorization fejléc törlése:

    // res.setHeader('Authorization', '');

    console.log('Logout successful')
    res.status(200).json({ message: 'Logout successful' })
  } catch (error) {
    console.error('Logout error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
