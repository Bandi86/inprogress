import db from './connection.js'
import User from '../models/user.js'

const synchronizeModels = async () => {
  try {
    await User.sync({ force: false })
  } catch (error) {
    console.error('Error syncing tables:', error)
  }
}

export default synchronizeModels
