'use client'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, loginSchemaForm } from '@/app/schema/login.schema'
import { signIn } from 'next-auth/react'

export default function Login() {
  const form = useForm<loginSchemaForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  })

  async function onSubmit(data: loginSchemaForm) {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: '/'
    })
    if (res?.ok) {
      window.location.href = res?.url || ''
    } else {
      console.log(res?.error)
    }
    console.log(res)
  }
  function handleGitHubSignIn() {
    signIn('github', { callbackUrl: '/' })
  }

  return (
    <>
      <h1 className='my-5 text-center'>Login Now !</h1>
      <div className="w-4/5 mx-auto">
        <Form {...form}>
          <form className='w-2/3 mx-auto' onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name='email'
              control={form.control}
              render={({ field }) => (
                <FormItem className='my-5'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type='email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name='password'
              control={form.control}
              render={({ field }) => (
                <FormItem className='my-5'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' autoComplete='off' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className='bg-main text-center w-full text-white my-5 cursor-pointer ml-auto block hover:opacity-80 transition hover:bg-main'
            >
              Login
            </Button>
          </form>
        </Form>
        <div className="text-center">
          <Button className='w-2/3 cursor-pointer ' onClick={handleGitHubSignIn}>Login with GitHub <i className="fa-brands fa-github"></i></Button>
        </div>
      </div>
    </>
  )
}
