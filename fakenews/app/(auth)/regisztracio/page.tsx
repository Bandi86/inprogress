'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { trpc } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { ZodError } from 'zod';
import Link from 'next/link';
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from '../../../lib/validators/account-credentials-validator';

import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const page = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  

  const { mutate, isLoading } = trpc.auth.createPayloadUser.useMutation({
    onError: (error) => {
      if (error.data?.code === 'CONFLICT') {
        toast.error('Ez az email mar foglalt probaljon meg bejelentkezni');
        return;
      }
      if (error instanceof ZodError) {
        toast.error(error.issues[0].message);
        return;
      }
      toast.error('Somthing went wrong. Please try again');
    },
    onSuccess: ({ sentToEmmail }) => {
      toast.success(`Verification email sent to${sentToEmmail}.`);
      router.push('/verify-email?to=' + sentToEmmail);
    },
  });

  const onSubmit = ({ name, email, password }: TAuthCredentialsValidator) => {
    // send data to the server
    mutate({ name, email, password });
  };

  return (
    <>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]'>
          <div className='flex flex-col items-center space-y2 text-center'>
            <h1 className='text-2x font-bold'>Regisztracio</h1>
            <Link
              href='/bejelentkezes'
              className={buttonVariants({
                variant: 'link',
                className: 'gap-1.5',
              })}
            >
              Van mar fiokja? Jelentkezzen be
            </Link>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='name'>Nev</Label>
                  <Input
                    {...register('name')}
                    className={cn({
                      'focus-visible:ring-red-500': errors.name,
                    })}
                    placeholder='John Doe'
                  />
                  {errors?.name && (
                    <p className='text-sm text-red-500'>
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
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
                  <Label htmlFor='password'>Jelszo</Label>
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
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  )}
                  Regisztracio
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
