'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodError } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { TSignupSchema, signupSchema } from '@/lib/authFormValidation';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import axios from 'axios';

const signUp = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TSignupSchema>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: TSignupSchema) => {
    axios.post('http://localhost:8000/users', data).then((res) => {
      if (res.status == 201) {
        toast.success('Sikeres regisztráció');
        router.push('/bejelentkezes');
      } else {
        toast.error('Hiba történt a regisztráció során');
      }
    });
  };

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y2 text-center'>
            <h1 className='text-2x font-bold'>Create Account</h1>
            <Link
              href='/sign-in'
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
            >
              Already have an account? Sign-in
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-4'>
                <div className='grid gap-4 py-4'>
                  <Label htmlFor='name'>Nev</Label>
                  <Input
                    {...register('name')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.name,
                    })}
                    placeholder='Nev'
                    type='text'
                  />
                  {errors?.name && (
                    <p className='text-sm text-red-500'>
                      {errors?.name && errors.name.message}
                    </p>
                  )}

                  <Label htmlFor='email'>Email</Label>
                  <Input
                    {...register('email')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.email,
                    })}
                    placeholder='you@example.com'
                    type='email'
                  />
                  {errors?.email && (
                    <p className='text-sm text-red-500'>
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password'>Password</Label>
                  <Input
                    {...register('password')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.password,
                    })}
                    placeholder='password'
                    type='password'
                  />
                  {errors?.password && (
                    <p className='text-sm text-red-500'>
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='confirm-password'>confirm password</Label>
                  <Input
                    {...register('confirmPassword')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.confirmPassword,
                    })}
                    placeholder='confirm password'
                    type='password'
                  />
                  {errors?.confirmPassword && (
                    <p className='text-sm text-red-500'>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <Button>Regisztracio</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default signUp;
