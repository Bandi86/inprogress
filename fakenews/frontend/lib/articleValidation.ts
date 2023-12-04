'use client';
import * as z from 'zod';

export const articleValidation = z.object({
  title: z.string().min(1, 'Title is required'),
  body: z.string().min(1, 'Body is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.string().min(1, 'image link is required'),
  source: z.string().min(1, 'source link is required'),
  url: z.string().min(1, 'url link is required'),  
  userId: z.string(),
  tagList: z.array(z.string().min(1, "min 1 tag required")),
});

export type TSArticle = z.infer<typeof articleValidation>;
