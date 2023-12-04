'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { ZodError } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import axios from 'axios';
import { loginSchema, TLoginSchema } from '../../../lib/authFormValidation';
import { useUser } from '@/contexts/userContext';

const signIn = () => {
  const router = useRouter();
  const { setUser } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: TLoginSchema) => {
    try {
      await axios
        .post('http://localhost:8000/login', data, { withCredentials: true })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem('user', JSON.stringify(res.data.user));
            setUser(res.data.user);
            toast.success('Sikeres bejelentkezés');
            router.push('/');
          } else {
            toast.error('Hiba történt a bejelentkezés során');
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y2 text-center'>
            <h1 className='text-2x font-bold'>Jelentkezz be a fiokodba</h1>
            <Link
              href='/regisztracio'
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
            >
              Nincs meg fiokod? Regisztracio
              <ArrowRight className='h-4 w-4' />
            </Link>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-4'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='email'>Email cime</Label>
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
                  <Label htmlFor='password'>Jelszava</Label>
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

                <Button>Bejelentkezes</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default signIn;
