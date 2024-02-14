'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { fetchEmails } from '../utils/fetchEmails'


const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.')
    .refine(async email => {
      if (!(await fetchEmails(email))) return false
    }, 'This email is not in database'),
})

export const useAuthForm = (method: string) => {
  if (method === 'register') {
    const registerForm = useForm({
      resolver: zodResolver(formSchema),
    })
    return registerForm
  } else {
    const loginForm = useForm({
      resolver: zodResolver(
        formSchema.pick({ username: true, password: true })
      ),
    })
    return loginForm
  }
}
