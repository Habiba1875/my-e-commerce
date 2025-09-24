import getSingleProduct from '@/apis/singleProduct.api'
import { ProductInterface } from '@/interfaces/product.interface'
import Image from 'next/image'
import React from 'react'
import ProductsItemBtn from '../_components/ProductsItemBtn'
import getProductsInCategory from '@/apis/getProductsInCategory.api'
import ProductItem from '../_components/ProductItem'

export default async function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data: ProductInterface = await getSingleProduct(id[0])
  const catProducts: ProductInterface[] = await getProductsInCategory(id[1])
  if (!data || !catProducts) return <div>Product not found</div>
  return (
    <div className=' flex flex-wrap items-center py-5'>
      <div className="w-full md:w-1/3">
        <Image src={data.imageCover} alt={data.title} width={500} height={500} className='object-cover w-full' />
      </div>
      <div className="w-full p-5 md:w-2/3">
        <h3>{data.title}</h3>
        <p className='text-gray-400 my-3'>{data.description}</p>
        <p>{data.category.name}</p>
        <div className="flex justify-between items-center my-5">
          <span>{data.price} EGP</span>
          <span>{data.ratingsAverage}
            <i className="fa-solid fa-star text-rating"></i>
          </span>
        </div>
        <ProductsItemBtn id={data.id}></ProductsItemBtn>
      </div>
      <h2 className='my-5'>Related Products:</h2>
      <div className='flex flex-wrap'>
        {catProducts.map((prod: ProductInterface) =>
          <ProductItem key={prod._id} prod={prod}></ProductItem>)
        };
      </div>
    </div>
  )
}
