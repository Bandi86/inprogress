/* "use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import {signupSchema} from '../schema/signup'
 
 
export function signUp() {
  // 1. Define your form.
  const formSignUp = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof signupSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
} */