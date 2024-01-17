'use client'

import * as z from 'zod'

export const register = z.object({
  username: z.string().min(3).max(100),
  email: z
    .string()
    .min(2)
    .max(50)
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: 'Incorrect email address format',
    }),
  password: z.string().min(6).max(100),
})

export const login = z.object({
  email: z
    .string()
    .min(2)
    .max(50)
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: 'Incorrect email address format',
    }),
  password: z.string().min(6).max(100),
})
