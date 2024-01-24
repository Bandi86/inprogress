'use client'

import { useState, SyntheticEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { login } from '@/constants/api'
import useUserStore from '@/store'

type FormState = {
  email: string
  password: string
}

const loginPage = () => {
  const router = useRouter()

  const { user, setUser } = useUserStore()

  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  })

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault()

    try {
      const res = await axios.post(login, formState, { withCredentials: true })
      if (res.status === 200) {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        setUser(res.data.user)
        alert('Login success!')
        if (res.data.user.role === 'admin') {
          router.push('/admin')
        }
      }
    } catch (error: any) {
      console.error('Validation error:', error.message)
      // Handle the error gracefully, e.g., display an error message to the user
    }
  }

  return (
    <>
      {user?.user_id ? (
        router.push('/')
      ) : (
        <div className='flex justify-center items-center h-screen'>
          <form
            onSubmit={handleForm}
            className='grid grid-cols-1 gap-4 max-w-sm mx-auto'
          >
            <h2 className='text-center text-2xl font-semibold mb-4'>Login</h2>
            <div className='flex flex-col gap-4'>
              <Label htmlFor='email' className='text-white'>
                Email
              </Label>
              <Input
                type='email'
                id='email'
                placeholder='Email'
                required
                onChange={(e) =>
                  setFormState({ ...formState, email: e.target.value })
                }
              />
            </div>
            <div className='flex flex-col gap-4'>
              <Label htmlFor='password' className='text-white'>
                Password
              </Label>
              <Input
                type='password'
                id='password'
                placeholder='Password'
                required
                onChange={(e) =>
                  setFormState({ ...formState, password: e.target.value })
                }
              />
            </div>
            <Button type='submit'>Login</Button>
          </form>
        </div>
      )}
    </>
  )
}

export default loginPage
