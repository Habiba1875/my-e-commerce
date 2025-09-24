// import { authOptions } from '@/auth'
// import { getServerSession } from 'next-auth'
// import { NextResponse } from 'next/server'
import React from 'react'
import Cart from './_components/Cart'

export default async function page() {
  // const session = await getServerSession(authOptions)
  // if (session)
  //   return NextResponse.next()
  // else
  //   return NextResponse.redirect('/auth/login', '')
  return <Cart></Cart>
}
