'use client';
import { Box, Text, Input } from '@chakra-ui/react';
import { useState, SyntheticEvent } from 'react';
import { apiUrls } from './api.';
import axios from 'axios';
import { useRouter } from 'next/navigation'

interface FormState {
  email: string;
  password: string;
}

export default function Page() {
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });

  const router = useRouter()

  function handleForm(e: SyntheticEvent) {
    e.preventDefault();
    axios.post(apiUrls.loginAPI, formState)
      .then((res) => {        
        if (res.data.user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/");
          alert("login success")
        }
      })
      .catch((error) => {
        // Kezeld az esetleges hibákat
        console.error(error);
      });
  }

  return (
    <>
      <Box w='100%' h='200px' bgGradient='linear(to-t, green.200, pink.500)' />

      <Box
        w='100%'
        h='200px'
        bgGradient='radial(gray.300, yellow.400, pink.200)'
      />

      <Text
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize='6xl'
        fontWeight='extrabold'
        className='text-center'
      >
        Welcome to Chakra UI
      </Text>

      <div className='flex flex-col justify-center items-center'>
        <h1>Login</h1>
        <form onSubmit={handleForm} className='flex flex-col'>
          <Input
            type='email'
            placeholder='Email'
            className='w-[20rem] mt-10'
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
          />
          <Input
            type='password'
            placeholder='Password'
            className='w-[20rem] mt-10'
            onChange={(e) =>
              setFormState({ ...formState, password: e.target.value })
            }
          />
          <button type='submit'>Login</button>
        </form>
      </div>
    </>
  );
}
