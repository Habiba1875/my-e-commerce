import { ProductInterface } from '@/interfaces/product.interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import ProductsItemBtn from './ProductsItemBtn'
import HeartItem from '@/app/_components/HeartItem'

export default function ProductItem({ prod }: { prod: ProductInterface }) {
  return (
    <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/6'>
      <div className="p-5">
        <HeartItem/>
        <Link href={`/products/${prod.id}/${prod.category._id}`}>
          <Image width={200} height={200} src={prod.imageCover} className='w-full' alt="" />
          <span className='text-main'>{prod.category.name}</span>
          <p className='line-clamp-1'>{prod.title}</p>
          <div className="flex justify-between items-center my-5">
            <div className="flex items-center gap-0.5">
              {prod.priceAfterDiscount && (
                <span className="text-lg font-bold text-green-600">
                  {prod.priceAfterDiscount} EGP
                </span>
              )}
              <span
                className={
                  prod.priceAfterDiscount
                    ? "line-through text-gray-400 text-sm"
                    : "text-lg font-bold text-gray-900"
                }
              >
                {prod.price} EGP
              </span>
            </div>

            <span>{prod.ratingsAverage} <i className="fa-solid fa-star text-rating"></i></span>
          </div>
        </Link>
        <ProductsItemBtn id={prod.id}></ProductsItemBtn>      </div>

    </div>
  )
}
