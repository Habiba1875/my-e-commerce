'use server'
import { getTokenAuth } from "@/utilities/getTokenAuth"

type shippingAddress = {
  'details': string,
  'phone': string,
  'city': string
}

export async function checkoutOnLine(cartId: string, url = process.env.NEXTAUTH_URL, shippingAddress: shippingAddress) {
  const token = await getTokenAuth()
  if (!token) throw new Error('User not authenticated')
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/orders/checkout-session/${cartId}?url=${url}`, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      token,
      'Content-Type': 'application/json'

    },
    body: JSON.stringify({ shippingAddress })
  })
  const data = await res.json()
  return data
}