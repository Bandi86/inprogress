import { User } from '@/types/user'
import axios from 'axios'

export const fetchEmails = async (email: string) => {
  const response = await axios('http://localhost:8000/api/users')
  const users = await response.data
  // if users email is same then param return true
  const emails = users.map((user: User) => user.email)

  return emails.includes(email)
}
