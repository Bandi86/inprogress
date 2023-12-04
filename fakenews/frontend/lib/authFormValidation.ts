'use client';
import * as z from 'zod';

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: 'nev legalabb 2 karakter kell legyen' })
      .max(50, { message: 'nev legfeljebb 50 karakter lehet' }),
    email: z
      .string()
      .min(2, { message: 'email legalabb 2 karakter kell legyen' })
      .max(50, { message: 'email legfeljebb 50 karakter lehet' })
      .refine((value) => /\S+@\S+\.\S+/.test(value), {
        message: 'Incorrect email address format',
      }),
    password: z
      .string()
      .min(6, { message: 'jelszo legalabb 6 karakter kell legyen' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'jelszo legalabb 6 karakter kell legyen' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type TSignupSchema = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(2, { message: 'email legalabb 2 karakter kell legyen' })
    .max(50, { message: 'email legfeljebb 50 karakter lehet' })
    .refine((value) => /\S+@\S+\.\S+/.test(value), {
      message: 'nem korrekt email formátum',
    }),
  password: z
    .string()
    .min(6, { message: 'jelszo legalabb 6 karakter kell legyen' }),
});

export type TLoginSchema = z.infer<typeof loginSchema>;
