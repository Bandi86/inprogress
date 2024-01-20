'use client'

import { user } from '@/constants/api'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { User } from '@/types/user'

import SharedTable from '@/components/shared/Table'

const page = () => {
  const [userData, setUserData] = useState<User[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(user)
      setUserData(result.data.users)
    }
    fetchData()
  }, [])

  const columns = [
    'id',
    'username',
    'email',
    'role',
    'createdAt',
    'updatedAt',
    'lastLoginAt',
    'currentLoginDuration',
  ]

  return (
    <SharedTable
      data={userData}
      columns={columns}
      tableCaptionText='user in database'
      type='user'
    />
  )
}

export default page
