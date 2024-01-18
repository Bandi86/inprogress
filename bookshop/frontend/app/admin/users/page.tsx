'use client'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { user } from '@/constants/api'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { User } from '@/types/user'

const page = () => {
  const [userData, setUserData] = useState<User[] | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(user)
      setUserData(result.data.users)
    }
    fetchData()
  }, [])

  return (
    <section className='w-full h-screen'>
      <h1 className='text-center font-semibold p-10'>Users Data</h1>
      <div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[100px]'>Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userData !== null &&
              userData.map((user: User) => (
                <TableRow key={user?.id}>
                  <TableCell className='font-medium'>{user?.id}</TableCell>
                  <TableCell>{user?.username}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.createdAt}</TableCell>
                  <TableCell>{user?.updatedAt}</TableCell>
                  <TableCell>{user?.lastLoginAt}</TableCell>
                  <TableCell>{user?.currentLoginDuration}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className='text-right'>$2,500.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </section>
  )
}

export default page
