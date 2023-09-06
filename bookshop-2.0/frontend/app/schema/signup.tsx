'use client';

import * as z from 'zod';

export const signupSchema = z.object({
  name: z.string().min(2).max(50),

  email: z
    .string()
    .min(2)
    .max(50)
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: 'Incorrect email address format',
    }),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});
