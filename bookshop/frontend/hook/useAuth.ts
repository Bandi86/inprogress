import { cookies } from 'next/headers'
import { useEffect, useState } from 'react'

const useAuth = () => {
  const getAuthTokenFromCookie = () => {
    const cookieStore = cookies()
    const token = cookieStore.get('jwt')
    return token
  }
}

export default useAuth
