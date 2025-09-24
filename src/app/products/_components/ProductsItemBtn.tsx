'use client'
import { addProduct } from '@/app/cart/_actions/addproduct.action'
import { Button } from '@/components/ui/button'
import {  useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export default function ProductsItemBtn({ id }: { id: string }) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: addProduct, onSuccess: (data) => {
      toast.success(data?.message)
      queryClient.invalidateQueries({ queryKey: ['cart'] })      
    }, onError: () => {
      toast.error('You need to login first!')
    }
})
return (
  <div>
    <Button onClick={() => mutate(id)} type="button" className="w-full focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 cursor-pointer">
      {isPending?<i className="fa-solid fa-spin fa-spinner"></i>:"Add To Cart"}</Button>

  </div>
)
}
