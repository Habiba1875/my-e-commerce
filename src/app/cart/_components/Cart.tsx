'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { CartRes, Product } from '../typescript/cart.interface'
import loading from '@/app/loading'
import Image from 'next/image'
import cartImg from '../../../assets/images/empty-cart.png'
import { deleteItem } from '../_actions/deleteitem.action'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { clearCart } from '../_actions/clearCart.action'
import { updateCount } from '../_actions/updateCount.action'
import Link from 'next/link'

export default function Cart() {
  const { data, isLoading, isError, error } = useQuery<CartRes>({
    queryKey: ['cart'], queryFn: async () => {
      const res = await fetch('/api/cart')
      const payload = await res.json()
      return payload
    }
  })
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: clearCart, onSuccess: () => {
      toast.success("All Clear!")
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }, onError: () => {
      toast.error('You need to login first!')
    }
  })
  if (isLoading) return loading()
  if (isError) return <h1>{error.message}</h1>
  if (data?.numOfCartItems === 0)
    return <div className='text-center py-10 flex justify-center items-center flex-col gap-5'>
      <Image src={cartImg} alt='empty cart' className='w-96 h-96 m-auto' />
      <h2 className='text-2xl font-bold'>Your Cart Is Empty </h2>
    </div >
  console.log(data)

  return (
    <div className='py-5'>
      <div className="flex justify-between items-center my-5">
        <h2>Total Cart Price : <span className='text-main font-bold'>{data?.data.totalCartPrice} EGP</span></h2>
        <h2>Number Of Cart Items : <span className='text-main font-bold'>{data?.numOfCartItems}</span></h2>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.products.map(prod => <CartItem key={prod._id} prod={prod}></CartItem>)}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center m-5">
        <Button className=" my-7 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-6 cursor-pointer me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={() => mutate()}>
          {isPending ?
            <i className="fa-solid fa-spin fa-spinner text-white text-2xl"></i> :
            <div className='flex items-center gap-2 '>
              <span className='text-xl pe-2'>Clear Cart </span><i className="fa-solid fa-trash text-lg"></i>
            </div>
          }</Button>
        <Button className="my-7 text-xl focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg  px-10 py-6 cursor-pointer me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900">
          <div className='flex items-center gap-2 '>

            <Link href={`/checkout/${data?.data._id}`} className='pe-2'>Checkout</Link><i className="fas fa-credit-card"></i>
          </div>
        </Button>
      </div>
    </div>

  )
}

function CartItem({ prod }: { prod: Product }) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: deleteItem, onSuccess: () => {
      toast.success("Item Deleted!")
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }, onError: () => {
      toast.error('You need to login first!')
    }
  })

  const { mutate: updateMutate, isPending: updatePending } = useMutation({
    mutationFn: updateCount, onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.invalidateQueries({ queryKey: ['cart'] })
    }, onError: () => {
      toast.error('You need to login first!')
    }
  })

  function handleUpdate() {
    if (prod.count < prod.product.quantity) {
      updateMutate({
        productId: prod.product._id,
        count: prod.count + 1
      });
    }
  }


  return <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
    <td className="p-4">
      <Image src={prod.product.imageCover} className="size-[100px] object-cover" width={100} height={100} alt="product" />
    </td>
    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      {prod.product.title}
    </td>
    <td className="px-6 py-4">
      <div className="flex items-center">
        <button onClick={() => updateMutate({ productId: prod.product._id, count: prod.count - 1 })} className="cursor-pointer inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
          <span className="sr-only">Quantity button</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
          </svg>
        </button>
        <div>
          <div className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            {updatePending ? <i className="fa-solid fa-spin fa-spinner text-gray-400 text-xl"></i> :
              prod.count
            }
          </div>
        </div>
        <button onClick={() => handleUpdate()} className=" cursor-pointer inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
          <span className="sr-only">Quantity button</span>
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
          </svg>
        </button>
      </div>
    </td>
    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
      {prod.price} EGP
    </td>
    <td className="px-6 py-4">
      <span onClick={() => mutate(prod.product._id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">
        {isPending ? <i className="fa-solid fa-spin fa-spinner text-gray-400 text-2xl"></i> :
          <i className="fa-solid fa-trash text-red-500 text-2xl"></i>
        }
      </span>
    </td>
  </tr>
}