'use client'

import { useState, SyntheticEvent } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { user } from '@/constants/api'

type FormState = {
  username: string
  email: string
  password: string
}

const registerPage = () => {
  const router = useRouter()

  const id = localStorage.getItem('user')?.toString() || null

  const [formState, setFormState] = useState<FormState>({
    username: '',
    email: '',
    password: '',
  })

  const handleForm = async (e: SyntheticEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post(user, formState)

      if (res.status === 201) {
        alert('Register success!')
        router.push('/login')
      }
    } catch (error: any) {
      console.error('Validation error:', error.message)
    }
  }

  return (
    <>
      {id ? (
        router.push('/')
      ) : (
        <div className="flex justify-center items-center h-screen">
          <form
            onSubmit={handleForm}
            className='grid grid-cols-1 gap-4 max-w-sm mx-auto'
          >
          <h2 className='text-center text-2xl font-semibold mb-4'>Register</h2>
            <div className='flex flex-col gap-4'>
              <Label htmlFor='username' className='text-white'>
                Username
              </Label>
              <Input
                type='text'
                id='username'
                placeholder='Username'
                required
                onChange={(e) =>
                  setFormState({ ...formState, username: e.target.value })
                }
              />
            </div>
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
            <Button type='submit'>Register</Button>
          </form>
        </div>
      )}
    </>
  )
}

export default registerPage
