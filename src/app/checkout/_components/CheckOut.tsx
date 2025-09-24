'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { addressSchema, addressSchemaForm } from '@/app/schema/adress.schema'
import { checkoutOnLine } from '../_actions/checkout.action'
export default function CheckOut({ cartId }: { cartId: string }) {
  const form = useForm<addressSchemaForm>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      details: '',
      phone: '',
      city: ''
    }
  })
  async function OnSubmit(data: addressSchemaForm) {
    const shipingAddress = data
    const res =await checkoutOnLine(cartId, '', shipingAddress)
    console.log(res)
    if (res?.status === 'success') 
      window.location.href = res?.session?.url
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(OnSubmit)} className='w-2/3 mx-auto my-5'>
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem className='my-3'>
                <FormLabel>Details</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className='my-3'>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className='my-3'>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type='tel' {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className='bg-main text-center w-full text-white my-5 cursor-pointer ml-auto block hover:opacity-80 transition hover:bg-main'
          >Submit</Button>
        </form>
      </Form>
    </>

  )
}
