'use server'
import { getTokenAuth } from "@/utilities/getTokenAuth"
export async function clearCart() {
  const token = await getTokenAuth()
  if (!token)
    throw new Error('User not authenticated')

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/cart`, {
    cache: 'no-store',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      token
    },
  })
  const payload = await res.json()
  return payload
}