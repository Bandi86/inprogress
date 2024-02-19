import { z } from 'zod'

export const RegisterSchema = z.object({
  username: z.string().min(3).max(10),
  email: z.string().email(),
  password: z.string().min(6, 'Password must be least 6 characters').max(20)
})

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
