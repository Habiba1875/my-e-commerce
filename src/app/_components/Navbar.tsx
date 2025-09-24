/*eslint-disable*/
'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import logo from '../../assets/images/freshcart-logo.svg'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(true);
  const { data: session, status } = useSession()


  const links = [
    { path: "/", element: "home" },
    { path: "/products", element: "products" }
  ]
  const auths = [
    { path: "/auth/login", element: "login" },
    { path: "/auth/register", element: "register" }
  ]
  function handleLogOut() {
    signOut({ callbackUrl: "/" });
  }

  const { data } = useQuery({
    queryKey: ['cart'],
    queryFn: async () => {
      const res = await fetch('/api/cart')
      if (!res.ok) throw new Error('Failed to fetch cart')
      return res.json()
    }
  })

  return (
    <div>
      <nav className="bg-light border-gray-200 dark:bg-gray-900 w-full fixed top-0 left-0 z-50">
        <div className="max-w-screen-xl flex flex-wrap md:flex-nowrap items-center justify-between mx-auto p-4 gap-5">
          <Link href="/" className="flex items-center space-x-3 ">
            <Image src={logo} alt="FreshCart Logo"
              width={150}
              height={40}
              priority />
          </Link>

          <button onClick={() => setIsOpen(!isOpen)} data-collapse-toggle="navbar-default" type="button" className="cursor-pointer inline-flex items-center p-2 w-10 h-10  justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
          <div className={`${isOpen && 'hidden'} w-full md:flex justify-between`} id="navbar-default">
            <ul className="font-medium flex flex-col px-4 md:p-0 mt-4  rounded-lg  md:flex-row md:space-x-8  md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {links.map(link => (
                <li key={link.path}>
                  <Link href={link.path} className="block text-gray-500 py-2 px-3  rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 hover:text-black transition" aria-current="page">{link.element.toUpperCase()}</Link>
                </li>

              ))}

            </ul>
            <ul className="font-medium flex flex-col px-4 md:p-0 rounded-lg  md:flex-row md:space-x-8  md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">


              <>
                {status == 'unauthenticated' ?
                  <>
                    {auths.map(link => (
                      <li key={link.path} className=''>
                        <Link href={link.path} className="block text-gray-500 py-2 px-3  rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 hover:text-black transition" aria-current="page">{link.element.toUpperCase()}</Link>
                      </li>

                    ))}

                  </> : <>
                    <li className="relative">
                      <Link
                        href="/cart"
                        className="flex items-center text-gray-500 py-2 px-3 rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 hover:text-black transition"
                      >
                        <i className="fa-solid fa-cart-shopping text-lg"></i>
                        <span className="ml-2">CART</span>

                        {data?.numOfCartItems > 0 && (
                          <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {data.numOfCartItems}
                          </span>
                        )}
                      </Link>
                    </li>


                    <li className='cursor-pointer' onClick={handleLogOut}>
                      <p className="block text-gray-500 py-2 px-3  rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 hover:text-black transition" aria-current="page">LOG OUT</p>
                    </li>
                    <li>
                      <p className="block text-gray-500 py-2 px-3  rounded-sm md:bg-transparent md:p-0 dark:text-white md:dark:text-blue-500 " aria-current="page">
                        HI {session?.user?.name.toUpperCase()}
                      </p>
                    </li>
                    {session?.user?.image && <li>
                      <img className='rounded-full size-[25px]' src={session?.user?.image} alt='user image' />
                    </li>}
                  </>
                }
              </>


            </ul>
          </div>
        </div>
      </nav>


    </div>
  )
}
