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
    'user_id',
    'username',
    'email',
    'role',
    'createdAt',
    'updatedAt',
    'lastLoginAt',
  ]

  return userData && userData.length > 0 ? (
    <SharedTable
      data={userData}
      columns={columns}
      tableCaptionText='user in database'
      type='user'
    />
  ) : (
    <div className='text-center text-2xl text-gray-500 p-8'>
      No data in database
    </div>
  )
}

export default page
