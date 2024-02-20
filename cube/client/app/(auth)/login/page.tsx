'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RegisterSchema } from '@/zod/register'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { login } from '@/vars/endpoints'
import { useDispatch, useSelector } from 'react-redux'
import {
  signInStart,
  signInSuccess,
  signInFailure,
  UserRedux,
} from '@/redux/userSlice'

const page = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading, error: errorMessage } = useSelector(
    (state: UserRedux) => state.user
  )

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof RegisterSchema>) {
    dispatch(signInStart())
    try {
      const res = await axios.post(login, values, {
        withCredentials: true,
      })
      if (res.status === 200) {
        dispatch(signInSuccess(res.data.user))
        router.push('/')
        alert('login ok')
      } else {
        dispatch(signInFailure(res.data.message))
        alert(res.data.message)
      }
    } catch (error: any) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='flex flex-col mb-4 p-2 justify-center items-center'>
      <h1>Login</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8'
        >
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder='example@example.com'
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  This is your email address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>password</FormLabel>
                <FormControl>
                  <Input placeholder='***' {...field} />
                </FormControl>
                <FormDescription>
                  This is your password.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit' disabled={loading ? true : undefined}>
            {loading ? (
              <>
                <span className='pl-3'>Loading...</span>
              </>
            ) : (
              <span>Login</span>
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default page
